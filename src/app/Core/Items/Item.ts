import { Glyph } from "../Graphical/Glyph";
import { ItemProperties } from "./ItemProperties";

export class Item extends Glyph {
    protected name: string;
    readonly throwable: boolean;
    readonly damage: number;

    constructor(properties: ItemProperties) {
        super(properties);
        this.name = properties.name;
        this.throwable = properties.throwable;
        this.damage = properties.damage;
    }

    toString(): string {
        return `${this.name} (${this.damage.toString()})`;
    }
}