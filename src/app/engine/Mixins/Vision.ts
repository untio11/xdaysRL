import { Mixin } from "./Mixins";
import { Entity } from "../Entities/Entity";
import { FOV } from "rot-js";
import { Site, position } from "../Site";
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
    
    constructor(owner: Entity, properties?: {vision_radius?: number}) {
        properties = properties || {};

        this.owner = owner;
        this.vision_radius = properties.vision_radius || 10;
        this.x_ray = false;
        this.fov = new FOV.PreciseShadowcasting(this.lightPasses);
    }

    lightPasses(x: number, y: number): boolean {
        let tile = this.owner.getPos().site.getTile({x, y});
        return tile.light_passes || this.x_ray;
    }

    getVisibileArea(): Tile[][] {
        let visible_area = new Array<Tile[]>(this.vision_radius);
        let position = this.owner.getPos();
        this.fov.compute(position.x, position.y, this.vision_radius, function(x: number, y: number, r: number, visibility: number) {
            visible_area[x][y] = position.site.getTile(position).light_passes ? position.site.getTile(position) : Tile.nullTile;
        });
        
        return visible_area;
    }
}