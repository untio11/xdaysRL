import { Display, Color } from "rot-js";
import { Site } from "./Site";

export class DisplayManager {
    displays: Display[];
    current: number;
    
    constructor() {
        this.displays = [];
        this.current = 0;
    }

    add(target: HTMLElement | null, properties: {}) {
        let new_disp = new Display(properties);
        if (target) target.appendChild(new_disp.getContainer());
        this.current = this.displays.push(new_disp) - 1;
        return this.current;
    }

    setCurrent(index: number) {
        this.current = (index < this.displays.length) ? index : this.current;
        return this.current == index; // Assignment went okay
    }

    getDisplay(index: number) {
        return this.displays[index];
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
            this.displays[index].drawText(2, i, colors + "Hello, world!");
        }
    }

    render(site: Site, index?: number) {
        let curr_disp = this.displays[index ? index : this.current];
        let data = site.getData();
        for (let x = 0; x < site.width; x++) {
            for (let y = 0; y < site.height; y++) {
                curr_disp.draw(x, y, data[x][y] ? "#" : ".");
            }
        }
    }
}