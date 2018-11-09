import { DisplayManager } from './engine/DisplayManager';
import { Site } from './engine/Site'

let display_manager = new DisplayManager()
let screen = document.getElementById("app");
let testSite = new Site({width: 100, height:100, smoothness: 3});
let main_disp_id = display_manager.add(screen, {width:80,  height:24, site:testSite});
display_manager.bindEventToScreen("keydown")
display_manager.render();