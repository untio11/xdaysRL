import { EntityProperties } from "./Entity";
import { Actor } from "./Actor";
import { Site } from "../World/Site";
import { EngineWrapper } from "../Engine/Engine";
import { MixinNames } from "../Mixins/MixinNames";

/**
 * Class defining the player character. It's a subclass of entity.
 */
export class Hero extends Actor {
    constructor(properties: EntityProperties, site: Site) {
        super(properties, site);
        EngineWrapper.scheduler.add(this, true);
    }

    act() {
        EngineWrapper.engine.lock();
    }
}