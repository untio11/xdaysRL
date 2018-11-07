import { DisplayManager } from './engine/DisplayManager';
import { Site } from './engine/Site'

let display_manager = new DisplayManager()
let screen = document.getElementById("app");
let main_disp_id = display_manager.add(screen, {width:80,  height:20});
let testSite = new Site({width: 10, height:10});
display_manager.render(testSite);