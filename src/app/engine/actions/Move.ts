import { Action, ActionProperties } from './Actions';

export class Move extends Action {
    constructor(properties: ActionProperties) {
        super(properties);
    }

    init(): Action {
        return this;
    }
}