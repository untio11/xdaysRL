import { Glyph, GlyphProperties } from './Glyph'

export class Tile extends Glyph {
    static nullTile: Tile = new Tile(); // Basic empty tile
    static wallTile: Tile = new Tile({ char: '#', fg: 'goldenrod', walkable: false });
    static floorTile: Tile = new Tile({char:'.', fg:'ghostwhite', walkable: true});

    walkable: boolean;
    
    constructor(properties?: TileProperties) {
        super(properties);
        properties = properties || {};
        this.walkable = properties.walkable || false;
    }
}

export interface TileProperties extends GlyphProperties {
    walkable?: boolean;
}