import '../icon/icon';
import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Radios allow the user to select a single option from a group.
 * @documentation https://shoelace.style/components/radio
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 *
 * @slot - The radio's label.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-focus - Emitted when the control gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The circular container that wraps the radio's checked state.
 * @csspart control--checked - The radio control when the radio is checked.
 * @csspart checked-icon - The checked icon, an `<sl-icon>` element.
 * @csspart label - The container that wraps the radio's label.
 */
export default class SlRadio extends ShoelaceElement {
    static styles: CSSResultGroup;
    checked: boolean;
    protected hasFocus: boolean;
    /** The radio's value. When selected, the radio group will receive this value. */
    value: string;
    /** The radio's size. */
    size: 'small' | 'medium' | 'large';
    /** Disables the radio. */
    disabled: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private addEventListeners;
    private removeEventListeners;
    private handleBlur;
    private handleClick;
    private handleFocus;
    private setInitialAttributes;
    handleCheckedChange(): void;
    handleDisabledChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-radio': SlRadio;
    }
}
