import { Screen, ScreenOptions } from "./Screen";
import { Hero } from "../Entities/Hero";

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
        const upper = this.dimensions.width - this.margin_right;
        this.display.drawText(this.margin_left, 1, this.player.name, upper)
        this.display.drawText(this.margin_left, 2, this.player.MixinProps("Damagable").getHp().toString() + '/' + this.player.MixinProps("Damagable").getMaxHp().toString(), upper);
    }

    bindPlayer(player: Hero) {
        this.player = player;
    }
}