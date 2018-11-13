/**
 * Base class for graphical reprisentation of anything (mostly entities).
 */
export class Glyph {
    /** The character to be displayed when this glyph is printed.
     * Default character is ' '.
    */
    private character: string;
    /** Foreground colour for this glyph.
     * Default colour is white.
    */
    private foreground: string;
    /** Background colour for this glyph.
     * Default colour is black.
     */
    private background: string;

    /**
     * Initialize according to the given optional properties or use the default values.
     * @param properties 
     */
    constructor(properties?: GlyphProperties) {
        properties = properties || {};
        this.character = properties.char || ' ';
        this.foreground = properties.fg || 'white';
        this.background = properties.bg || 'black';
    }

    /**@returns The character of this glyph. */
    getCharacter() {
        return this.character;
    }

    /**@returns The foreground colour of this glyph. */
    getForeground() {
        return this.foreground;
    }
    
    /**@returns The background colour of this glyph. */
    getBackground() {
        return this.background;
    }
}

/**
 * Three properties that define the glyph.
 */
export interface GlyphProperties {
    fg?: string,
    bg?: string,
    char?: string
}