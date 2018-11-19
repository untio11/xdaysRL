import { EntityProperties } from "./../Entity";
import { colors } from "./colors";

export const HeroTemplate: EntityProperties = {
    char: '@',
    mixins: ["moveable", "damagable"],
    fg: [255, 255, 255],
    name: 'Player'
}