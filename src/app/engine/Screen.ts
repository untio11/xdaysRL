import { Display } from 'rot-js';
import { Site } from "./Site";

export abstract class Screen { // For now it's nothing much, but I guess I might need it later
    readonly display: Display;

    constructor(properties: ScreenOptions) {
        let disp_props: DisplayOptions = {width: properties.width, height: properties.height};
        this.display = new Display(disp_props);
    }

    abstract enter(): void;

    abstract exit(): void;

    abstract handleInput(eventName: string, event: Event): void;
}

export class PlayScreen extends Screen {
    x_center: number = 0;
    y_center: number = 0;
    current_site: Site;

    constructor(properties: ScreenOptions) {
        super(properties);
        this.current_site = properties.site;
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
            console.log(this.x_center, this.y_center);
        }
    }

    moveCamera(dx: number, dy:number) {
        this.x_center += (0 <= this.x_center + dx && this.x_center + dx < this.current_site.width) ? dx : 0;
        this.y_center += (0 <= this.y_center + dy && this.y_center + dy < this.current_site.height) ? dy : 0;
    } 

    setSite(site: Site) {
        this.current_site = site;
    }

    getSite() {
        return this.current_site;
    }
}

interface DisplayOptions {
    width: number,
    height: number
}

export interface ScreenOptions extends DisplayOptions {
    site: Site
}