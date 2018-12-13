export interface Stats {
    constitution?: number; 
    hp?: number;
    max_hp?: number;
    strength?: number;
    exp?: number;
    nextlvl_exp?: number;
    lvl?: number;
    defense?: number;
    agility?: number;
    speed?: number;
    stealth?: number;
    intelligence?: number;
    mana?: number;
    max_mana?: number;
    [stat_name: string]: Stats[keyof Stats];
}