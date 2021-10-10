import { LitElement, html, css, property } from 'lit-element';
import { SHARED_STYLES } from '../styles/SHARED_STYLES';

export class AppDropzone extends LitElement {

  @property({ type: String, attribute: true }) initialbg;
  @property({ type: String, attribute: true }) hoverbg;

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
          background-color: ${this.getAttribute('initialbg')};
          transition: all 0.5s;
        }

        :host([hoverbg]) {
          background-color: ${this.getAttribute('hoverbg')};
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
