import { EngineWrapper } from "./Engine";
import { displayManager } from "../Interface/DisplayManager"
import { PlayScreen } from "../Interface/PlayScreen";
import { MenuScreen } from "../Interface/MenuScreen";
import { Forest } from "../World/Forest";

class Game {
    constructor() {
        // The second part of the <or> should never be called in theory.
        let play_port = document.getElementById("playscreen") || document.body.appendChild(new HTMLElement());
        let playscreen_settings = {
            width: 56,
            height: 32,
            forceSquareRatio: true,
            fontSize: 24,
            type: 'PlayScreen'
        };

        play_port.setAttribute("style",
            "width:" + (playscreen_settings.width * playscreen_settings.fontSize).toString() + "px; " +
            "height:" + (playscreen_settings.height * playscreen_settings.fontSize).toString() + "px; "
        );

        let menu_port = document.getElementById("menuscreen") || document.body.appendChild(new HTMLElement());
        let menuscreen_settings = {
            width: 32,
            height: 32,
            forceSquareRatio: false,
            fontSize: 24,
            type: 'MenuScreen'
        };

        menu_port.setAttribute("style",
            "width:" + (menuscreen_settings.width * 0.584 * menuscreen_settings.fontSize).toString() + "px; " +
            "height:" + (menuscreen_settings.height * menuscreen_settings.fontSize).toString() + "px; "
        );

        const play_screen_index = displayManager.addScreen(new PlayScreen(playscreen_settings));
        const play_port_index = displayManager.addPort(play_port);
        displayManager.bind(play_screen_index, play_port_index);
        displayManager.setSite(play_screen_index, new Forest({width: 100, height: 100, age: 4}));
        displayManager.bindEventToScreen("keydown", play_screen_index);
        let hero = displayManager.spawnPlayer(play_screen_index);
        
        const menu_screen_index = displayManager.addScreen(new MenuScreen(menuscreen_settings))
        const menu_port_index = displayManager.addPort(menu_port);
        displayManager.bind(menu_screen_index, menu_port_index);
        if (hero != undefined) displayManager.bindPlayer(hero, menu_screen_index);

    }

    start() {
        displayManager.render();
        EngineWrapper.engine.start();
    }
}

export var game = new Game();