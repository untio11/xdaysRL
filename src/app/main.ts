import { DisplayManager } from './engine/DisplayManager';
import { Forest } from './engine/Site'
import { Scheduler } from "rot-js";

export var scheduler = new Scheduler.Speed();

let display_manager = new DisplayManager()
let screen = document.getElementById("app"); // Otherwise it would be null, which doesn't work with <target?>
let testSite = new Forest({width: 100, height:100, age: 4});
let screenSettings = { width: 72, height: 32, site: testSite, forceSquareRatio: true, fontSize: 24, target: screen, type: 'PlayScreen' };
if (screenSettings.target) {
    
    screenSettings.target.setAttribute("style", 
        "width:" + (screenSettings.width * screenSettings.fontSize).toString() + "px; " + 
        "height:" + (screenSettings.height * screenSettings.fontSize).toString() + "px; "
    );
}
let main_disp = display_manager.add(screenSettings);
display_manager.bindEventToScreen("keydown")
display_manager.render();
