import { Entity } from "../Entities/Entity";
import { MixinNames } from "../Mixins/MixinNames";
import { EngineWrapper } from "../Engine/Engine";
import { PlayScreen } from "./PlayScreen";
import { Screen } from "./Screen";

export enum inputModes {
    OverWorld = 1,
    Targeting
}

class InputHandler {
    mode: inputModes;

    constructor() {
        this.mode = inputModes.OverWorld;
    }

    switchMode(new_mode: inputModes) {
        this.mode = new_mode;
    }

    bindEventListenerToScreen(event: string, screen: Screen) {
        let handler = this;
        window.addEventListener(event, (e) => (
            handler.processInput(event, e as KeyboardEvent, screen)
        ));
    }

    processInput(eventName: string, event: KeyboardEvent, screen: Screen) {
        if (eventName == "keydown") {
            switch (this.mode) {
            case inputModes.OverWorld:
                this.OverWorldMap(screen as PlayScreen, event.code);   
                break;
            case inputModes.Targeting:
                this.TargetingMap(screen as PlayScreen, event.code);
                break;
            default:
                break;
            }
        }

        screen.refresh();
        EngineWrapper.engine.unlock()
    }

    private OverWorldMap(screen: PlayScreen, input: string) {
        let player = screen.getPlayer();
        let focus = screen.getFocus();
        if (player == undefined || focus == undefined) return;

        switch (input) {
            case 'ArrowUp':
            case 'Numpad8':
                player.MixinProps(MixinNames.moveable).tryMove({ dx: 0, dy: -1 });
                break;
            case 'ArrowDown':
            case 'Numpad2':
                player.MixinProps(MixinNames.moveable).tryMove({ dx: 0, dy: 1 });
                break;
            case 'ArrowLeft':
            case 'Numpad4':
                player.MixinProps(MixinNames.moveable).tryMove({ dx: -1, dy: 0 });
                break;
            case 'ArrowRight':
            case 'Numpad6':
                player.MixinProps(MixinNames.moveable).tryMove({ dx: 1, dy: 0 });
                break;
            case 'Numpad7':
                player.MixinProps(MixinNames.moveable).tryMove({ dx: -1, dy: -1 });
                break;
            case 'Numpad9':
                player.MixinProps(MixinNames.moveable).tryMove({ dx: 1, dy: -1 });
                break;
            case 'Numpad1':
                player.MixinProps(MixinNames.moveable).tryMove({ dx: -1, dy: 1 });
                break;
            case 'Numpad3':
                player.MixinProps(MixinNames.moveable).tryMove({ dx: 1, dy: 1 });
                break;
            case 'KeyP':
                const pos = player.getPos();
                console.log("Hello, I am now at " + pos.x + ', ' + pos.y);
                break;
            case 'KeyX':
                player.MixinProps(MixinNames.vision).toggleXray();
                break;
            case 'KeyA':
                player.MixinProps(MixinNames.attack).target();
                break;
            default:
                break;
        }
    }

    private TargetingMap(screen: PlayScreen, input: string) {
        
    }
}

export const inputHandler = new InputHandler();