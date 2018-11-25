import { Mixin } from "./Mixins";
import { Entity } from "../Entities/Entity";
import { FOV } from "rot-js";
import { Tile } from "../Tile";

export const ID: string = 'Vision';

export class Vision implements Mixin {
    readonly id = ID;
    owner: Entity;
    fov: FOV;

    /** How far the entity can see. */
    vision_radius: number;
    /** Might be useful later for implementing magically augmented vision. */
    x_ray: boolean;
    /** To simply make the check if a tile let's light through */
    lightPasses: (x: number, y: number) => boolean; 
    
    constructor(owner: Entity, properties?: {vision_radius?: number}) {
        properties = properties || {};

        this.owner = owner;
        this.vision_radius = properties.vision_radius || 10;
        this.x_ray = false;
        this.lightPasses = (x: number, y: number) => (
            this.owner.getPos().site.getTile({x, y}).light_passes || this.x_ray
        );
        this.fov = new FOV.RecursiveShadowcasting(this.lightPasses);
    }


    getVisibileArea(explored: Tile[][]) {
        let position = this.owner.getPos();
        let site = position.site;
        this.fov.compute(position.x, position.y, this.vision_radius, function(x: number, y: number, r: number, visibility: number) {
            site.setExploredTile({x, y});   
        });
    }
}