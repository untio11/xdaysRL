import { Display } from 'rot-js';
import { Site, position } from "./Site";

export abstract class Screen { // For now it's nothing much, but I guess I might need it later
    readonly display: Display;
    private dimensions: {width: number, height: number}; // Will probaly change i guess

    constructor(properties: ScreenOptions) {
        this.display = new Display(properties);
        this.dimensions = {width: properties.width, height: properties.height};
    }

    abstract enter(): void;

    abstract exit(): void;

    getDimensions() {
        return this.dimensions;
    }

    abstract handleInput(eventName: string, event: Event): void;
}

export class PlayScreen extends Screen {
    center: position;
    current_site: Site;

    constructor(properties: ScreenOptions) {
        super(properties);
        this.current_site = properties.site;
        this.center = {x: 0, y: 0};
    }

    enter() {
        console.log("entered a playscreen");
    }

    exit() {
        console.log("exited a playscreen");
    }

    handleInput(eventName: string, event: KeyboardEvent) {
        if (eventName == "keydown") {
            switch (event.code) {
                case 'ArrowUp':
                    this.moveCamera(0, -1);
                    break;
                case 'ArrowDown':
                    this.moveCamera(0, 1);
                    break;
                case 'ArrowLeft':
                    this.moveCamera(-1, 0);
                    break;
                case 'ArrowRight':
                    this.moveCamera(1, 0);
                    break;
                default:
                    break;
            }
        }
    }

    moveCamera(dx: number, dy:number) {
        this.center.x += (0 <= this.center.x + dx && this.center.x + dx < this.current_site.width) ? dx : 0;
        this.center.y += (0 <= this.center.y + dy && this.center.y + dy < this.current_site.height) ? dy : 0;
    } 

    setSite(site: Site) {
        this.current_site = site;
    }

    getSite() {
        return this.current_site;
    }
}

export interface DisplayOptions {
    width: number,
    height: number,
    fontSize?: number,
    bg?: string,
    forceSquareRatio?: boolean
}

export interface ScreenOptions extends DisplayOptions {
    site: Site
}