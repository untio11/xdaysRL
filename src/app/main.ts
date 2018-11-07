import { DisplayManager } from './engine/DisplayManager';
import { Site } from './engine/Site';

let display_manager = new DisplayManager()
let screen = document.getElementById("app");
let main_disp_id = display_manager.add(screen, {width:80,  height:20});

display_manager.test(main_disp_id);