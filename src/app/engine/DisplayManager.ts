import { Color, DisplayOptions } from "rot-js";
import { Site, position } from "./Site";
import { ScreenOptions, PlayScreen, Screen } from './Screen';

export class DisplayManager {
    playScreen: PlayScreen | undefined;
    current: Screen | undefined;
    count: number;
    
    constructor() {
        this.playScreen = undefined;
        this.current = undefined;
        this.count = 0;
    }

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

    switchTo(screen: Screen) {
        if (this.current) this.current.exit();
        screen.enter();
        this.current = screen;
    }

    getCurrentScreen() {
        return this.current;
    }

    test(index: number) {
        let fg, bg, colors: string;
        for (let i = 0; i < 15; i++) {
            // Calculate the foreground color, getting progressively darker
            // and the background color, getting progressively lighter.
            fg = Color.toRGB([255 - (i * 20), 255 - (i * 20), 255 - (i * 20)]);
            bg = Color.toRGB([i * 20, i * 20, i * 20]);
            // Create the color format specifier.
            colors = "%c{" + fg + "}%b{" + bg + "}";
            // Draw the text at col 2 and row i
            if (this.current) this.current.display.drawText(2, i, colors + "Hello, world!");
        }
    }

    render() {
        if (this.current) this.current.render();
    }

    bindSiteToScreen(site: Site) {
        if (!(this.current instanceof PlayScreen)) return false;
        let screen = this.current;
        screen.setSite(site);
        return true;
    }

    bindEventToScreen(event: string) {
        if (this.current == undefined) return false;
        let screen = this.current;

        window.addEventListener(event, (e) => (
            screen.handleInput(event, e)
        ));
        window.addEventListener(event, (e) => (
            this.render()
        ));

        return true;
    }
}