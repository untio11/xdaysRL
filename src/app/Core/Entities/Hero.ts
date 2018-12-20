import { EntityProperties } from "./Entity";
import { Actor } from "./Actor";
import { Site } from "../World/Site";
import { EngineWrapper } from "../Engine/Engine";
import { Item } from "../Items/Item";
import { Potion } from "../Items/Potion";

/**
 * Class defining the player character. It's a subclass of entity.
 */
export class Hero extends Actor {
    private inventory: Item[];
    private wielding?: Item;
    private current_item: number;

    constructor(properties: EntityProperties, site: Site) {
        super(properties, site);
        EngineWrapper.scheduler.add(this, true);
        this.inventory = [];
        this.current_item = 0;
        for (let i = 0; i < 5; i++) {
            this.inventory.push(new Potion({name: "Generic Potion " + (i + 1), damage: Math.floor((Math.random() * 7) + 1), throwable: true}));
        }
    }

    act() {
        EngineWrapper.engine.lock();
        EngineWrapper.should_unlock = false;
    }

    getInventory() {
        return this.inventory;
    }

    getThrowables() {
        return this.getInventory().filter((item) => (item.throwable));
    }

    getWielding() {
        return this.wielding;
    }

    switchWielding(new_wielding: Item) {
        this.wielding = new_wielding;
    }

    nextItem() {
        return this.inventory[++this.current_item];
    }

    previousItem() {
        return this.inventory[--this.current_item];
    }
}