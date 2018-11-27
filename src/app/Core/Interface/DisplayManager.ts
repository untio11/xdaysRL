import { Screen } from './Screen';
import { remove } from "lodash";
import { Hero } from "../Entities/Hero";

/**
 * A manager for handiling Screens. It should keep track of multiple screens and binding of sites and event listeners goes through this class.
 */
class DisplayManager {
    screens: Screen[];
    bound_screens: [number, number][];
    ports: HTMLElement[];
    
    constructor() {
        this.screens = [];
        this.ports = [];
        this.bound_screens = [];
    }

    /**
     * Add a screen to the displaymanager.
     * @param screen Screen to be added to the displaymanager
     */
    addScreen(screen: Screen){
        if (!this.containsScreen(screen, this.screens)) {
            return this.screens.push(screen) - 1;
        } return -1;
    }

    /**
     * Add a port to the ports of the displaymanager.
     * @param port The HTMLElent where the screen should be displayed in
     */
    addPort(port: HTMLElement) {
        if (!(port.id == "" && this.containsPort(port))) {
            return this.ports.push(port) - 1;
        } return -1;
    }

    bindEventToScreen(event: string, screen_index: number) {
        let screen = this.getScreen(screen_index);
        if (screen != undefined) screen.bindEvent(event);
    }

    /**
     * Linearly search if this port is already present in the displaymanager
     * @param target_port port to be checked for
     */
    private containsPort(target_port: HTMLElement) {
        for (const port of this.ports) {
            if (port.id == target_port.id) return true;
        } return false;
    }

    /**
     * Linearly search if this screen is already in the displaymanager
     * @param target_screen screen to be checked for
     */
    private containsScreen(target_screen: Screen, target_array: Screen[]): boolean {
        for (const screen of target_array) {
            if (target_screen.id == screen.id) return true;
        } return false;
    }

    private getIndexInArray(id: number | string, target_array: Screen[] | HTMLElement[]) {
        for (let i = 0; i < target_array.length; i++) {
            if (id == target_array[i].id) return i;
        } return -1;
    }

    bind(screen_index: number, port_index: number) {
        let screen = this.getScreen(screen_index);
        let port = this.getPort(port_index);

        if (screen != undefined && port != undefined) {
            this.bound_screens.push([screen_index, port_index]);
            screen.bindPort(port);
        }
    }

    getScreen(screen_index: number) {
        return this.screens[screen_index] || undefined;
    }

    private getPort(port_index: number) {
        return this.ports[port_index] || undefined;
    }

    unbind(screen_index: number, port_index: number) {
        let candidate_screen = this.getScreen(screen_index);
        let candidate_port = this.getPort(port_index);
        if (!(candidate_port == null || candidate_screen == null)) {
            let bound = this.getBound(candidate_port);
            if (bound == null) return;
            remove(this.bound_screens, (candidate_bounds) => (
                bound == candidate_bounds
            ));
        }
    }

    /**
     * Check if a screen is bound to some port.
     * @param target screen or HTMLElement to be chcked for activity
     */
    private isActive(target: Screen | HTMLElement): boolean {
        for (const pair of this.bound_screens) {
            if (target.id === this.screens[pair[0]].id ||
                target.id === this.ports[pair[1]].id) return true;
        } return false;
    }

    /**
     * Get the other end of the binding.
     * @param target The screen or HTMLElement you want the other end of.
     * @returns The HTML element this screen is bound to if it is bound, null otherwise.
     */
    getBoundElement(target: Screen | HTMLElement) {
        if (this.isActive(target)) {
            let bound = this.getBound(target);
            if (bound == null) {
                return null;
            } else if (target instanceof Screen) {
                return this.screens[bound[0]];
            } else if (target instanceof HTMLElement) {
                return this.ports[bound[1]];
            }
        } return null;
    }

    private getBound(target: Screen | HTMLElement) {
        if (this.isActive(target)) {
            let candidate_index = this.getIndexInArray(target.id, this.screens);
            let index = candidate_index == -1 ? this.getIndexInArray(target.id, this.ports) : candidate_index;
            if (index == -1) return null;

            for (let pair of this.bound_screens) {
                if (index == pair[0]) return pair;
                else if (index == pair[1]) return pair;
            }
        } return null;
    }

    /**
     * Render all active screens.
     */
    render() {
        for (const pairs of this.bound_screens) {
            this.screens[pairs[0]].refresh();
        }
    }
}

export var displayManager: DisplayManager = new DisplayManager();