import { Moveable, ID as MoveableName } from "./Moveable";
import { Damagable, ID as DamagableName } from "./Damagable";


/**
 * Contains a list of all the mixins for easy referencing.
 */
let Mixins: {[name: string]: any} = {};

Mixins[MoveableName] = Moveable;
Mixins[DamagableName] = Damagable;

export { Mixins };