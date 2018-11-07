import { Display } from "rot-js";

export class DisplayManager {
    displays: Display[];
    
    constructor() {
        this.displays = [];
    }

    add(display: Display) {
        return this.displays.push(display);
    }
}