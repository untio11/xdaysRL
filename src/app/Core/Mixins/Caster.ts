import { Mixin } from "./Mixin";
import { Entity } from "../Entities/Entity";
import { DerivedStats } from "./Stats";

export const ID: string = 'Caster';

export class Caster implements Mixin {
    readonly id = ID;
    owner: Entity;

    private mana: number;
    private max_mana: number;

    constructor(owner: Entity, properties?: {mana?: number, max_mana?: number}) {
        properties = properties || {};
        this.owner = owner;

        this.max_mana = Math.max(((properties.max_mana || 7) + owner.getAbilityMod().intelligence), 0);
        this.mana = this.max_mana;
    }

    getStats(): DerivedStats {
        return {
            mana: this.mana,
            max_mana: this.max_mana
        };
    }
}