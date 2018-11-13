import { Glyph, GlyphProperties } from './Glyph'

/**
 * Describes the thing the world is made out of.
 */
export class Tile extends Glyph {
    /** Empty tile for easy checking  */
    static nullTile: Tile = new Tile(); // Basic empty tile
    /** Static walltile to save memory */
    static wallTile: Tile = new Tile({ char: '#', fg: 'goldenrod', walkable: false });
    /** Static floortile to save memory */
    static floorTile: Tile = new Tile({char:'.', fg:'ghostwhite', walkable: true});

    /** Determines if this tile is walkable, default is false */
    walkable: boolean;
    
    /**
     * Initialize a new tile.
     * @param properties determines the properties of the tile. See TileProperties for more info
     */
    constructor(properties?: TileProperties) {
        super(properties);
        properties = properties || {};
        this.walkable = properties.walkable || false;
    }
}

/**
 * Here we will define all properties a tile can have. Might want to add something cool like mixins to tiles or something.
 */
export interface TileProperties extends GlyphProperties {
    walkable?: boolean;
}