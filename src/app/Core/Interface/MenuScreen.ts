import { Screen, ScreenOptions } from "./Screen";
import { Hero } from "../Entities/Hero";
import { PlayScreen } from "./PlayScreen";

/**
 * Class for showing the players stats.
 */
export class MenuScreen extends Screen {
    player?: Hero;
    readonly margin_left = 1;
    readonly margin_top = 1;
    readonly margin_right = 1;  

    constructor (properties: ScreenOptions) {
        super(properties);
    }

    enter() {

    }

    exit() {

    }

    render() {
        if (this.player == undefined) return;
        const stats = this.player.getStats();
        const upper = this.dimensions.width - this.margin_right;
        this.display.drawText(this.margin_left, 1, this.clean(this.player.name) + " (" + this.clean(stats.lvl) + "):" + this.gauge(stats.exp, stats.nextlvl_exp), upper)
        this.display.drawText(this.margin_left, 2, "Health: " + this.gauge(stats.hp, stats.max_hp), upper);
        this.display.drawText(this.margin_left, 3, "Mana: " + this.gauge(stats.mana, stats.max_mana), upper);

    }

    private clean(data?: number | string): string {
        if (data != undefined) {
            return data.toString();
        } else {
            return "#";
        }
    }

    private gauge(current?: number, max?: number): string {
        return this.clean(current) + "/" + this.clean(max);
    }

    bindPlayer(player: Hero) {
        this.player = player;
    }
}