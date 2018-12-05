import { EntityProperties } from "./Entity";
import { Actor } from "./Actor";
import { Site } from "../World/Site";
import { EngineWrapper } from "../Engine/Engine";
import { MixinNames } from "../Mixins/MixinNames";

export class NPC extends Actor {
    constructor(properties: EntityProperties, site: Site) {
        super(properties, site);
        EngineWrapper.scheduler.add(this, true);
    }
    
    act() {
        this.MixinProps(MixinNames.ai).act();
    }
}