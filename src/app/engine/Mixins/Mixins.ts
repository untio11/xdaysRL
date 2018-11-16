import { Entity } from "./../Entity";

/**
 * Basic interface for every mixin.
 */
export interface Mixin {
    /** ID for identifying reasons. */
    readonly id: string;
    /** The entity it acts upon. */
    owner: Entity;
}

/**
 * Silly construct to contain a bunch of mixins.
 */
export class MixinContainer {
    /** index mixins by their name, store them as any, so we can call arbitrary functions on them. */
    [name: string]: any;
    
    constructor(mixins?: { [name: string]: any }) {
        if (!mixins) return;

        // Loop over the keys used to map the mixins and add them to the container.
        for (let key in mixins) {
            this[key] = mixins[key];
        }

        this.collectProperties();
    }

    /** Add a new mixin to the list and map it to its name. I guess it just overrides if it exists already. */
    push(mixin: any) {
        this[mixin.id] = mixin;
    }

    pop(id: string) {
        if (this.hasOwnProperty(id)) {
            delete this.id;
        }
    }

    collectProperties() {
        for (let key in this) {
            console.log(key);
        }
    }
}