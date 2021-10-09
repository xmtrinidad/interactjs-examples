import { LitElement, html, css, property } from 'lit-element';
import { SHARED_STYLES } from './styles/SHARED_STYLES';

import './views/home-view';

export class InteractExamples extends LitElement {

  @property({type: String}) page = 'main';

  @property({type: String}) title = '';

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
      <main>
        <home-view></home-view>
      </main>
    `;
  }
}
