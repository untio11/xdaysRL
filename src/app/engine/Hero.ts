import { Entity, EntityProperties } from "./Entity";
import { Moveable, applyMixins } from "./actions/Mixins";
import { Site, position } from "./Site";

export class Hero extends Entity implements Moveable {
    constructor(properties: EntityProperties) {
        super(properties);
        applyMixins(Hero, properties.mixins);
    }
    
    tryMove(target: position, site: Site) { // Should change to a new implementation after mixing.
        console.log("Original trymove");
        return true
    }
}


const HeroTemplate: EntityProperties = {
    char: '@',
    mixins: [Moveable],
    fg: 'white',
    name: 'Player'
}

export { HeroTemplate };
