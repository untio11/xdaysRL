import { RNG, Color } from "rot-js";

/**
 * Base class for graphical reprisentation of anything (mostly entities).
 */
export class Glyph {
    /** The character to be displayed when this glyph is printed.
     * Default character is ' '.
    */
    protected character: string;
    /** Foreground colour for this glyph.
     * Default colour is white.
    */
    protected foreground: [number, number, number];
    /** Background colour for this glyph.
     * Default colour is black.
     */
    protected background: [number, number, number];

    /**
     * Initialize according to the given optional properties or use the default values.
     * @param properties 
     */
    constructor(properties?: GlyphProperties) {
        properties = properties || {};
        if (!properties.char) this.character = ' ';
        else this.character = (Array.isArray(properties.char)) ? properties.char[RNG.getUniformInt(0, properties.char.length - 1)] : properties.char;

        this.foreground = properties.fg || [255, 255, 255];
        this.background = properties.bg || [0, 0, 0];
    }

    /**@returns The character of this glyph. */
    getCharacter() {
        return this.character;
    }

    /**@returns The foreground colour of this glyph. */
    getForeground(in_vision = true): string {
        return in_vision ? Color.toRGB(this.foreground) : this.dimColor(this.foreground);
    }
    
    /**@returns The background colour of this glyph. */
    getBackground(in_vision = true): string {
        return in_vision ? Color.toRGB(this.background) : this.dimColor(this.background);
    }

    /**
     * Dim a color to 25% of its original saturation.
     * @param color The color to be dimmed in rgb format.
     */
    dimColor(color: [number, number, number]) {
        const color_code = Color.rgb2hsl(color);
        return Color.toRGB(Color.hsl2rgb(Color.add(color_code, [0, -0.75 * color_code[1], 0])));
    }

    /** Update the foregound color of this glyph */
    protected setForeground(new_color: [number, number, number]): void {
        this.foreground = new_color;
    }

    /** Update the background color of this glyph */
    protected setBackground(new_color: [number, number, number]): void {
        this.background = new_color;
    }

    protected setCharacter(new_character: string) {
        if (new_character.length == 1) {
            this.character = new_character;
        }
    }
}

/**
 * Three properties that define the glyph.
 */
export interface GlyphProperties {
    fg?: [number, number, number],
    bg?: [number, number, number],
    char?: string | string[]
}