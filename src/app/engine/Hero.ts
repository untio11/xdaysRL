import { Entity, EntityProperties } from "./Entity";
import { Moveable, applyMixins } from "./actions/Mixins";
import { Site, position } from "./Site";

export class Hero extends Entity implements Moveable {
    constructor(properties: EntityProperties) {
        super(properties);
        applyMixins(Hero, properties.mixins);
    }
    
    tryMove(move: {dx: number, dy: number}, site: Site): boolean { // Should change to a new implementation after mixing.
        console.log("Original trymove");
        return true
    }

    newPos(dx: number, dy: number): position { // placeholder too
        return this.position;
    };
}


const HeroTemplate: EntityProperties = {
    char: '@',
    mixins: [Moveable],
    fg: 'white',
    name: 'Player'
}

export { HeroTemplate };
