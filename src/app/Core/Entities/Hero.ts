import { Entity, EntityProperties } from "./Entity";
import { colors, Color } from "../Graphical/colors";
import { Site } from "../World/Site";

/**
 * Class defining the player character. It's a subclass of entity.
 */
export class Hero extends Entity {
    constructor(properties: EntityProperties, site: Site) {
        super(properties, site);
    }

    act() {
        
    }
}