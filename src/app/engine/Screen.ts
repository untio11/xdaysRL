import { Display } from 'rot-js';
import { Site, position } from "./Site";
import { Hero, HeroTemplate } from "./Hero";
import { Entity } from "./Entity";

/**
 * Wrapper around rot.Display for some extra functionality.
 */
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

    /** @returns The dimensions in the form {width, height}. */
    getDimensions() {
        return this.dimensions;
    }

    abstract handleInput(eventName: string, event: Event): void;
}

/**
 * Class for playscreens. Playscreens have a site linked to them. Might want to move the player down to the site, together with the other entities.
 */
export class PlayScreen extends Screen {
    focus: Entity;
    player: Hero;
    current_site: Site;

    /**
     * Build a new PlayScreen and spawn the player on a random floortile.
     * @param properties ScreenOptions containing the Display properties and some Screen specific options.
     */
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

    /**
     * Actually draw the content of the site on the screen.
     */
    render() {
        let { width: site_width, height: site_height } = this.current_site.getDimensions();
        let { x: focus_x, y: focus_y } = this.focus.getPos();
        let { width: screen_width, height: screen_height } = this.getDimensions(); 

        // We want the player to be in the middle of the screen, but we don't want the view to go over the edge of the map.
        // So the top left corner is at most (0,0).
        let topLeft = new position (
            Math.max(0, focus_x - (screen_width / 2)),
            Math.max(0, focus_y - (screen_height / 2))
        );

        // Similar for the lower right corner.
        topLeft.x = Math.min(topLeft.x, site_width - screen_width);
        topLeft.y = Math.min(topLeft.y, site_height - screen_height);

        this.display.clear();
        for (let x = topLeft.x; x < topLeft.x + site_width; x++) {
            for (let y = topLeft.y; y < topLeft.y + site_height; y++) {
                let tile = this.current_site.getTile({x, y});
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
            focus_x - topLeft.x,
            focus_y - topLeft.y,
            this.focus.getCharacter(),
            this.focus.getForeground(),
            this.focus.getBackground()
        );
    }

    /**
     * Map the event to an action. Might externalize this.
     * @param eventName 
     * @param event 
     */
    handleInput(eventName: string, event: KeyboardEvent) {
        if (eventName == "keydown") {
            switch (event.code) {
                case 'ArrowUp':
                case 'Numpad8':
                    this.player.mixins['Movable'].tryMove({dx: 0, dy: -1}, this.current_site);
                    break;
                case 'ArrowDown':
                case 'Numpad2':
                    this.player.mixins['Movable'].tryMove({dx: 0, dy: 1}, this.current_site);
                    break;
                case 'ArrowLeft':
                case 'Numpad4':
                    this.player.mixins['Movable'].tryMove({dx: -1, dy: 0}, this.current_site);
                    break;
                case 'ArrowRight':
                case 'Numpad6':
                    this.player.mixins['Movable'].tryMove({dx: 1, dy: 0}, this.current_site);
                    break;
                case 'Numpad7':
                    this.player.mixins['Movable'].tryMove({dx: -1, dy: -1}, this.current_site);
                    break;
                case 'Numpad9':
                    this.player.mixins['Movable'].tryMove({dx: 1, dy: -1}, this.current_site);
                    break;
                case 'Numpad1':
                    this.player.mixins['Movable'].tryMove({dx: -1, dy: 1}, this.current_site);
                    break;
                case 'Numpad3':
                    this.player.mixins['Movable'].tryMove({dx: 1, dy: 1}, this.current_site);
                    break;
                default:
                    this.player.mixins["Damagable"].takeHit(1);
                    console.log(this.player.mixins["Damagable"].getHp());
                    break;
            }
        }

        this.render();
    }

    /**
     * Binds a site to this screen.
     * @param site Reference to the site to be bounded to this Screen.
     */
    setSite(site: Site) {
        this.current_site = site;
    }

    /**
     * @returns Return the current site.
     */
    getSite() {
        return this.current_site;
    }
}

/**
 * Contains some properties used for the Display class.
 */
export interface DisplayOptions {
    width: number,
    height: number,
    fontSize?: number,
    bg?: string,
    forceSquareRatio?: boolean,
    target?: HTMLElement
}

/**
 * Extend the DisplayOptions with some more Screen-specific options.
 */
export interface ScreenOptions extends DisplayOptions {
    site: Site,
    type: string
}