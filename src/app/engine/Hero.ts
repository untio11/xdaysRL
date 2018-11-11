import { Entity, EntityProperties } from "./Entity";
import { Moveable, applyMixins } from "./actions/Mixins";

export class Hero extends Entity implements Moveable {
    constructor(properties: EntityProperties) {
        super(properties);
    }

    tryMove: () => boolean;
}

applyMixins(Hero, [Moveable]);