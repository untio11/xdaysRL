import { EntityProperties } from "./Entity";
import { MixinNames } from "../Mixins/MixinNames";
import { colors } from "../Graphical/colors";

export const HeroTemplate: EntityProperties = {
    char: '@',
    mixins: [MixinNames.moveable, MixinNames.damagable],
    mixin_options: {
        [MixinNames.moveable]: {speed: 34},
        [MixinNames.damagable]: {starting_hp: 69}
    },
    fg: [255, 255, 255],
    name: 'Player'
}