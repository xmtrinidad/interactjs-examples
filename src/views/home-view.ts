import { LitElement, html, css, property } from 'lit-element';
import { SHARED_STYLES } from '../styles/SHARED_STYLES';

export class HomeView extends LitElement {

  @property({ type: Object }) interact;

  static styles = [
    SHARED_STYLES,
    css`
      :host {
        display: block;
      }

      .draggable-thing {
        width: 100px;
        height: 100px;
        background-color: rebeccapurple;
      }
    `
  ];

  render() {
    return html`
      <div class="home-view">
        <div class="draggable-thing">
          <span>This is a draggable thing</span>
        </div>
      </div>
    `;
  }

  constructor() {
    super();
    // Recast Window object
    const w = <any>window;

    // Set interact instance
    this.interact = w.interact;
  }

  firstUpdated() {
    this.moveThing();
  }

  moveThing() {
    const position = { x: 0, y: 0 }

    this.interact('.draggable-thing').draggable({
      listeners: {
        start(event) {
          console.log(event.type, event.target)
        },
        move(event) {
          position.x += event.dx
          position.y += event.dy

          event.target.style.transform =
            `translate(${position.x}px, ${position.y}px)`
        },
      }
    });

  }
}

customElements.define('home-view', HomeView);
