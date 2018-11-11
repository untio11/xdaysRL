import { Moveable } from './Moveable';
export { Moveable };

export function applyMixins(derived: any, bases: any[]) {
    bases.forEach(base => {
        Object.getOwnPropertyNames(base.prototype).forEach(name => {
            if (name != 'name') derived.prototype[name] = base.prototype[name];
        })
    });
}