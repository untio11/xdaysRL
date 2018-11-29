import { Map } from 'rot-js';
import { range } from "lodash";
import { Tile } from "./Tile";
import { Entity } from "../Entities/Entity";

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
    protected entities: Entity[];
    readonly height: number;
    readonly width: number;

    /**
     * Initialize the map according to some parameters.
     * @param properties Simple object to determine the height, width and smootheness of the map.
     */
    constructor(properties: SiteProperties) {
        this.width = properties.width;
        this.height = properties.height;
        this.entities = [];

        // Initialize to epmty 2D-array
        this.map_data = range(this.width).map(() => (
            new Array(this.height).map((i) => (new Tile()))
        ));
    }

    /** @returns An array of tiles. */
    getData() {
        return this.map_data;
    }

    getEntities () {
        return this.entities;
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

    explore(coordinates: Array<[number, number]>) {
        for (const point of coordinates) {
            this.setExploredTile({x: point[0], y: point[1]});
        }
    }

    setExploredTile(pos: position | {x: number, y: number}) {
        let {x, y} = pos;
        // Maybe check if it's actually a tile of the map.p
        this.getTile({x, y}).explored = true;
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

    spawn(entity: Entity) {
        entity.setPos(this.getRandomFloorPosition());
        this.entities.push(entity);
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