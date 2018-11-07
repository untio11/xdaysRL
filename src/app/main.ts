import { DisplayManager } from './engine/DisplayManager';
import { Site } from './engine/Site'

let display_manager = new DisplayManager()
let screen = document.getElementById("app");
let main_disp_id = display_manager.add(screen, {width:100,  height:100});
let testSite = new Site({width: 100, height:100, smoothness: 3});
display_manager.render(testSite);