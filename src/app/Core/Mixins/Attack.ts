import { Mixin } from "./Mixin";
import { Entity } from "../Entities/Entity";
import { Vision } from "./Vision";
import { ID as DamagableName} from "./Damagable";

export const ID: string = 'Attack';

export class Attack implements Mixin {
    readonly id = ID;
    owner: Entity
    /** Range of this attack */
    private range: number;
    /** The amount of damage this attack does */
    private damage: number;
    /** Use the vision mixin to compute what targets are in range. */
    private range_computation: Vision;
    /** List of potential targets. */
    private targets: Entity[];
    private current_target: number;

    constructor(owner: Entity, properties?: {range?: number, damage?: number}) {
        properties = properties || {};
        this.owner = owner;
        this.range = properties.range || 1;
        this.damage = properties.damage || 5;
        this.range_computation = new Vision(owner, {vision_radius: this.range});
        this.targets = [];
        this.current_target = 0;
    }

    attack(target: Entity) {
        let damagable = target.MixinProps(DamagableName);
        damagable.decrementHp(this.damage);
        this.untarget();
    }

    /** Update the target list by checking what entities are in range. */
    updateTargetList() {
        const in_range = this.range_computation.getVisibileArea();
        // Only select things that can be damaged and don't target yourself.
        const possible_targets = this.owner.getPos().site.getEntities(in_range).filter((e) => (e.hasMixin(DamagableName) && e.id != this.owner.id));
        this.targets = possible_targets;
    }

    target() {
        let target = this.getCurrentTarget();
        if (target != undefined) target.MixinProps(DamagableName).setTargeted(true);
    }

    untarget() {
        let target = this.getCurrentTarget();
        if (target != undefined) target.MixinProps(DamagableName).setTargeted(false);
    }

    getTargets() {
        return this.targets;
    }

    getCurrentTarget() {
        return this.targets[this.current_target];
    }

    nextTarget() {
        this.getCurrentTarget().MixinProps(DamagableName).setTargeted(false);
        this.current_target = (this.current_target + 1 > this.targets.length - 1) ? 0 : this.current_target + 1;
        this.target();
        return this.getCurrentTarget();
    }

    previousTarget() {
        this.getCurrentTarget().MixinProps(DamagableName).setTargeted(false);
        this.current_target = (this.current_target - 1 <= -1) ? this.targets.length - 1 : this.current_target - 1;
        this.target();
        return this.getCurrentTarget();
    }
}