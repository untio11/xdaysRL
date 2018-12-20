import { Item } from "./Item";
import { PotionProperties } from "./PotionProperties";

export class Potion extends Item {
    constructor(properties: PotionProperties) {
        super(properties);
    }

    getDamage() {
        return this.damage;
    }
}