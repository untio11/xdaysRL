export class Glyph {
    private character: string;
    private foreground: string;
    private background: string;

    constructor(properties?: GlyphProperties) {
        properties = properties || {};
        this.character = properties.char || ' ';
        this.foreground = properties.fg || 'white';
        this.background = properties.bg || 'black';
    }

    getCharacter() {
        return this.character;
    }

    getForeground() {
        return this.foreground;
    }
    
    getBackground() {
        return this.background;
    }
}

export interface GlyphProperties {
    fg?: string,
    bg?: string,
    char?: string
}