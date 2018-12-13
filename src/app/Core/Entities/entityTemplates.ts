import { EntityProperties, entityTypes } from "./Entity";
import { MixinNames } from "../Mixins/MixinNames";

export const HeroTemplate: EntityProperties = {
    char: '@',
    mixins: [
        MixinNames.moveable,
        MixinNames.damagable,
        MixinNames.vision,
        MixinNames.attack,
        MixinNames.levelable
    ],
    mixin_options: {
        [MixinNames.levelable]: {
            perception: 10,
            intelligence: 14,
            agility: 10,
            constitution: 8,
            strength: 8
        }
    },
    fg: [255, 255, 255],
    name: 'Player',
    type: entityTypes.Player
}

export const DangerNoodle: EntityProperties = { // DangerNoodle is vv slow
    char: '~',
    fg: [36, 180, 177],
    name: 'Dangernoodle',
    mixins: [
        MixinNames.moveable,
        MixinNames.damagable,
        MixinNames.vision,
        MixinNames.ai
    ],
    mixin_options: {
        [MixinNames.moveable]: {speed: 5}
    },
    type: entityTypes.Enemy
}