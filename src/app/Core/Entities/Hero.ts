import { Entity, EntityProperties } from "./Entity";
import { Site } from "../World/Site";
import { EngineWrapper } from "../Engine/Engine";

/**
 * Class defining the player character. It's a subclass of entity.
 */
export class Hero extends Entity {
    constructor(properties: EntityProperties, site: Site) {
        super(properties, site);
    }

    act() {
        EngineWrapper.engine.lock();
    }
}