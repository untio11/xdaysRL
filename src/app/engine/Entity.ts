import { Glyph, GlyphProperties } from "./Glyph";
import { position } from "./Site";

export class Entity extends Glyph {
    name: string;
    position: position;

    constructor(properties: EntityProperties) {
        super(properties);
        this.name = properties.name || "Placeholder";
        this.position = {
            x: properties.x || 0,
            y: properties.y || 0
        };
    }

    setPos(new_pos: position) {
        this.position = new_pos;
    }

    getPos() {
        return this.position;
    }
}

export interface EntityProperties extends GlyphProperties {
    name?: string;
    x?: number;
    y?: number;
}