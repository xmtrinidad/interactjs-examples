import { LitElement, html, css, property } from 'lit-element';
import { SHARED_STYLES } from '../styles/SHARED_STYLES';

import '../components/app-dropzone';

export class HomeView extends LitElement {

  @property({ type: Object }) interact;
  @property({ type: Object }) dropzones;

  static styles = [
    SHARED_STYLES,
    css`
      :host {
        display: block;
        position: relative;
      }

      .draggable-thing {
        width: 45px;
        height: 45px;
        background-color: #C2185B;
        z-index: 20px;
      }

      .dropzones {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        top: 200px;
        left: 0;
        right: 0;
        width: 300px;
        height: 100px;
        text-align: center;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        z-index: -1;
        transition: box-shadow 0.5s;
      }

      .dropzones[hint] {
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        border: 4px dashed grey;
      }
    `
  ];

  render() {
    return html`
      <div class="home-view">
        <div class="draggable-thing"></div>
      
        <div class="dropzones">
          <app-dropzone id="dz-1" initialbg="#7B1FA2"></app-dropzone>
          <app-dropzone id="dz-2" initialbg="#536DFE"></app-dropzone>
          <app-dropzone id="dz-3" initialbg="#009688"></app-dropzone>
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
    const dzElements = Array.from(this.shadowRoot.querySelectorAll('app-dropzone'));
    this.dropzones = this.shadowRoot.querySelector('.dropzones');
    this.moveThing();

    this.createDropzones(dzElements)
  }

  moveThing() {
    const position = { x: 0, y: 0 }
    const realThis = this;
    this.interact('.draggable-thing').draggable({
      listeners: {
        start(event) {
          console.log('Drag started', event.target);
          // console.log(this.dropzones);
          realThis.dropzones.setAttribute('hint', '');
          console.log(realThis);
        },
        move(event) {
          position.x += event.dx
          position.y += event.dy

          event.target.style.transform =
            `translate(${position.x}px, ${position.y}px)`
        },
        end(event) {
          console.log('Drag ended', event.target);
          realThis.dropzones.removeAttribute('hint');
        }
      }
    });

  }

  createDropzones(elements) {
    elements.forEach(element => {
      this.interact(element)
        .dropzone({
          ondragenter: (event) => {
            const element = this.shadowRoot.querySelector(`#${event.target.id}`);
            element.setAttribute('hoverbg', '#FFC107');

            console.log('Entered ' + event.target.id)
          },
          ondragleave: (event) => {
            const element = this.shadowRoot.querySelector(`#${event.target.id}`);
            element.removeAttribute('hoverbg');

            console.log('Exited ' + event.target.id)
          },
          ondrop: (event) => {
            alert(event.relatedTarget.id
              + ' was dropped into '
              + event.target.id)
          }
        })
        .on('dropactivate', (event) => {
          event.target.classList.add('drop-activated')
        })
    });
  }
}

customElements.define('home-view', HomeView);
