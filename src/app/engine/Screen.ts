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

    abstract render(): void;

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

    render() {
        let { width: site_width, height: site_height } = this.current_site.getDimensions();
        let screen_width = this.getDimensions().width;
        let screen_height = this.getDimensions().height;
        let topLeft: position = {
            x: Math.max(0, this.center.x - (screen_width / 2)),
            y: Math.max(0, this.center.y - (screen_height / 2))
        };

        topLeft.x = Math.min(topLeft.x, site_width - screen_width);
        topLeft.y = Math.min(topLeft.y, site_height - screen_height);


        for (let x = topLeft.x; x < topLeft.x + site_width; x++) {
            for (let y = topLeft.y; y < topLeft.y + site_height; y++) {
                let glyph = this.current_site.getTile({ x, y }).getGlyph();
                this.display.draw(x - topLeft.x, y - topLeft.y, glyph.getCharacter(), glyph.getForeground(), glyph.getBackground());
            }
        }

        this.display.draw(this.center.x - topLeft.x, this.center.y - topLeft.y, '@');
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
    forceSquareRatio?: boolean,
    target?: HTMLElement
}

export interface ScreenOptions extends DisplayOptions {
    site: Site,
    type: string
}