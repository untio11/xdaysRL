import { Moveable } from "./Moveable";
import { Damagable } from "./Damagable";

import { MixinContainer } from "./Mixins";

/**
 * Contains a list of all the mixins for easy referencing.
 */
let mixins = {
    "moveable": Moveable,
    "damagable": Damagable
};

export const Mixins = new MixinContainer(mixins);
