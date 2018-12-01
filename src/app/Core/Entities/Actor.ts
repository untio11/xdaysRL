import { Entity, EntityProperties } from "./Entity";
import { Site } from "../World/Site";

export abstract class Actor extends Entity {
    constructor(properties: EntityProperties, site: Site) {
        super(properties, site);
    }

    abstract act(...args: any): void;
}