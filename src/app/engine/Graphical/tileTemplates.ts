import { Color, colors } from "./colors";
import { GlyphProperties } from "./../Glyph";

/**
 * Here we will define all properties a tile can have. Might want to add something cool like mixins to tiles or something.
 */
export interface TileProperties extends GlyphProperties {
    walkable?: boolean;
    randomized_fg?: boolean;
    randomized_bg?: boolean;
    frequency?: number;
    light_passes?: boolean;
}

export const grassTemplate: TileProperties = {
    char: [',', '.'],
    fg: colors.grass_green,
    randomized_fg: true,
    frequency: 0.2,
    bg: Color.hsl2rgb(Color.add(Color.rgb2hsl(colors.grass_green), [0, 0, -0.18])),
    walkable: true
};

export const wallTemplate: TileProperties = {

};

export const treeTemplate: TileProperties = {
    char: '#',
    fg: colors.wood_light,
    randomized_fg: true,
    bg: Color.hsl2rgb(Color.add(Color.rgb2hsl(colors.wood_light), [0, 0, -0.185])),
    walkable: false,
    
};