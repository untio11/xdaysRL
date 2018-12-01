import { Mixin } from "./Mixin";
import { ID as MoveableName } from "./Moveable";
import { Entity } from "../Entities/Entity";
import { Vision } from "./Vision";

export const ID: string = 'Attack';

export class Attack implements Mixin {
    readonly id = ID;
    owner: Entity
    private range: number;
    private damage: number;
    /** Use the vision mixin to compute what targets are in range. */
    private range_computation: Vision;

    constructor(owner: Entity, properties?: {range?: number, damage?: number}) {
        properties = properties || {};
        this.owner = owner;
        this.range = properties.range || 1;
        this.damage = properties.damage || 5;
        this.range_computation = new Vision(owner, {vision_radius: this.range});
    }

    attack(target: Entity) {

    }

    target() {
        const in_range = this.range_computation.getVisibileArea();
        const possible_targets = this.owner.getPos().site.getEntities(in_range);
        return possible_targets;
    }
}