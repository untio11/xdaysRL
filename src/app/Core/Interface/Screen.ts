import { Display } from 'rot-js';
import { Site } from "../World/Site";

/**
 * Contains some properties used for the Display class.
 */
export interface DisplayOptions {
    width: number,
    height: number,
    fontSize?: number,
    bg?: string,
    forceSquareRatio?: boolean,
}

/**
 * Extend the DisplayOptions with some more Screen-specific options.
 */
export interface ScreenOptions extends DisplayOptions {
    site?: Site
}

/**
 * Wrapper around rot.Display for some extra functionality.
 */
export abstract class Screen { // For now it's nothing much, but I guess I might need it later
    readonly display: Display;
    private dimensions: {width: number, height: number}; // Will probaly change i guess
    port?: HTMLElement;
    readonly id: number;
    private static counter = 0;

    constructor(properties: ScreenOptions) {
        this.display = new Display(properties);
        this.dimensions = {width: properties.width, height: properties.height};
        this.id = Screen.counter++;
    }

    
    abstract enter(): void;

    abstract exit(): void;

    abstract render(): void;

    refresh() {
        this.display.clear();
        this.render();
    }

    /** @returns The dimensions in the form {width, height}. */
    getDimensions() {
        return this.dimensions;
    }

    bindPort(port: HTMLElement) {
        port.appendChild(this.display.getContainer());
        this.port = port;
    }
}