import { EntityProperties, entityTypes } from "./Entity";
import { MixinNames } from "../Mixins/MixinNames";

export const HeroTemplate: EntityProperties = {
    char: '@',
    mixins: [
        MixinNames.moveable,
        MixinNames.damagable,
        MixinNames.vision,
        MixinNames.attack,
        MixinNames.levelable,
        MixinNames.caster
    ],
    mixin_options: {},
    base_stats: {
        perception: 10,
        intelligence: 14,
        agility: 10,
        constitution: 8,
        strength: 8
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
        MixinNames.ai,
        MixinNames.levelable
    ],
    mixin_options: {},
    base_stats: {
        perception: 12,
        intelligence: 4,
        agility: 6,
        constitution: 6,
        strength: 4
    },
    type: entityTypes.Enemy
}