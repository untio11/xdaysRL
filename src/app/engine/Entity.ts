import { Glyph, GlyphProperties } from "./Glyph";
import { Mixins } from "./Mixins/Index";
import { MixinContainer } from "./Mixins/Mixins";
import { Site, position } from "./Site";

/**
 * Base class for all entities. Extends glyph because all entities are to be represented by a glyph.
 */
export abstract class Entity extends Glyph {
    /** All entities should have a name. */
    name: string;
    /** And all entities should have a position*/
    protected position: position;
    /**An object to hold the mixins of this entity*/
    mixins: MixinContainer;

    /**
     * Set the name position and glyph properties for this entity.
     * @param properties Contains a bunch of optional properties and a list of mixins which define what kind of functionality this entity has.
     */
    constructor(properties: EntityProperties, site?: Site) {
        super(properties);
        this.name = properties.name || "Placeholder";
        this.position = new position (
            properties.x || 0,
            properties.y || 0,
            site
        );

        this.mixins = new MixinContainer();
        // Instantiate and link the mixins based on the given list of mixins.
        for (let mixin_name of properties.mixins) {
            if (mixin_name in Mixins) {
                this.addMixin(mixin_name);
            }
        }
    }

    /**
     * Update the location of the entity.
     * @param new_pos Position object containing an x and y value.
     */
    setPos(new_pos: position) {
        this.position = new_pos;
    }

    /**
     * @returns The current location of the entity
     */
    getPos() {
        return this.position;
    }

    addMixin(name: string) {
        if (name in Mixins) {
            this.mixins.push(new Mixins[name](this));
            return true;
        }
        return false;
    }

    removeMixin(name: string) {
        if (name in this.mixins) {
            this.mixins.pop(new Mixins[name](this));
            return true;
        }
        return false;
    }

    abstract act(...args: any): void;
}

/**
 * Entities are just glyphs with possibly mixins.
 */
export interface EntityProperties extends GlyphProperties {
    name?: string;
    x?: number;
    y?: number;
    mixins: string[];
}