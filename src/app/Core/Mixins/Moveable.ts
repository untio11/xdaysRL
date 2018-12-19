import { Mixin } from "./Mixin";
import { position } from '../World/Site';
import { Entity } from "../Entities/Entity";
import { DerivedStats } from "./Stats";

export const ID: string = 'Moveable';

/**
 * Allows entities to move around the map.
 */
export class Moveable implements Mixin {
    readonly id = ID;
    owner: Entity;
    speed: number;

    constructor(owner: Entity, properties?: {speed?: number}) {
        properties = properties || {};
        this.speed = Math.max((properties.speed || 10) + owner.getAbilityMod().agility, 1);;
        this.owner = owner;
        return this;
    }

    getStats() {
        return {
            speed: this.speed
        };
    }

    /**
     * Try to execute the given move on the given site.
     * @param move Contains a displacement in the x (dx) and a displacement in the y (dy) direction.
     * @param site Contains a reference to the site this entity moves on.
     * @returns True if the move succeeded, false otherwise.
     */
    tryMove(move: {dx: number, dy: number}): boolean {
        let site = this.owner.getPos().site; 
        let target_pos = this.newPos(move.dx, move.dy);
        let target_tile = site.getTile(target_pos);
        let current_tile = site.getTile(this.owner.getPos());

        if (current_tile.tryExit(this.owner)) {
            if (target_tile.tryEnter(this.owner)) {
                current_tile.exit(this.owner);
                this.owner.setPos(target_pos);
                target_tile.enter(this.owner);
                return true;
            }
        }

        return false;
    }

    /**
     * Return a position based on the current position and a displacement.
     * @param dx displacement in x direction.
     * @param dy displacement in y direction.
     */
    private newPos(dx: number, dy: number): position {
        return this.owner.getPos().add(dx, dy);
    }

    getSpeed() {
        return this.speed;
    }

    setSpeed(new_speed: number) {
        this.speed = Math.max(new_speed, 0);
    }
}