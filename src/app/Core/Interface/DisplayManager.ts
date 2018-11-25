import { Color, DisplayOptions } from "rot-js";
import { Site, position } from "../World/Site";
import { ScreenOptions, PlayScreen, Screen } from './Screen';

/**
 * A manager for handiling Screens. It should keep track of multiple screens and binding of sites and event listeners goes through this class.
 */
export class DisplayManager {
    /** For now we only have one screen, which is the playscreen, but later we might want to add more screens. */
    playscreen: PlayScreen; 
    /** Pointer to the current screen. */
    current_screen: Screen;
    /** Points to the current site. Defaults to -1, which means no current site. */
    current_site: number;
    /** For storing the sites. */
    sites: Site[];
    /** For counting the amount of screens. */
    count: number;
    
    constructor(playscreen: PlayScreen) {
        this.playscreen = playscreen;
        this.current_screen = this.playscreen;
        this.sites = [];
        this.current_site = -1;
        this.count = 0;
        this.bindSiteToScreen(playscreen.getSite());
    }

    /**
     * Create a new screen based on the parsed properties and add it to the given html target if possible.
     * @param properties Parse a ScreenOptions object defining the type of screen and some other options. If the 'target' value was set, this function tries to append the screen to the target.
     * @return A pointer to the current screen is returned for reference.
     */
    add(properties: ScreenOptions) {
        switch (properties.type) {
            case 'PlayScreen':
                this.playscreen = new PlayScreen(properties);
                this.current_screen = this.playscreen;
                this.count++;
                break;
            default:
                break;
        }

        if (properties.target && this.current_screen) properties.target.appendChild(this.current_screen.display.getContainer());

        return this.current_screen;
    }

    /**
     * Switch from the current active screen to a new screen, triggering the enter() and exit() functions in the process. 
     * @param screen Pointer to the screen you want to switch to.
     */
    switchTo(screen: Screen) {
        if (this.current_screen) this.current_screen.exit();
        screen.enter();
        this.current_screen = screen;
    }

    /**
     * @return Return a pointer to the currently active screen.
     */
    getCurrentScreen() {
        return this.current_screen;
    }

    /**
     * Test the given screen by printing "Hello, world!" with varying grayscale colours.
     * @param screen Screen to be tested
     */
    test(screen: Screen) {
        let fg, bg, colors: string;
        for (let i = 0; i < 15; i++) {
            // Calculate the foreground color, getting progressively darker
            // and the background color, getting progressively lighter.
            fg = Color.toRGB([255 - (i * 20), 255 - (i * 20), 255 - (i * 20)]);
            bg = Color.toRGB([i * 20, i * 20, i * 20]);
            // Create the color format specifier.
            colors = "%c{" + fg + "}%b{" + bg + "}";
            // Draw the text at col 2 and row i
            screen.display.drawText(2, i, colors + "Hello, world!");
        }
    }

    /**
     * Render the current screen.
     */
    // TODO: Probably allow to parse a screen to be rendered.
    render() {
        if (this.current_screen) this.current_screen.render();
    }

    /**
     * Attempt to bind a site to a PlayScreen to be used in rendering.
     * @param site The site that is to be bound to the screen.
     * @return True if the assignment succeded, false otherwise (the current screen isn't a PlayScreen).
     */
    bindSiteToScreen(site: Site) {
        if (!(this.current_screen instanceof PlayScreen)) return false;

        let screen = this.current_screen;
        this.current_site = this.sites.push(site) - 1;
        screen.setSite(this.sites[this.current_site]);
        
        return this.current_site;
    }

    /**
     * Try to bind an eventlistener for the parsed event to the current screen.
     * @param event Name of the event type to be bound.
     * @return True if the assignment succeeded, false otherwise.
     */
    bindEventToScreen(event: string) {
        if (this.current_screen == undefined) return false;
        let screen = this.current_screen;

        window.addEventListener(event, (e) => (
            screen.handleInput(event, e)
        ));

        return true;
    }

    getCurrentSite() {
        return this.sites[this.current_site];
    }
}