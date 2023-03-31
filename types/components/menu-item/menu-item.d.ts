import '../icon/icon';
import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Menu items provide options for the user to pick from in a menu.
 * @documentation https://shoelace.style/components/menu-item
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 *
 * @slot - The menu item's label.
 * @slot prefix - Used to prepend an icon or similar element to the menu item.
 * @slot suffix - Used to append an icon or similar element to the menu item.
 *
 * @csspart base - The component's base wrapper.
 * @csspart checked-icon - The checked icon, which is only visible when the menu item is checked.
 * @csspart prefix - The prefix container.
 * @csspart label - The menu item label.
 * @csspart suffix - The suffix container.
 */
export default class SlMenuItem extends ShoelaceElement {
    static styles: CSSResultGroup;
    private cachedTextLabel;
    defaultSlot: HTMLSlotElement;
    menuItem: HTMLElement;
    /** The type of menu item to render. To use `checked`, this value must be set to `checkbox`. */
    type: 'normal' | 'checkbox';
    /** Draws the item in a checked state. */
    checked: boolean;
    /** A unique value to store in the menu item. This can be used as a way to identify menu items when selected. */
    value: string;
    /** Draws the menu item in a disabled state, preventing selection. */
    disabled: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleDefaultSlotChange;
    private handleHostClick;
    handleCheckedChange(): void;
    handleDisabledChange(): void;
    handleTypeChange(): void;
    /** Returns a text label based on the contents of the menu item's default slot. */
    getTextLabel(): string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-menu-item': SlMenuItem;
    }
}
