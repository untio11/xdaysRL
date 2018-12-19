import { Moveable, ID as MoveableName } from "./Moveable";
import { Damagable, ID as DamagableName } from "./Damagable";
import { Vision, ID as VisionName } from "./Vision";
import { AI, ID as AIName } from "./AI";
import { Attack, ID as AttackName } from "./Attack";
import { Levelable, ID as LevelableName } from "./Levelable";
import { Caster, ID as CasterName } from "./Caster";


/**
 * Contains a list of all the mixins for easy referencing.
 */
export const Mixins: {[name: string]: any} = {
    [MoveableName]: Moveable,
    [DamagableName]: Damagable,
    [VisionName]: Vision,
    [AIName]: AI,
    [AttackName]: Attack,
    [LevelableName]: Levelable,
    [CasterName]: Caster
};