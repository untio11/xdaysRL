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
        const ability_score = this.player.getAbilityScore();
        const ability_mod = this.player.getAbilityMod();

        let counter = 1; // Will keep track of what row to render the text on.
        this.write(`${this.player.name}: ${stats.lvl} (${this.gauge(stats.exp, stats.nextlvl_exp)})`, counter++);
        this.write("Health: " + this.gauge(stats.hp, stats.max_hp), counter++);
        this.write("Mana: " + this.gauge(stats.mana, stats.max_mana), counter++);
        counter++; // Newline :P
        this.write("Str: " + this.clean(ability_score.strength) + ` (${ability_mod.strength})`, counter++);
        this.write("Con: " + this.clean(ability_score.constitution) + ` (${ability_mod.constitution})`, counter++);
        this.write("Agi: " + this.clean(ability_score.agility) + ` (${ability_mod.agility})`, counter++);
        this.write("Int: " + this.clean(ability_score.intelligence) + ` (${ability_mod.intelligence})`, counter++);
        this.write("Per: " + this.clean(ability_score.perception) + ` (${ability_mod.perception})`, counter++);
        counter++;
        const wielding = this.player.getWielding();
        this.write(`Wielding: ${this.clean(wielding == undefined ? "None" : wielding.toString())}`, counter++);
    }

    private write(data: string, row: number) {
        const upper = this.dimensions.width - this.margin_right;
        this.display.drawText(this.margin_left, row, data, upper);
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