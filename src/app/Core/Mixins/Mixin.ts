import { Entity } from "../Entities/Entity";
import { Stats } from "./Stats";

/**
 * Basic interface for every mixin.
 */
export interface Mixin {
    /** ID for identifying reasons. */
    readonly id: string;
    /** The entity it acts upon. */
    owner: Entity;
    getStats(): Stats;
}