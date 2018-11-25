import { Scheduler, Engine } from "rot-js";
import { Entity } from "../Entities/Entity"
import { Hero } from "../Entities/Hero"
import { HeroTemplate } from "../Entities/entityTemplates"
import { DisplayManager } from "../Interface/DisplayManager"
import { PlayScreen } from "../Interface/Screen";
import { Forest } from "../World/Site";

class Game {
    sheduler: Scheduler;
    engine: Engine;
    entities: Entity[];
    player: Hero;
    displayManager: DisplayManager;

    constructor() {
        this.sheduler = new Scheduler.Speed();
        this.engine = new Engine(this.sheduler);
        this.entities = [];
        
        const port = document.getElementById("app");
        let screenSettings = { 
            width: 72,
            height: 32,
            site: new Forest({width: 100, height:100, age: 4}),
            forceSquareRatio: true, 
            fontSize: 24,
            target: port, 
            type: 'PlayScreen'
        };
        
        if (screenSettings.target) {
            screenSettings.target.setAttribute("style", 
            "width:" + (screenSettings.width * screenSettings.fontSize).toString() + "px; " + 
            "height:" + (screenSettings.height * screenSettings.fontSize).toString() + "px; "
            );
        };

        this.displayManager = new DisplayManager(new PlayScreen(screenSettings));

        this.displayManager.bindEventToScreen("keydown")
        this.player = new Hero(HeroTemplate, this.displayManager.getCurrentSite());
    }

    start() {
        this.displayManager.render();
    }
}

export var game = new Game();