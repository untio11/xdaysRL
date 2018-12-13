import { Engine, Scheduler } from "rot-js";

let scheduler = new Scheduler.Speed();
let engine = new Engine(scheduler);

export var EngineWrapper: {scheduler: Scheduler, engine: Engine, should_unlock: boolean, end: () => void} = {
    "engine": engine,
    "scheduler": scheduler,
    "should_unlock": false,
    "end": function() {
        this.scheduler.clear();
        this.engine.lock();
    }
};