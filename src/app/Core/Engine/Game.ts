import { EngineWrapper } from "./Engine";
import { Entity } from "../Entities/Entity"
import { Hero } from "../Entities/Hero"
import { HeroTemplate } from "../Entities/entityTemplates"
import { displayManager } from "../Interface/DisplayManager"
import { PlayScreen } from "../Interface/PlayScreen";
import { Forest } from "../World/Forest";

class Game {
    constructor() {
        // The second part of the <or> should never be called in theory.
        let port = document.getElementById("app") || document.body.appendChild(new HTMLElement());
        let screenSettings = { 
            width: 72,
            height: 32,
            forceSquareRatio: true, 
            fontSize: 24,
            type: 'PlayScreen'
        };
        
        port.setAttribute("style", 
            "width:" + (screenSettings.width * screenSettings.fontSize).toString() + "px; " + 
            "height:" + (screenSettings.height * screenSettings.fontSize).toString() + "px; "
        );

        const main_playscreen = displayManager.addScreen(new PlayScreen(screenSettings));
        const main_port = displayManager.addPort(port);
        displayManager.bind(main_playscreen, main_port);
        displayManager.bindEventToScreen("keydown", main_playscreen);
        displayManager.setSite(main_playscreen, new Forest({width: 100, height: 100, age: 4}));
        let hero = displayManager.spawnPlayer(main_playscreen);
    }

    start() {
        displayManager.render();
        EngineWrapper.engine.start();
    }
}

export var game = new Game();