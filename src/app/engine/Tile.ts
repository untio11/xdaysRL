import { Glyph, GlyphProperties } from './Glyph'

export class Tile {
    static nullTile: Tile = new Tile(); // Basic empty tile
    static wallTile: Tile = new Tile({ char: '#', fg: 'goldenrod', walkable: false });
    static floorTile: Tile = new Tile({char:'.', fg:'ghostwhite', walkable: true});
    
    glyph: Glyph;
    walkable: boolean;
    
    constructor(properties?: TileProperties) {
        properties = properties || {};
        this.glyph = new Glyph(properties);
        this.walkable = properties.walkable || false;
    }

    getGlyph() {
        return this.glyph;
    }
}

export interface TileProperties extends GlyphProperties {
    walkable?: boolean;
}