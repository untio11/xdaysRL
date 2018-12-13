import { Glyph, GlyphProperties } from "../Graphical/Glyph";
import { Mixins } from "../Mixins/Index";
import { MixinContainer } from "../Mixins/MixinContainer";
import { Site, position } from "../World/Site";
import { MixinNames } from "../Mixins/MixinNames";
import { Stats } from "../Mixins/Stats";

/**
 * Base class for all entities. Extends glyph because all entities are to be represented by a glyph.
 */
export abstract class Entity extends Glyph {
    /** All entities should have a name. */
    name: string;
    /** And all entities should have a position*/
    protected position: position;
    /** The last position this entity was seen at. */
    protected last_pos: position;
    /**An object to hold the mixins of this entity*/
    protected mixins: MixinContainer;
    readonly id: number;
    protected static counter = 0;
    readonly type: entityTypes;

    /**
     * Set the name position and glyph properties for this entity.
     * @param properties Contains a bunch of optional properties and a list of mixins which define what kind of functionality this entity has.
     */
    constructor(properties: EntityProperties, site: Site) {
        super(properties);
        this.id = Entity.counter++;
        this.type = properties.type;
        this.name = properties.name || "Placeholder";
        this.position = new position (
            properties.x || 0,
            properties.y || 0,
            site
        );

        this.last_pos = new position (
            -1,
            -1,
            site
        );

        this.mixins = new MixinContainer();
        // Instantiate and link the mixins based on the given list of mixins.
        for (let mixin_name of properties.mixins) {
            if (Mixins.hasOwnProperty(mixin_name)) {
                if (properties.mixin_options && properties.mixin_options.hasOwnProperty(mixin_name)) {
                    this.addMixin(mixin_name, properties.mixin_options[mixin_name]);
                } else {
                    this.addMixin(mixin_name);
                }
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

    updateLastPos() {
        this.last_pos = this.position;
    }

    getLastPos() {
        return this.last_pos;
    }

    /**
     * @returns The current location of the entity
     */
    getPos() {
        return this.position;
    }

    addMixin(name: string, properties?: {}) {
        if (Mixins.hasOwnProperty(name)) {
            this.mixins.push(new Mixins[name](this, properties));
            return true;
        }
        return false;
    }

    removeMixin(name: string) {
        if (this.hasMixin(name)) {
            this.mixins.pop(new Mixins[name](this));
            return true;
        }
        return false;
    }

    hasMixin(name: string) {
        return this.mixins.hasOwnProperty(name);
    }

    MixinProps(name: string) {
        if (this.hasMixin(name)) {
            return this.mixins[name];
        } else {
            return undefined;
        }
    }

    /**
     * If the entity has the Moveable mixin, it returs the speed, otherwise, it wil return 0 for stationary entities.
     */
    getSpeed() {
        return this.hasMixin(MixinNames.moveable) ? this.MixinProps(MixinNames.moveable).getSpeed() : 0;
    }

    inKnownTerritory() {
        return this.position.site.getTile(this.position).explored;
    }

    getBackground(in_vision: boolean) {
        if (this.MixinProps(MixinNames.damagable).targeted) {
            return "yellow";
        } else {
            return this.position.site.getTile(this.position).getBackground(in_vision);
        }
    }

    getStats() {
        let result: Stats = {};
        const mixins = this.mixins.getAll();
        for (const mixin of mixins) {
            const stats = mixin.getStats();
            for (const stat of Object.keys(stats)) {
                result[stat] = stats[stat];
            }
        }
        return result;
    }
}

/**
 * Entities are just glyphs with possibly mixins.
 */
export interface EntityProperties extends GlyphProperties {
    name?: string;
    x?: number;
    y?: number;
    mixins: string[];
    mixin_options?: {[name: string]: {}}
    type: entityTypes
}

export const enum entityTypes {
    'Player' = 1,
    'Enemy',
    'Neutral',
    'Passive'
}