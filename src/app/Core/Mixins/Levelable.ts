import { Mixin } from "./Mixin";
import { Entity } from "../Entities/Entity";
import { Stats } from "./Stats";

export const ID: string = 'Levelable';

export class Levelable implements Mixin {
    readonly id = ID;
    owner: Entity;

    private perception: number;
    private strength: number;
    private agility: number;
    private constitution: number;
    private intelligence: number;
    private level: number;
    private exp: number;

    constructor(owner: Entity, properties?: levelableProperties) {
        properties = properties || {};
        this.owner = owner;
        this.perception = properties.perception || 10;
        this.strength = properties.strength || 10;
        this.agility = properties.agility || 10;
        this.exp = properties.exp || 0;
        this.level = properties.level || 1;
        this.constitution = properties.constitution || 10;
        this.intelligence = properties.intelligence || 10;
        return this;
    }

    getStats(): Stats {
        return {
            perception: this.perception,
            strength: this.strength,
            agility: this.agility,
            constitution: this.constitution,
            intelligence: this.intelligence,
            lvl: this.level,
            exp: this.exp,
            nextlvl_exp: this.nextLvlExp()
        };
    }

    private nextLvlExp(): number {
        return Math.floor(Math.pow((this.level + 9), 2) * 0.8 - 50);
    }
}

interface levelableProperties {
    perception?: number;
    strength?: number;
    constitution?: number;
    agility?: number;
    intelligence?: number;

    level?: number;
    exp?: number;
}