import { Map } from 'rot-js';
import { range } from "lodash";
import { Tile } from "./Tile";
import { Entity } from "../Entities/Entity";
import { poissonDiscSampler } from "../../util/poisson-disc-sampler";
import { grassTemplate, treeTemplate } from "../Graphical/tileTemplates";

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
            new Array(this.height).map(() => (new Tile()))
        ));
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
}

export class Forest extends Site {
    map: Map.Cellular;

    constructor(properties: ForestProperties) {
        super(properties);

        this.map = new Map.Cellular(properties.width, properties.height, { born: [3], topology: 8, survive: [0, 1, 2, 3, 4, 5, 6, 7, 8] });

        let sampler = poissonDiscSampler(this.width - 1, this.height - 1, properties.age + 7);
        let sampler2 = poissonDiscSampler(this.width - 1, this.height - 1, 5);

        for (let i = 0; i <= properties.age; i++) {
            for (let j = 0; j < ((i * i) + (5 * (i))); j++) { // let j = 0; j < (i + 1) * <DENSITY>; j++
                let { x, y } = this.convertPoint(sampler()); 

                if (this.isValidPoint(x, y)) {
                    this.drawSapling(x, y);
                } else {
                    continue;
                }
            }

            if (i == properties.age) {
                for (let k = 0; k < properties.height * properties.height; k++) {
                    let {x, y} = this.convertPoint(sampler2()); 

                    if (this.isValidPoint(x, y)) {
                        this.map.set(x, y, 1);
                    } else {
                        continue;
                    }
                }

                this.map.create((x: number, y: number, wall: number) => (
                    this.map_data[x][y] = (wall ? new Tile(treeTemplate) : new Tile(grassTemplate))
                ));
            } else {
                this.map.create();
            }
        }
    }

    private isValidPoint(x: number, y: number) {
        return (x < this.width - 1 && x > 0 && y < this.height - 1 && y > 0);
    }

    private convertPoint(sample: [number, number] | undefined) {
        if (!sample) return {x: -1, y: -1}; // Will count as invalid
        return {x: Math.floor(sample[0]), y: Math.floor(sample[1])};
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

export interface SiteProperties {
    width: number;
    height: number;
}

export interface ForestProperties extends SiteProperties {
    age: number;
}
