import { EntityProperties } from "./../Entity";
import { MixinNames } from "./../Mixins/MixinNames";
import { colors } from "./colors";

export const HeroTemplate: EntityProperties = {
    char: '@',
    mixins: [MixinNames.movable, MixinNames.damagable],
    fg: [255, 255, 255],
    name: 'Player'
}