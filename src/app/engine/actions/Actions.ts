import { Entity } from "./../Entity";

export abstract class Action {
    name: string;
    [property: string]: {};

    constructor(properties: ActionProperties) {
        this.name = properties.name;
    }

    abstract init(): Action;
}

export interface ActionProperties {
    name: string;
    receiver?: Entity;
    sender?: Entity;
    location?: {x: number, y: number};
}