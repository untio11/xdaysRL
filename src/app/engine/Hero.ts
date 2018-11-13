import { Entity, EntityProperties } from "./Entity";
import { Site } from "./Site";

/**
 * Class defining the player character. It's a subclass of entity.
 */
export class Hero extends Entity {
    constructor(properties: EntityProperties, site?: Site) {
        super(properties, site);
    }

    act(eventName: string, event: KeyboardEvent) {
        return this.handleInput(eventName, event);
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
                    this.mixins['Movable'].tryMove({ dx: 0, dy: -1 }, this.position.site);
                    break;
                case 'ArrowDown':
                case 'Numpad2':
                    this.mixins['Movable'].tryMove({ dx: 0, dy: 1 }, this.position.site);
                    break;
                case 'ArrowLeft':
                case 'Numpad4':
                    this.mixins['Movable'].tryMove({ dx: -1, dy: 0 }, this.position.site);
                    break;
                case 'ArrowRight':
                case 'Numpad6':
                    this.mixins['Movable'].tryMove({ dx: 1, dy: 0 }, this.position.site);
                    break;
                case 'Numpad7':
                    this.mixins['Movable'].tryMove({ dx: -1, dy: -1 }, this.position.site);
                    break;
                case 'Numpad9':
                    this.mixins['Movable'].tryMove({ dx: 1, dy: -1 }, this.position.site);
                    break;
                case 'Numpad1':
                    this.mixins['Movable'].tryMove({ dx: -1, dy: 1 }, this.position.site);
                    break;
                case 'Numpad3':
                    this.mixins['Movable'].tryMove({ dx: 1, dy: 1 }, this.position.site);
                    break;
                default:
                    this.mixins["Damagable"].takeHit(1);
                    console.log(this.mixins["Damagable"].getHp());
                    break;
            }
        }
    }
}


const HeroTemplate: EntityProperties = {
    char: '@',
    mixins: ["Moveable", "Damagable"],
    fg: 'white',
    name: 'Player',
    actor: true
}

export { HeroTemplate };
