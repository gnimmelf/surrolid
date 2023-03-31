import type SlIcon from '../icon/icon';
export type IconLibraryResolver = (name: string) => string;
export type IconLibraryMutator = (svg: SVGElement) => void;
export interface IconLibrary {
    name: string;
    resolver: IconLibraryResolver;
    mutator?: IconLibraryMutator;
}
/** Adds an icon to the list of watched icons. */
export declare function watchIcon(icon: SlIcon): void;
/** Removes an icon from the list of watched icons. */
export declare function unwatchIcon(icon: SlIcon): void;
/** Returns a library from the registry. */
export declare function getIconLibrary(name?: string): IconLibrary;
/** Adds an icon library to the registry, or overrides an existing one. */
export declare function registerIconLibrary(name: string, options: {
    resolver: IconLibraryResolver;
    mutator?: IconLibraryMutator;
}): void;
/** Removes an icon library from the registry. */
export declare function unregisterIconLibrary(name: string): void;
