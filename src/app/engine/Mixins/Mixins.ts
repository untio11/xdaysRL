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