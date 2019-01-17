export default class SideDrawer extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    // @ts-ignore
    this.shadowRoot.innerHTML = html`
      <style>
        .container {
          height: 100%;
          width: 0;
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          overflow-x: hidden;
          transition: 0.5s;
        }
      </style>

      <div class="container"><slot></slot></div>
      >
    `;
  }
}

customElements.define("side-drawer", SideDrawer);
