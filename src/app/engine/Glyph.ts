export class Glyph {
    private character: string;
    private foreground: string;
    private background: string;

    constructor(char?: string, fg?: string, bg?: string) {
        this.character = char || ' ';
        this.foreground = fg || 'white';
        this.background = bg || 'black';
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