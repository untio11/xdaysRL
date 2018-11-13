import { Color, DisplayOptions } from "rot-js";
import { Site, position } from "./Site";
import { ScreenOptions, PlayScreen, Screen } from './Screen';

export class DisplayManager {
    /**
     * For now we only have one screen, which is the playscreen, but later we might want to add more screens.
     */
    playScreen: PlayScreen | undefined; // Current playscreen
    current: Screen | undefined; // Pointer to the current screen
    count: number; // For counting the amount of screens
    
    constructor() {
        this.playScreen = undefined;
        this.current = undefined;
        this.count = 0;
    }

    /**
     * Create a new screen based on the parsed properties and add it to the given html target if possible.
     * @param properties Parse a ScreenOptions object defining the type of screen and some other options. If the 'target' value was set, this function tries to append the screen to the target.
     * @return A pointer to the current screen is returned for reference.
     */
    add(properties: ScreenOptions) {
        switch (properties.type) {
            case 'PlayScreen':
                this.playScreen = new PlayScreen(properties);
                this.current = this.playScreen;
                this.count++;
                break;
            default:
                break;
        }

        if (properties.target && this.current) properties.target.appendChild(this.current.display.getContainer());

        return this.current;
    }

    /**
     * Switch from the current active screen to a new screen, triggering the enter() and exit() functions in the process. 
     * @param screen Pointer to the screen you want to switch to.
     */
    switchTo(screen: Screen) {
        if (this.current) this.current.exit();
        screen.enter();
        this.current = screen;
    }

    /**
     * @return Return a pointer to the currently active screen.
     */
    getCurrentScreen() {
        return this.current;
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
        if (this.current) this.current.render();
    }

    /**
     * Attempt to bind a site to a PlayScreen to be used in rendering.
     * @param site The site that is to be bound to the screen.
     * @return True if the assignment succeded, false otherwise (the current screen isn't a PlayScreen).
     */
    bindSiteToScreen(site: Site) {
        if (!(this.current instanceof PlayScreen)) return false;
        let screen = this.current;
        screen.setSite(site);
        return true;
    }

    /**
     * Try to bind an eventlistener for the parsed event to the current screen.
     * @param event Name of the event type to be bound.
     * @return True if the assignment succeeded, false otherwise.
     */
    bindEventToScreen(event: string) {
        if (this.current == undefined) return false;
        let screen = this.current;

        window.addEventListener(event, (e) => (
            screen.handleInput(event, e)
        ));

        return true;
    }
}