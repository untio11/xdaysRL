import { Site, position } from '../Site';

export class Moveable {
    name: string = 'Movable';
    position: position = { x: 0, y: 0 };

    tryMove(move: {dx: number, dy: number}, site: Site): boolean {
        let target_pos = this.newPos(move.dx, move.dy);
        let target_tile = site.getTile(target_pos);
        if (target_tile.walkable) {
            this.position = target_pos;
            return true;
        }

        return false;
    }

    newPos(dx: number, dy: number): position {
        return {
            x: this.position.x + dx,
            y: this.position.y + dy
        }
    }
}