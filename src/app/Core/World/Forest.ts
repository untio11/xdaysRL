import { Site, Map, Tile, SiteProperties } from "./Site";
import { poissonDiscSampler } from "../../util/poisson-disc-sampler";
import { treeTemplate, grassTemplate } from "../Graphical/tileTemplates";

export interface ForestProperties extends SiteProperties {
    age: number;
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
                    let { x, y } = this.convertPoint(sampler2());

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
        if (!sample) return { x: -1, y: -1 }; // Will count as invalid
        return { x: Math.floor(sample[0]), y: Math.floor(sample[1]) };
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