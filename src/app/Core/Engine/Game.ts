import { EngineWrapper } from "./Engine";
import { Entity } from "../Entities/Entity"
import { Hero } from "../Entities/Hero"
import { HeroTemplate } from "../Entities/entityTemplates"
import { displayManager } from "../Interface/DisplayManager"
import { PlayScreen } from "../Interface/Screen";
import { Forest } from "../World/Site";
import { Engine, Scheduler } from "rot-js";

class Game {
    scheduler: Scheduler;
    engine: Engine;
    entities: Entity[];
    player: Hero;
    port: HTMLElement;
    i: [string, number];

    constructor() {
        this.engine = EngineWrapper.engine;
        this.scheduler = EngineWrapper.scheduler;
        this.entities = [];
        
        // The second part of the <or> should never be called in theory.
        this.port = document.getElementById("app") || document.body.appendChild(new HTMLElement());
        let screenSettings = { 
            width: 72,
            height: 32,
            forceSquareRatio: true, 
            fontSize: 24,
            target: this.port, 
            type: 'PlayScreen'
        };
        
        
        this.port.setAttribute("style", 
            "width:" + (screenSettings.width * screenSettings.fontSize).toString() + "px; " + 
            "height:" + (screenSettings.height * screenSettings.fontSize).toString() + "px; "
        );

        this.i = displayManager.add(new PlayScreen(screenSettings));
        displayManager.bindEventToScreen("keydown", this.i)
        this.player = new Hero(HeroTemplate, displayManager.getCurrentSite());
        let screen = displayManager.getCurrentScreen(PlayScreen.type) as PlayScreen;
        if (screen) screen.spawnPlayer(this.player);
    }

    start() {
        this.scheduler.add(this.player, true);
        displayManager.render(this.i);
        this.engine.start();
    }
}

export var game = new Game();