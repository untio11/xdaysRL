import { Site, position } from '../Site';

export class Moveable {
    name: string = 'Movable';
    position: position = { x: 0, y: 0 };

    tryMove(target: position, site: Site): boolean {
        console.log("New trymove");
        let target_tile = site.getTile(target);
        if (target_tile.walkable) {
            this.position = target;
            return true;
        }

        return false;
    }
}