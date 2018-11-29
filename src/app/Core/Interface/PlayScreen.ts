import { Screen, ScreenOptions } from "./Screen";
import { Site, position } from "../World/Site";
import { Entity } from "../Entities/Entity";
import { Hero } from "../Entities/Hero";
import { MixinNames } from "../Mixins/MixinNames";
import { EngineWrapper } from "../Engine/Engine";

/**
 * Class for playscreens. Playscreens have a site linked to them. Might want to move the player down to the site, together with the other entities.
 */
export class PlayScreen extends Screen {
    focus?: Entity;
    current_site?: Site;
    static readonly type: string = "PlayScreen";
    readonly _type: string = PlayScreen.type;

    /**
     * Build a new PlayScreen and spawn the player on a random floortile.
     * @param properties ScreenOptions containing the Display properties and some Screen specific options.
     */
    constructor(properties: ScreenOptions) {
        super(properties);
        this.current_site = properties.site;
    }

    /** For now just puts the player on a random floortile */
    spawnPlayer(player: Hero) {
        if (!this.current_site) return;
        this.current_site.spawn(player);
        this.setFocus(player);
    }

    setFocus(new_focus: Entity) {
        this.focus = new_focus;
    }

    /** Probably want to enforce player spawn here. */
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
        if (!this.port || !this.focus || !this.current_site) return;

        const visibile_area = this.focus.MixinProps(MixinNames.vision).getVisibileArea();
        this.focus.getPos().site.explore(visibile_area);

        const { width: site_width, height: site_height } = this.current_site.getDimensions();
        const { x: focus_x, y: focus_y } = this.focus.getPos();
        const { width: screen_width, height: screen_height } = this.getDimensions();

        // We want the player to be in the middle of the screen, but we don't want the view to go over the edge of the map.
        // So the top left corner is at most (0,0).
        const topLeft = new position(
            Math.max(0, focus_x - (screen_width / 2)),
            Math.max(0, focus_y - (screen_height / 2)),
            this.focus.getPos().site
        );

        // Similar for the lower right corner.
        topLeft.x = Math.min(topLeft.x, site_width - screen_width);
        topLeft.y = Math.min(topLeft.y, site_height - screen_height);

        this.display.clear();

        for (let x = topLeft.x; x < topLeft.x + site_width; x++) {
            for (let y = topLeft.y; y < topLeft.y + site_height; y++) {
                const tile = this.current_site.getTile({ x, y });
                if (tile.explored) {
                    const in_vision = this.containsPoint(visibile_area, [x, y]);
                    const foreground = tile.getForeground(in_vision);
                    const background = tile.getBackground(in_vision);
                    this.display.draw(
                        x - topLeft.x,
                        y - topLeft.y,
                        tile.getCharacter(),
                        foreground,
                        background)
                }
            }
        }

        for (const entity of this.current_site.getEntities()) {
            if (!entity.inKnownTerritory()) continue;
            let pos = entity.getPos();
            const in_vision = this.containsPoint(visibile_area, [pos.x, pos.y]);
            if (in_vision) entity.updateLastPos();
            pos = entity.getLastPos();
            
            this.display.draw(
                pos.x - topLeft.x,
                pos.y - topLeft.y,
                entity.getCharacter(),
                entity.getForeground(in_vision),
                entity.getBackground(in_vision)
                );
            }
        }

    private containsPoint(collection: Array<[number, number]>, target: [number, number]) {
        for (const point of collection) {
            if (point[0] == target[0] && point[1] == target[1]) return true;
        }

        return false;
    }

    /**
     * Map the event to an action. Might externalize this.
     * @param eventName 
     * @param event 
     */
    handleInput(eventName: string, event: KeyboardEvent) {
        if (!this.focus) return;

        if (eventName == "keydown") {
            switch (event.code) {
                case 'ArrowUp':
                case 'Numpad8':
                    this.focus.MixinProps(MixinNames.moveable).tryMove({ dx: 0, dy: -1 });
                    break;
                case 'ArrowDown':
                case 'Numpad2':
                    this.focus.MixinProps(MixinNames.moveable).tryMove({ dx: 0, dy: 1 });
                    break;
                case 'ArrowLeft':
                case 'Numpad4':
                    this.focus.MixinProps(MixinNames.moveable).tryMove({ dx: -1, dy: 0 });
                    break;
                case 'ArrowRight':
                case 'Numpad6':
                    this.focus.MixinProps(MixinNames.moveable).tryMove({ dx: 1, dy: 0 });
                    break;
                case 'Numpad7':
                    this.focus.MixinProps(MixinNames.moveable).tryMove({ dx: -1, dy: -1 });
                    break;
                case 'Numpad9':
                    this.focus.MixinProps(MixinNames.moveable).tryMove({ dx: 1, dy: -1 });
                    break;
                case 'Numpad1':
                    this.focus.MixinProps(MixinNames.moveable).tryMove({ dx: -1, dy: 1 });
                    break;
                case 'Numpad3':
                    this.focus.MixinProps(MixinNames.moveable).tryMove({ dx: 1, dy: 1 });
                    break;
                case 'KeyP':
                    const pos = this.focus.getPos();
                    console.log("Hello, I am now at " + pos.x + ', ' + pos.y);
                    break;
                case 'KeyX':
                    this.focus.MixinProps(MixinNames.vision).toggleXray();
                    break;
                default:
                    this.focus.MixinProps(MixinNames.damagable).decrementHp(1);
                    console.log(this.focus.MixinProps(MixinNames.damagable).getHp());
                    break;
            }
        }

        this.refresh();
        EngineWrapper.engine.unlock()
    }

    /**
     * Binds a site to this screen.
     * @param site Reference to the site to be bounded to this Screen.
     */
    bindSite(site: Site) {
        this.current_site = site;
    }

    /**
     * @returns Return the current site.
     */
    getSite() {
        return this.current_site;
    }
}