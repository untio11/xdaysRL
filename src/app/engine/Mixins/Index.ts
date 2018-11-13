import { MixinContainer } from "./Mixins";
import { Moveable } from "./Moveable";
import { Damagable } from "./Damagable";

/**
 * Contains a list of all the mixins for easy referencing.
 */
export const Mixins = new MixinContainer({
    "Moveable": Moveable,
    "Damagable": Damagable
});