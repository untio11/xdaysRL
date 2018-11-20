/**
 * Silly construct to contain a bunch of mixins.
 */
export class MixinContainer {
    /** index mixins by their name, store them as any, so we can call arbitrary functions on them. */
    [name: string]: any;
    default_properties: string[] = [];

    constructor(mixins?: { [name: string]: any }) {
        for (let key in this) { // Store the initial proporties of this object (which are to be ignored by collectproperties)
            this.default_properties.push(key);
        }

        if (!mixins) return;

        // Loop over the keys used to map the mixins and add them to the container.
        for (let key in mixins) {
            this[key] = mixins[key];
        }
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
}