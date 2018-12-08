export interface Stats {    
    hp?: number;
    max_hp?: number;
    attack?: number;
    exp?: number;
    next_lvl_exp?: number;
    lvl?: number;
    defence?: number;
    speed?: number;
    mana?: number;
    max_mana?: number;
    [stat_name: string]: Stats[keyof Stats];
}