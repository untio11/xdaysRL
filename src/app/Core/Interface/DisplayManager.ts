import { Color, DisplayOptions } from "rot-js";
import { Site, position } from "../World/Site";
import { PlayScreen, Screen, nullScreen } from './Screen';

/**
 * A manager for handiling Screens. It should keep track of multiple screens and binding of sites and event listeners goes through this class.
 */
class DisplayManager {
    /** Group availible screens by type. */
    screens: {[screen_type: string]: Screen[]}; 
    /** Points to the current screens of different types */
    current_screen: {[type: string]: number};
    /** Points to the current site. Defaults to -1, which means no current site. */
    current_site: number;
    /** For storing the sites. */
    sites: Site[];
    
    constructor() {
        this.sites = [];
        this.screens = {};
        this.current_screen = {};
        this.current_site = -1;
    }

    /**
     * Returns the current screen of the type given.
     * @param screen_type Name of the type of the screen you want to retrieve.
     */
    getCurrentScreen(screen_type: string) {
        const i = this.current_screen[screen_type];
        return this.getScreen([screen_type, i]);
    }

    /**
     * Create a new screen based on the parsed properties and add it to the given html target if possible.
     * @param properties Parse a ScreenOptions object defining the type of screen and some other options. If the 'target' value was set, this function tries to append the screen to the target.
     * @return A pointer to the current screen is returned for reference.
     */
    add(screen: Screen): [string, number] {
        if (this.screens[screen._type] == undefined) this.screens[screen._type] = new Array();
        this.current_screen[screen._type] = this.screens[screen._type].push(screen) - 1;
        return [screen._type, this.current_screen[screen._type]];
    }

    /**
     * Switch from the current active screen to a new screen, triggering the enter() and exit() functions in the process. 
     * @param screen Pointer to the screen you want to switch to.
     */
    switchTo(screen_pointer: [string, number]) {
        let new_screen = this.getScreen(screen_pointer); 
        if (new_screen != undefined) {
            let current_screen = this.getCurrentScreen(screen_pointer[0]);
            if (current_screen) current_screen.exit();
            new_screen.enter();
            this.current_screen[screen_pointer[0]] = screen_pointer[1];
        }
    }

    private getScreen(screen_pointer: [string, number]) {
        let candidate = this.screens[screen_pointer[0]][screen_pointer[1]];
        if (candidate != undefined) {
            return candidate;
        } else {
            return undefined;
        }
    }

    /**
     * Test the given screen by printing "Hello, world!" with varying grayscale colours.
     * @param screen Screen to be tested
     */
    test(screen_pointer: [string, number]) {
        let screen = this.getScreen(screen_pointer);
        if (screen == undefined) return;

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
     * Render the current screen or the given screen at the screen pointer.
     */
    render(screen_pointer: {type: string, index?: number} | [string, number]) {
        let screen; 
        if (Array.isArray(screen_pointer)) {
            screen = this.getScreen(screen_pointer);
        } else if (screen_pointer.index) {
            screen = this.getScreen([screen_pointer.type, screen_pointer.index]);
        } else {
            screen = this.getCurrentScreen(screen_pointer.type);
        }

        if (screen) screen.render();
    }

    /**
     * Attempt to bind a site to a PlayScreen to be used in rendering.
     * @param site The site that is to be bound to the screen.
     * @return True if the assignment succeded, false otherwise (the current screen isn't a PlayScreen).
     */
    bindSiteToScreen(site: Site) {
        let screen = this.getCurrentScreen(PlayScreen.type) as PlayScreen;

        if (screen == undefined) return false;

        this.current_site = this.sites.push(site) - 1;
        screen.setSite(this.sites[this.current_site]);
        
        return this.current_site;
    }

    /**
     * Try to bind an eventlistener for the parsed event to the current screen.
     * @param event Name of the event type to be bound.
     * @return True if the assignment succeeded, false otherwise.
     */
    bindEventToScreen(event: string, screen_pointer: [string, number]) {
        let screen = this.getScreen(screen_pointer) || nullScreen;

        if (screen == undefined || screen == nullScreen) {
            return;
        } else {
            window.addEventListener(event, (e) => (
                screen.handleInput(event, e)
            ));
        }
    }

    getCurrentSite() {
        return this.sites[this.current_site];
    }
}

export var displayManager: DisplayManager = new DisplayManager();