import { Entity, EntityProperties } from "../Entities/Entity";
import { Site } from "../World/Site";

export class Cursor extends Entity {
    constructor(properties: EntityProperties, site: Site) {
        super(properties, site);
    }
}