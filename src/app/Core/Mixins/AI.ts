import { Mixin } from "./Mixin";
import { ID as MoveableName } from "./Moveable";
import { Entity } from "../Entities/Entity";
import { Stats } from "./Stats";

export const ID: string = 'AI';

export class AI implements Mixin {
    readonly id = ID;
    owner: Entity;
    
    constructor(owner: Entity, properties?: {}) {
        properties = properties || {};
        this.owner = owner;
        return this;
    }

    getStats(): Stats {
        return {};
    } 

    act() {
        this.owner.MixinProps(MoveableName).tryMove(this.randomMove());
    }

    private randomMove() {
        return { dx: (Math.random() < 0.33 ? -1 : Math.random() < 0.33 ? 1 : 0), dy: (Math.random() < 0.33 ? -1 : Math.random() < 0.33 ? 1 : 0) };
    }
}