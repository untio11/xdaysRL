export interface DerivedStats {
    hp?: number;
    max_hp?: number;
    exp?: number;
    nextlvl_exp?: number;
    lvl?: number;
    defense?: number;
    speed?: number;
    stealth?: number;
    mana?: number;
    max_mana?: number;
    [stat_name: string]: DerivedStats[keyof DerivedStats];
}

export interface BaseStats {
    constitution: number;
    strength: number;
    agility: number;
    intelligence: number;
    perception: number;
    [stat_name: string]: BaseStats[keyof BaseStats];
}