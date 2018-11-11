import { DisplayManager } from './engine/DisplayManager';
import { Site } from './engine/Site'

let display_manager = new DisplayManager()
let screen = document.getElementById("app");
let testSite = new Site({width: 100, height:100, smoothness: 3});
let main_disp_id = display_manager.add(screen, {width:64,  height:30, site:testSite, forceSquareRatio: true, fontSize: 24});
display_manager.bindEventToScreen("keydown")
display_manager.render();