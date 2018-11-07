import { Glyph } from './Glyph'

export class Tile {
    glyph: Glyph;
    static nullTile: Tile = new Tile(new Glyph()); // Basic empty tile
    static wallTile: Tile = new Tile(new Glyph('#', 'goldenrod'));
    static floorTile: Tile = new Tile(new Glyph('.', 'ghostwhite'));

    constructor(glyph: Glyph) {
        this.glyph = glyph;
    }

    getGlyph() {
        return this.glyph;
    }
}