import { DisplayManager } from './engine/DisplayManager';
import { Site } from './engine/Site'

let display_manager = new DisplayManager()
let screen = document.getElementById("app") || undefined; // Otherwise it would be null, which doesn't work with <target?>
let testSite = new Site({width: 64, height:30, smoothness: 2});
let main_disp_id = display_manager.add({ width: 64, height: 30, site: testSite, forceSquareRatio: true, fontSize: 24, target: screen, type: 'PlayScreen'});
display_manager.bindEventToScreen("keydown")
display_manager.render();