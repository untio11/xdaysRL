import { EntityProperties } from "./Entity";
import { MixinNames } from "../Mixins/MixinNames";
import { colors } from "../Graphical/colors";

export const HeroTemplate: EntityProperties = {
    char: '@',
    mixins: [MixinNames.moveable, MixinNames.damagable, MixinNames.vision],
    mixin_options: {
        [MixinNames.moveable]: {speed: 34},
        [MixinNames.damagable]: {starting_hp: 69},
        [MixinNames.vision]: {vision_radius: 7}
    },
    fg: [255, 255, 255],
    name: 'Player'
}

export const DangerNoodle: EntityProperties = { // DangerNoodle is vv slow
    char: '~',
    fg: [36, 180, 177],
    name: 'Dangernoodle',
    mixins: [MixinNames.moveable, MixinNames.damagable, MixinNames.vision, MixinNames.ai],
    mixin_options: {
        [MixinNames.moveable]: {speed: 5}
    }
}