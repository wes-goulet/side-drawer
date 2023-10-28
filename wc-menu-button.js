// @ts-check

const style = `
:host {
  width: 37px;
}

button {
  all: unset;

  margin: 0;
  width: inherit;
  position: relative;
  display: inline-block;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  cursor: var(--wc-menu-button-cursor, default);
  transition: all 0.2s ease-in-out;
  -webkit-tap-highlight-color: transparent;
}

/* this trick makes the height 75% of the width (4:3 ratio) */
button:after {
  padding-top: 75%;
  display: block;
  content: "";
}

@media (hover: hover) {
  :host(:hover) {
    opacity: 0.75;
  }
}

:focus {
    outline: 2px solid color-mix(in srgb, var(--wc-menu-button-color, #000000) 50%, transparent);
    outline-offset: 5px;
    border-radius: 5px;
}

button span {
  display: block;
  position: absolute;
  height: 20%;
  width: 100%;
  background: var(--wc-menu-button-color, #000000);
  border-radius: 10%;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;
}

button span:nth-child(1) {
  top: 0%;
}

button span:nth-child(2),
button span:nth-child(3) {
  top: 40%;
}

button span:nth-child(4) {
  top: 80%;
}

:host([open]) button span:nth-child(1) {
  top: 40%;
  width: 0%;
  left: 50%;
}

:host([open]) button span:nth-child(2) {
  transform: rotate(45deg);
}

:host([open]) button span:nth-child(3) {
  transform: rotate(-45deg);
}

:host([open]) button span:nth-child(4) {
  top: 40%;
  width: 0%;
  left: 50%;
}
`;

const template = `
<button>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</button>
`;

// using a template so it only needs to be parsed once, whereas setting
// innerHTML directly in the custom element ctor means the HTML would get parsed
// for every custom element on the page
const tmpl = document.createElement("template");
tmpl.innerHTML = `<style>${style}</style>${template}`;

/**
 * A simple, animating menu button custom element
 */
export class WcMenuButton extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    /**
     * @internal
     * @type {HTMLElement | null}
     */
    this._menuButton = shadowRoot.querySelector("button");
  }

  connectedCallback() {
    if (this._menuButton !== null) {
      this._menuButton.addEventListener("click", this.handleMenuButtonClick);
    }

    this.upgradeProperty("open");
  }

  // from https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
  /**
   * @param {string} prop
   *
   * @internal
   * @memberOf WcMenuButton
   */
  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  get open() {
    return this.hasAttribute("open");
  }

  set open(isOpen) {
    if (isOpen) {
      if (!this.hasAttribute("open")) {
        this.setAttribute("open", "");
      }
    } else {
      if (this.hasAttribute("open")) {
        this.removeAttribute("open");
      }
    }
  }

  static get observedAttributes() {
    return ["open"];
  }

  /**
   * @param {string} name
   * @param {unknown} _oldValue
   * @param {unknown} _newValue
   * @memberof WcMenuButton
   */
  attributeChangedCallback(name, _oldValue, _newValue) {
    if (name === "open") {
      if (!this.open) {
        this.dispatchEvent(
          new CustomEvent("closed", {
            bubbles: true,
          }),
        );
      } else {
        this.dispatchEvent(
          new CustomEvent("opened", {
            bubbles: true,
          }),
        );
      }
    }
  }

  /**
   * @internal
   */
  handleMenuButtonClick = () => {
    this.open = !this.open;
  };
}

customElements.define("wc-menu-button", WcMenuButton);
