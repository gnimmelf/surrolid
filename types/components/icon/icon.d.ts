import ShoelaceElement from '../../internal/shoelace-element';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Icons are symbols that can be used to represent various options within an application.
 * @documentation https://shoelace.style/components/icon
 * @status stable
 * @since 2.0
 *
 * @event sl-load - Emitted when the icon has loaded.
 * @event sl-error - Emitted when the icon fails to load due to an error.
 *
 * @csspart svg - The internal SVG element.
 */
export default class SlIcon extends ShoelaceElement {
    static styles: CSSResultGroup;
    private svg;
    /** The name of the icon to draw. Available names depend on the icon library being used. */
    name?: string;
    /**
     * An external URL of an SVG file. Be sure you trust the content you are including, as it will be executed as code and
     * can result in XSS attacks.
     */
    src?: string;
    /**
     * An alternate description to use for assistive devices. If omitted, the icon will be considered presentational and
     * ignored by assistive devices.
     */
    label: string;
    /** The name of a registered custom icon library. */
    library: string;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    private getUrl;
    handleLabelChange(): void;
    setIcon(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-icon': SlIcon;
    }
}
