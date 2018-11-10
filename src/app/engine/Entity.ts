import { Glyph, GlyphProperties } from "./Glyph";

export class Entity extends Glyph {
    name: string;
    x: number;
    y: number;

    constructor(properties: EntityProperties) {
        super(properties);
        this.name = properties.name || "Placeholder";
        this.x = properties.x || 0;
        this.y = properties.y || 0;
    }
}

export interface EntityProperties extends GlyphProperties {
    name?: string;
    x?: number;
    y?: number;
}