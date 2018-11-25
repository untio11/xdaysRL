import { Glyph } from './Glyph'
import { Color } from "./Graphical/colors";
import { TileProperties } from "./Graphical/tileTemplates";

/**
 * Describes the thing the world is made out of.
 */
export class Tile extends Glyph {
    /** Empty tile for easy checking  */
    static nullTile: Tile = new Tile(); // Basic empty tile
    
    /** Determines if this tile is walkable, default is false */
    walkable: boolean;
    /** Whether the foreground should randomly change color. Defaults to false. */
    randomized_fg: boolean;
    /** The frequency at which the changing of color happens. Percentage in range [0, 1). -1 makes sure color is randomly set once at creation. Defaults to -1 */
    frequency: number;
    /** Whether the background should randomly change color. Defaults to false */
    randomized_bg: boolean;
    /** Wether ligth passes throught this tile. Used for the fov and visibility copmutations. Default is set to true*/
    light_passes: boolean;
    /** Wether this tile has been seen yet. */
    explored: boolean;

    
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
        this.frequency = properties.frequency || -1;
        if (this.randomized_bg) this.setBackground(this.randomizeColor(this.background)); // To get initial (possibly) random color.
        if (this.randomized_fg) this.setForeground(this.randomizeColor(this.foreground)); // To get initial (possibly) random color.
        this.light_passes = (properties.light_passes == undefined) ? true : properties.light_passes; 
        this.explored = false;
    }

    private shouldUpdate(type: boolean, frequency: number) {
        return type && frequency != -1 && frequency > Math.random();
    }

    private randomizeColor(color: [number, number, number]) {
        return Color.randomize(color, [10, 10, 10]);
    }

    getBackground(should_update?: boolean) {
        should_update = (should_update == undefined) ? true : should_update;

        return Color.toRGB(should_update && this.shouldUpdate(this.randomized_bg, this.frequency) ?
            this.randomizeColor(this.background) :
            this.background);
    }

    getForeground(should_update?: boolean) {
        should_update = (should_update == undefined) ? true : should_update;

        return Color.toRGB(should_update && this.shouldUpdate(this.randomized_fg, this.frequency) ?
            this.randomizeColor(this.foreground) :
            this.foreground);
    }
}