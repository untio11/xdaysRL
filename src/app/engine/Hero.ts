import { Entity, EntityProperties } from "./Entity";
import { colors, Color } from "./Graphical/colors";

/**
 * Class defining the player character. It's a subclass of entity.
 */
export class Hero extends Entity {
    constructor(properties: EntityProperties) {
        super(properties);
    }

    act() {
        
    }
}


const HeroTemplate: EntityProperties = {
    char: '@',
    mixins: ["moveable", "damagable"],
    fg: Color.fromString('white'),
    name: 'Player'
}

export { HeroTemplate };
