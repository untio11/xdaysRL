import { Map } from 'rot-js';
import { range } from "lodash";
import { Tile } from "./Tile";

export class Site {
    private map: Map.Cellular;
    private map_data: Tile[][];
    readonly height: number;
    readonly width: number;

    constructor(options: {width: number, height: number, smoothness: number}) {
        this.width = options.width | 7;
        this.height = options.height | 7;

        this.map = new Map.Cellular(this.width, this.height, {born: [3], topology:8, survive: [0, 1, 2, 3, 4, 5, 6, 7, 8]});
        
        this.map_data = range(this.width).map(() => (
            new Array(this.height).map(() => Tile.nullTile)
        ));
        
        
        for (let i = 0; i < options.smoothness; i++) {
            for (let i = 0; i < 10; i++) {
                this.drawPlus(Math.floor(Math.random() * (this.width - 2)) + 1, Math.floor(Math.random() * (this.height - 2)) + 1);
            }
            this.map.create();
        }
        for (let i = 0; i < 10; i++) {
            this.drawPlus(Math.floor(Math.random() * (this.width - 2)) + 1, Math.floor(Math.random() * (this.height - 2)) + 1);
        }
        this.map.create((x: number, y: number, wall: number) => (
                this.map_data[x][y] = wall ? Tile.wallTile : Tile.floorTile
        ));
    }

    drawPlus(x: number, y: number) {
        this.map.set(x, y, 1);
        this.map.set(x + 1, y, 1);
        this.map.set(x - 1, y, 1);
        this.map.set(x, y + 1, 1);
        this.map.set(x, y - 1, 1);
    }

    getData() {
        return this.map_data;
    }

    getTile(pos: position | {x: number, y: number}) {
        let { x, y } = pos;
        if (0 <= x && x < this.width && 0 <= y && y < this.height) {
            return this.map_data[x][y];
        } else {
            return Tile.nullTile;
        }
    }

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

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(dx: number, dy: number) {
        this.x += dx;
        this.y += dy;
        return this;
    }
}