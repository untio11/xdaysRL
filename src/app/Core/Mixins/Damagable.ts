import { Mixin } from "./Mixin";
import { Entity } from "../Entities/Entity";

export const ID: string = 'Damagable';

/**
 * Allows entities to have health, be damagable and be healed.
 */
export class Damagable implements Mixin {
    readonly id = ID;
    owner: Entity;
    /** Keeps track of the amount of health this entity has left */
    health: number;
    max_health: number;
    targeted: boolean;
    
    /**
     * Might want to add starting health and stuff like that. Maybe defense as well.
     * @param owner self explanatory
     */
    constructor(owner: Entity, properties?: {starting_hp?: number, max_hp?: number}) {
        properties = properties || {};
        this.owner = owner;
        this.health = properties.starting_hp || 10;
        this.max_health = properties.max_hp || this.health;
        this.targeted = false;
    }

    /**
     * Decrement the health of the unit based on the damage taken.
     * @param damage The amount of damage taken.
     * @returns The amount of current health left.
     */
    decrementHp(damage: number) {
        this.health = Math.max(0, this.health - damage);
        console.log("ouch: " + this.getHp() + '/' + this.max_health);
        if (this.health == 0) this.die();
    }

    /**
     * Increase the health of the target. For potion use and such.
     * @param deltaHp The amount of health to be increased
     * @returns The amount of health the target currently has.
     */
    incrementHp(deltaHp: number) {
        this.health = Math.min(this.health + deltaHp, this.max_health);
        return this.getHp();
    }

    /**
     * Return the current amount of health
     */
    getHp() {
        return this.health;
    }

    setHp(new_hp: number) {
        this.health = Math.max(Math.min(new_hp, this.max_health), 0);
    }

    setTargeted(new_val: boolean) {
        this.targeted = new_val;
    }

    die() {
        // Drop items or something
        this.owner.getPos().site.remove(this.owner);
    }
}