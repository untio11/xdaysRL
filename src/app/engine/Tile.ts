import { Glyph, GlyphProperties } from './Glyph'
import { Color, colors } from "./Graphical/colors";

/**
 * Describes the thing the world is made out of.
 */
export class Tile extends Glyph {
    /** Empty tile for easy checking  */
    static nullTile: Tile = new Tile(); // Basic empty tile
    
    /** Determines if this tile is walkable, default is false */
    walkable: boolean;
    /** Whether the foreground should randomly change color */
    randomized_fg: boolean;
    /** The frequency at which the changing of color happens. Percentage in range [0, 1). -1 makes sure color is randomly set once at creation. */
    frequency: number;
    /** Whether the background should randomly change color */
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
        this.frequency = properties.frequency || -1;
        if (this.randomized_bg) this.setBackground(this.randomizeColor(this.background)); // To get initial (possibly) random color.
        if (this.randomized_fg) this.setForeground(this.randomizeColor(this.foreground)); // To get initial (possibly) random color.
    }

    private shouldUpdate(type: boolean, frequency: number) {
        return type && frequency != -1 && frequency > Math.random();
    }

    private randomizeColor(color: [number, number, number]) {
        return Color.randomize(color, [10, 10, 10]);
    }

    getBackground() {
        return Color.toRGB(this.shouldUpdate(this.randomized_bg, this.frequency) ?
            this.randomizeColor(this.background) :
            this.background);
    }

    getForeground() {
        return Color.toRGB(this.shouldUpdate(this.randomized_fg, this.frequency) ?
            this.randomizeColor(this.foreground) :
            this.foreground);
    }
}

/**
 * Here we will define all properties a tile can have. Might want to add something cool like mixins to tiles or something.
 */
export interface TileProperties extends GlyphProperties {
    walkable?: boolean;
    randomized_fg?: boolean;
    randomized_bg?: boolean;
    frequency?: number;
}

export const grassTemplate: TileProperties = {
    char: [',', '.'],
    fg: colors.grass_green,
    randomized_fg: true,
    frequency: 0.2,
    bg: Color.hsl2rgb(Color.add(Color.rgb2hsl(colors.grass_green), [0,0,-0.18])),
    walkable: true
};

export const treeTemplate: TileProperties = {
    char: '#',
    fg: colors.wood_light,
    randomized_fg: true,
    bg: Color.hsl2rgb(Color.add(Color.rgb2hsl(colors.wood_light), [0, 0, -0.185])),
    walkable: false
};