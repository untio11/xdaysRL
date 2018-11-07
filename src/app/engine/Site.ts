import { Map } from 'rot-js';
import { range } from "lodash";

export class Site {
    public map: Map;
    public map_data: number[][];
    public height: number;
    public width: number;

    constructor(options: {width: number, height: number}) {
        this.width = options.width | 7;
        this.height = options.height | 7;

        this.map = new Map.Arena(this.width, this.height);
        this.map_data = range(this.width).map(() => (
            new Array(this.height)
        ));

        this.map.create((x, y, wall) => (
            this.map_data[x][y] = wall
        ));
    }

    getData() {
        return this.map_data;
    }

    getDimensions() {
        return {width: this.width, height: this.height};
    }
}