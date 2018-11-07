import { Display, Color, ColorArray } from "rot-js";

export class DisplayManager {
    displays: Display[];
    
    constructor() {
        this.displays = [];
    }

    add(target: HTMLElement | null, properties: {}) {
        let new_disp = new Display(properties);
        if (target) target.appendChild(new_disp.getContainer());
        return this.displays.push(new_disp) - 1;
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
}