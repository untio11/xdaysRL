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

        this.map = new Map.Cellular(this.width, this.height);
        this.map.randomize(0.5);
        this.map_data = range(this.width).map(() => (
            new Array(this.height).map(() => Tile.nullTile)
        ));

        for (let i = 0; i < options.smoothness; i++) {
            this.map.create();
        }
        
        this.map.create((x: number, y: number, wall: number) => (
                this.map_data[x][y] = wall ? Tile.wallTile : Tile.floorTile
        ));
    }

    getData() {
        return this.map_data;
    }

    getTile(x: number, y: number) {
        if (0 <= x && x < this.width && 0 <= y && y < this.height) {
            return this.map_data[x][y];
        } else {
            return Tile.nullTile;
        }
    }

    getDimensions() {
        return {width: this.width, height: this.height};
    }
}