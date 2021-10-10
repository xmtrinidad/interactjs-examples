import { LitElement, html, css, property } from 'lit-element';
import { SHARED_STYLES } from '../styles/SHARED_STYLES';

export class AppDropzone extends LitElement {

  // @property({ type: Object }) interact;

  static styles = [
    SHARED_STYLES,
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <style>
        :host {
          background-color: ${this.getAttribute('bg')}
        }
      </style>
      <div class="dropzone"></div>
    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    
  }
}

customElements.define('app-dropzone', AppDropzone);
