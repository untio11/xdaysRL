import { Glyph, GlyphProperties } from "./Glyph";
import { Action } from './actions/Actions';

export class Entity extends Glyph {
    name: string;
    x: number;
    y: number;
    action_list: {[property_name: string]: Action} = {};
    

    constructor(properties: EntityProperties) {
        super(properties);
        this.name = properties.name || "Placeholder";
        this.x = properties.x || 0;
        this.y = properties.y || 0;

        let actions = properties.actions || [];
        
        for (let action of actions) {
            this.action_list[action.name] = action.init();
        }
    }

    setPos(x?: number, y?: number) {
        this.x = x || this.x;
        this.y = y || this.y;
    }

    getPos() {
        return {x: this.x, y: this.y};
    }
}

export interface EntityProperties extends GlyphProperties {
    name?: string;
    x?: number;
    y?: number;
    actions?: Action[];
}