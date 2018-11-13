import { Entity, EntityProperties } from "./Entity";

import { Site, position } from "./Site";

/**
 * Class defining the player character. It's a subclass of entity.
 */
export class Hero extends Entity {
    constructor(properties: EntityProperties) {
        super(properties);
    }
}


const HeroTemplate: EntityProperties = {
    char: '@',
    mixins: ["Moveable"],
    fg: 'white',
    name: 'Player'
}

export { HeroTemplate };
