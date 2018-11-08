import { Display } from 'rot-js';

export class Screen { // For now it's nothing much, but I guess I might need it later
    readonly display: Display;

    constructor(properties: ScreenOptions) {
        let disp_props: DisplayOptions = {width: properties.width, height: properties.height};
        this.display = new Display(disp_props);
    }

    enter() {

    }

    exit() {

    }
}

interface DisplayOptions {
    width: number,
    height: number
}

export interface ScreenOptions extends DisplayOptions {

}