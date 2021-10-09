import { LitElement, html, css, property } from 'lit-element';
import { SHARED_STYLES } from '../styles/SHARED_STYLES';

export class HomeView extends LitElement {

  @property({type: String}) exampleProp = 'This is an example prop';

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
      <div class="home-view">
        <h1>Home View works</h1>
        <p>${this.exampleProp}</p>
      </div>
    `;
  }
}

customElements.define('home-view', HomeView);
