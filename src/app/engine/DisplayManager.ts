import { Color } from "rot-js";
import { Site } from "./Site";
import { ScreenOptions, Screen } from './Screen';

export class DisplayManager {
    screens: Screen[];
    current: number;
    
    constructor() {
        this.screens = [];
        this.current = 0;
    }

    add(target: HTMLElement | null, properties: ScreenOptions) {
        let new_screen = new Screen(properties);
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

    render(site: Site, index?: number) {
        let curr_disp = this.screens[index ? index : this.current];
        for (let x = 0; x < site.width; x++) {
            for (let y = 0; y < site.height; y++) {
                let glyph = site.getTile(x, y).getGlyph();
                curr_disp.display.draw(x, y, glyph.getCharacter(), glyph.getForeground(), glyph.getBackground());
            }
        }
    }
}