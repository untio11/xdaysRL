import { Map } from 'rot-js';
import { range } from "lodash";
import { Tile } from "./Tile";
import { HashMap } from "../../util/DiscountHashmap";
import { Entity } from "../Entities/Entity";
import { EngineWrapper } from "../Engine/Engine";

export { Map, Tile }

export interface SiteProperties {
    width: number;
    height: number;
}

/**
 * For storing a map, together with some helper functions around it.
 */
export abstract class Site {
    protected abstract map: Map;
    protected map_data: Tile[][];
    protected entities: {[id: string]: Entity};
    readonly height: number;
    readonly width: number;

    /**
     * Initialize the map according to some parameters.
     * @param properties Simple object to determine the height, width and smootheness of the map.
     */
    constructor(properties: SiteProperties) {
        this.width = properties.width;
        this.height = properties.height;
        this.entities = {};

        // Initialize to epmty 2D-array
        this.map_data = range(this.width).map(() => (
            new Array(this.height).map((i) => (new Tile()))
        ));
    }

    /** @returns An array of tiles. */
    getData() {
        return this.map_data;
    }

    getEntities(area?: HashMap) {
        if (area) {
            let result: {[id: string]: Entity} = {};
            for (const point of Object.keys(area)) {
                for (const entity of Object.keys(this.entities)) {
                    const {x, y} = this.entities[entity].getPos();
                    if (area[point].x == x && area[point].y == y) {
                        result[entity] = this.entities[entity];
                    }
                }
            }
            return result;
        } else {
            return this.entities;
        }
    }

    /** Get the tile at a given position
     * @param pos Can either be a position object or given as a simple {x, y} object.
     */
    getTile(pos: position | {x: number, y: number}) {
        let { x, y } = pos;
        if (0 <= x && x < this.width && 0 <= y && y < this.height) {
            return this.map_data[x][y];
        } else {
            return Tile.nullTile;
        }
    }

    explore(coordinates: HashMap) {
        for (const point of Object.keys(coordinates)) {
            this.setExploredTile(coordinates[point]);
        }
    }

    setExploredTile(pos: position | {x: number, y: number}) {
        // Maybe check if it's actually a tile of the map.p
        let tile = this.getTile(pos);
        if (tile != Tile.nullTile) tile.explored = true;
    }

    /** @returns A random tile containing a floor. */
    getRandomFloorPosition() {
        let pos: position = new position (
            Math.floor(Math.random() * this.width), 
            Math.floor(Math.random() * this.height),
            this
        );

        while (!this.getTile(pos).walkable) {
            pos.x = Math.floor(Math.random() * this.width);
            pos.y = Math.floor(Math.random() * this.height);
        }

        return pos;
    }

    /**
     * @returns The dimensions of this site in the form {width, height}.
     */
    getDimensions() {
        return {width: this.width, height: this.height};
    }

    spawn(entity: Entity, position?: position) {
        entity.setPos(position || this.getRandomFloorPosition());
        this.entities[entity.id] = entity;
    }

    remove(entity: Entity) {
        let dead = this.entities[entity.id];
        
        if (dead != undefined) {
            this.getTile(dead.getPos()).exit(dead);
            delete this.entities[entity.id];
            EngineWrapper.scheduler.remove(dead);
        } 
    }
}

/**
 * Represents a position with x, y as coordinates
 */
export class position {
    x: number;
    y: number;
    site: Site;

    constructor(x: number, y: number, site: Site) {
        this.x = x;
        this.y = y;
        this.site = site;
    }

    /**
     * Moves the current point according to the displacement.
     * @param dx displacement in x dir
     * @param dy displacement in y dir
     */
    add(dx: number, dy: number) {
        return new position(
            this.x + dx,
            this.y + dy,
            this.site
        );
    }
}