import { Map } from 'rot-js';
import { range } from "lodash";
import { Tile } from "./Tile";
import { Entity } from "./Entity";
import { poissonDiscSampler } from "./../util/poisson-disc-sampler";

/**
 * For storing a map, together with some helper functions around it.
 */
export class Site {
    private map: Map.Cellular;
    private map_data: Tile[][];
    readonly height: number;
    readonly width: number;
    entities: Entity[];

    /**
     * 
     * @param options Simple object to determine the height, width and smootheness of the map.
     */
    constructor(options: {width: number, height: number, smoothness: number}) {
        this.width = options.width;
        this.height = options.height;
        this.entities = [];

        this.map = new Map.Cellular(this.width, this.height, {born: [3], topology:8, survive: [0, 1, 2, 3, 4, 5, 6, 7, 8]});
        
        this.map_data = range(this.width).map(() => (
            new Array(this.height).map(() => Tile.nullTile)
        ));

        
        let sampler = poissonDiscSampler(this.width - 1, this.height - 1, options.smoothness + 5);
        let sampler2 = poissonDiscSampler(this.width - 1, this.height - 1, 5);
        
        for (let i = 0; i <= options.smoothness; i++) {
            for (let j = 0; j < ((i* i) + (5 * (i))); j++) { // let j = 0; j < (i + 1) * <DENSITY>; j++
                let point = sampler();
                if (!point) continue;
                let x = Math.floor(point[0]);
                let y = Math.floor(point[1]);

                if (x < 99 && x > 0 && y < 99 && y > 0) {
                    this.drawSapling(x, y);
                }      
            
            }

            if (i == options.smoothness) {
                for (let k = 0; k < options.height * options.height; k++) {
                    let point = sampler2();
                    if (!point) continue;
                    
                    let x = Math.floor(point[0]);
                    let y = Math.floor(point[1]);   
                    if (x < 99 && x > 0 && y < 99 && y > 0) {
                        this.map.set(x, y, 1);
                    }
                }

                this.map.create((x: number, y: number, wall: number) => (
                    this.map_data[x][y] = wall ? Tile.wallTile : Tile.floorTile
                ));
            } else {
                this.map.create();
            }
        }
    }

    /**
     * Draw a '+' centered ad (x,y). Mostly for testing right now. Used as the start of a tree.
     * @param x Coordinate
     * @param y Coordinate
     */
    drawSapling(x: number, y: number) {
        this.map.set(x, y, 1);
        this.map.set(x + 1, y, 1);
        this.map.set(x - 1, y, 1);
        this.map.set(x, y + 1, 1);
        this.map.set(x, y - 1, 1);
    }

    /** @returns An array of tiles. */
    getData() {
        return this.map_data;
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

    /** @returns A random tile containing a floor. */
    getRandomFloorPosition() {
        let pos: position = new position (
            Math.floor(Math.random() * this.width), 
            Math.floor(Math.random() * this.height)
        );

        while (this.getTile(pos) != Tile.floorTile) {
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
}

/**
 * Represents a position with x, y as coordinates
 */
export class position {
    x: number;
    y: number;
    site: Site | undefined;

    constructor(x: number, y: number, site?: Site) {
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