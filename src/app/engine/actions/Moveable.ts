import { Site, position } from '../Site';

export class Moveable {
    name: string = 'Movable';
    position: position = { x: 0, y: 0 };

    tryMove(target: position, site: Site) {
        let target_tile = site.getTile(this.position);
        if (target_tile.walkable) {
            this.position = target;
            return true;
        }

        return false;
    }
}