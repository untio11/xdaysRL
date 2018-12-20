import { GlyphProperties } from "../Graphical/Glyph";

export interface ItemProperties extends GlyphProperties {
    name: string;
    throwable: boolean;
    damage: number;
}