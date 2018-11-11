import { Display } from 'rot-js';
import { Site, position } from "./Site";
import { Hero, HeroTemplate } from "./Hero";
import { Entity } from "./Entity";

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
    focus: Entity;
    player: Hero;
    current_site: Site;

    constructor(properties: ScreenOptions) {
        super(properties);
        this.player = new Hero(HeroTemplate);
        this.current_site = properties.site;
        let spawn = this.current_site.getRandomFloorPosition();
        this.player.setPos(spawn);
        this.focus = this.player;
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
            x: Math.max(0, this.focus.position.x - (screen_width / 2)),
            y: Math.max(0, this.focus.position.y - (screen_height / 2))
        };

        topLeft.x = Math.min(topLeft.x, site_width - screen_width);
        topLeft.y = Math.min(topLeft.y, site_height - screen_height);


        for (let x = topLeft.x; x < topLeft.x + site_width; x++) {
            for (let y = topLeft.y; y < topLeft.y + site_height; y++) {
                let tile = this.current_site.getTile({ x, y });
                this.display.draw(
                    x - topLeft.x,
                    y - topLeft.y,
                    tile.getCharacter(),
                    tile.getForeground(),
                    tile.getBackground()
                );
            }
        }

        this.display.draw(
            this.focus.position.x - topLeft.x,
            this.focus.position.y - topLeft.y,
            this.focus.getCharacter(),
            this.focus.getForeground(),
            this.focus.getBackground()
        );
    }

    handleInput(eventName: string, event: KeyboardEvent) {
        if (eventName == "keydown") {
            switch (event.code) {
                case 'ArrowUp':
                    this.move(0, -1);
                    break;
                case 'ArrowDown':
                    this.move(0, 1);
                    break;
                case 'ArrowLeft':
                    this.move(-1, 0);
                    break;
                case 'ArrowRight':
                    this.move(1, 0);
                    break;
                default:
                    break;
            }
        }
    }

    move(dx: number, dy: number) {
        let new_pos = {
            x: this.player.position.x + dx,
            y: this.player.position.y + dy
        }

        this.player.tryMove(new_pos, this.current_site);
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