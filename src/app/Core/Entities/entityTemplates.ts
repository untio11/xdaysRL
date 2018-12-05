import { EntityProperties } from "./Entity";
import { MixinNames } from "../Mixins/MixinNames";

export const HeroTemplate: EntityProperties = {
    char: '@',
    mixins: [MixinNames.moveable, MixinNames.damagable, MixinNames.vision, MixinNames.attack],
    mixin_options: {
        [MixinNames.moveable]: {speed: 30},
        [MixinNames.damagable]: {starting_hp: 69},
        [MixinNames.vision]: {vision_radius: 13},
        [MixinNames.attack]: {range: 10}
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