import { Glyph, GlyphProperties } from './Glyph'
import { Color } from "rot-js";

/**
 * Describes the thing the world is made out of.
 */
export class Tile extends Glyph {
    /** Empty tile for easy checking  */
    static nullTile: Tile = new Tile(); // Basic empty tile
    /** Static walltile to save memory */
    static wallTile: Tile = new Tile({ char: '#', fg: 'goldenrod', bg: 'goldenrod', randomized_fg: true, walkable: false });
    /** Static floortile to save memory */
    static floorTile: Tile = new Tile({char: '.', fg:'green', bg:'green', walkable: true, randomized_bg: true});
    
    /** Determines if this tile is walkable, default is false */
    walkable: boolean;
    randomized_fg: boolean;
    randomized_bg: boolean;
    
    /**
     * Initialize a new tile.
     * @param properties determines the properties of the tile. See TileProperties for more info
     */
    constructor(properties?: TileProperties) {
        super(properties);
        properties = properties || {};
        this.walkable = properties.walkable || false;
        this.randomized_fg = properties.randomized_fg || false;
        this.randomized_bg = properties.randomized_bg || false;
    }

    getBackground() {
        if (this.randomized_bg) {
            return Color.toRGB(Color.randomize(Color.fromString(this.background), [2, 10, 2]));
        } else {
            return this.background;
        }
    }

    getForeground() {
        if (this.randomized_fg) {
            return Color.toRGB(Color.randomize(Color.fromString(this.foreground), [10, 10, 10]));
        } else {
            return this.foreground;
        }
    }
}

/**
 * Here we will define all properties a tile can have. Might want to add something cool like mixins to tiles or something.
 */
export interface TileProperties extends GlyphProperties {
    walkable?: boolean;
    randomized_fg?: boolean;
    randomized_bg?: boolean;
}

export const grassTemplate = {
    char: '.',
    fg: 'green',
    bg: 'darkolivegreen',
    walkable: true,
    randomized_bg: true
};