import { Mixin } from "./Mixins";
import { Entity } from "./../Entity";

export const ID: string = 'Damagable';

export class Damagable implements Mixin {
    id = ID;
    owner: Entity;
    health: number;
    
    /**
     * Might want to add starting health and stuff like that. Maybe defense as well.
     * @param owner self explanatory
     */
    constructor(owner: Entity, starting_hp: number) {
        this.owner = owner;
        this.health = starting_hp | 10;
    }

    /**
     * Decrement the health of the unit based on the damage taken.
     * @param damage The amount of damage taken.
     * @returns The amount of current health left.
     */
    takeHit(damage: number) {
        this.health = Math.max(0, this.health - damage);
        return this.health;
    }

    getHp() {
        return this.health;
    }
}