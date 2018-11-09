import { Color, DisplayOptions } from "rot-js";
import { Site } from "./Site";
import { ScreenOptions, PlayScreen, Screen } from './Screen';

export class DisplayManager {
    screens: Screen[];
    current: number;
    
    constructor() {
        this.screens = [];
        this.current = 0;
    }

    add(target: HTMLElement | null, properties: ScreenOptions) {
        let new_screen = new PlayScreen(properties);
        if (target) target.appendChild(new_screen.display.getContainer());
        this.current = this.screens.push(new_screen) - 1;
        return this.current;
    }

    switchTo(index: number) {
        if (0 <= index && index < this.screens.length) {
            this.screens[this.current].exit()
            this.screens[index].enter()
            this.current = index;
        }

        return this.current == index; // Assignment went okay
    }

    getDisplay(index: number) {
        return this.screens[index];
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
            this.screens[index].display.drawText(2, i, colors + "Hello, world!");
        }
    }

    render() {
        let curr_disp = this.screens[this.current] as PlayScreen; // Later on we'll probably have different types, but whatever.
        let site = curr_disp.getSite();
        let site_width = site.getDimensions().width;
        let site_height = site.getDimensions().height;
        let screen_width = curr_disp.getDimensions().width;
        let screen_height = curr_disp.getDimensions().height;
        let topLeftX = Math.max(0, curr_disp.x_center - (screen_width / 2));
        topLeftX = Math.min(topLeftX, site_width - screen_width);
        let topLeftY = Math.max(0, curr_disp.y_center - (screen_height / 2));
        topLeftY = Math.min(topLeftY, site_height - screen_height);


        for (let x = topLeftX; x < topLeftX + site_width; x++) {
            for (let y = topLeftY; y < topLeftY + site_height; y++) {
                let glyph = site.getTile(x, y).getGlyph();
                curr_disp.display.draw(x - topLeftX, y - topLeftY, glyph.getCharacter(), glyph.getForeground(), glyph.getBackground());
            }
        }

        curr_disp.display.draw(curr_disp.x_center - topLeftX, curr_disp.y_center - topLeftY, '@');
    }

    bindSiteToScreen(site: Site, index: number) {
        let screen = this.screens[index] as PlayScreen;
        screen.setSite(site);
    }

    bindEventToScreen(event: string) {
        window.addEventListener(event, (e) => (
            this.screens[this.current].handleInput(event, e)
        ));
        window.addEventListener(event, (e) => (
            this.render()
        )); 
    }
}