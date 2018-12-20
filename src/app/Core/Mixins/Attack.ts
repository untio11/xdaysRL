import { Mixin } from "./Mixin";
import { Entity } from "../Entities/Entity";
import { Vision } from "./Vision";
import { ID as DamagableName} from "./Damagable";
import { DerivedStats } from "./Stats";
import { ID as LevelableName } from "./Levelable";
import { Potion } from "../Items/Potion";

export const ID: string = 'Attack';

export class Attack implements Mixin {
    readonly id = ID;
    owner: Entity
    /** Range of this attack */
    private range: number;
    /** The amount of damage this attack does */
    private damage: number;
    /** List of potential targets. */
    private targets: Entity[];
    private current_target: number;

    constructor(owner: Entity, properties?: {range?: number, damage?: number}) {
        properties = properties || {};
        this.owner = owner;
        this.range = properties.range || 1;
        this.damage = Math.max((properties.damage || 1) + owner.getAbilityMod().strength, 1);
        this.targets = [];
        this.current_target = 0;
    }

    getStats(): DerivedStats {
        return {
            attack: this.damage,
        };
    }

    attack(target: Entity, weapon?: Potion) {
        const damagable = target.MixinProps(DamagableName);
        const damage = (weapon != undefined) ? weapon.getDamage() : this.damage;
        damagable.decrementHp(damage);
        this.untarget();
        if (damagable.getHp() == 0) {
            this.owner.MixinProps(LevelableName).getExp(damagable.giveExp());
        }
    }

    /** Update the target list by checking what entities are in range. */
    updateTargetList(weapon?: Potion) {
        this.targets = [];
        const range_computation = new Vision(this.owner, { vision_radius: weapon != undefined ? 10 + this.owner.getAbilityMod().strength : this.range });
        const in_range = range_computation.getVisibileArea();
        // Only select things that can be damaged and don't target yourself.
        const possible_targets = this.owner.getPos().site.getEntities(in_range);
        for (const id of Object.keys(possible_targets)) {
            if (!possible_targets[id].hasMixin(DamagableName) || id == this.owner.id.toString()) {
                delete possible_targets[id];
            } else {
                this.targets.push(possible_targets[id]);
            }
        }
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
        this.untarget()
        this.current_target = (this.current_target + 1 > this.targets.length - 1) ? 0 : this.current_target + 1;
        this.target();
        return this.getCurrentTarget();
    }

    previousTarget() {
        this.untarget();
        this.current_target = (this.current_target - 1 <= -1) ? this.targets.length - 1 : this.current_target - 1;
        this.target();
        return this.getCurrentTarget();
    }
}