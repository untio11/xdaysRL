import { DisplayManager } from './engine/DisplayManager';
import { Site } from './engine/Site'
import { Scheduler } from "rot-js";

export var scheduler = new Scheduler.Speed();

async function mainLoop() {
    while (true) {
        let actor = scheduler.next();
        if (!actor) break;
        await actor.act();
    }
}

let display_manager = new DisplayManager()
let screen = document.getElementById("app"); // Otherwise it would be null, which doesn't work with <target?>
let testSite = new Site({width: 64, height:30, smoothness: 2});
let main_disp = display_manager.add({ width: 64, height: 30, site: testSite, forceSquareRatio: true, fontSize: 24, target: screen, type: 'PlayScreen'});
display_manager.bindEventToScreen("keydown")
display_manager.render();


mainLoop();