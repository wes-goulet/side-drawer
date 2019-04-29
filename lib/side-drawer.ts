// @ts-ignore
import style from "./style.css";
// @ts-ignore
import template from "./template.html";

// using a template so it only needs to be parsed once, whereas setting
// innerHTML directly in the custom element ctor means the HTML would get parsed
// for every custom element on the page
const tmpl = document.createElement("template");
tmpl.innerHTML = `<style>${style}</style>${template}`;

enum KEYCODE {
  ESC = 27
}

export class SideDrawer extends HTMLElement {
  private _freeSpaceDiv: HTMLElement | null;

  // Explicitly let TS know any type can come from index signature
  [key: string]: any;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
    this._freeSpaceDiv = shadowRoot.getElementById("fs");
  }

  connectedCallback() {
    if (this._freeSpaceDiv) {
      this._freeSpaceDiv.addEventListener(
        "click",
        this.handleFreeSpaceDivClick
      );
    }

    this.upgradeProperty("open");
  }

  disconnectedCallback() {
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  // from https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
  upgradeProperty = (prop: string) => {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  };

  handleKeyUp = (e: KeyboardEvent) => {
    if (e.altKey) {
      return;
    }

    switch (e.keyCode) {
      case KEYCODE.ESC:
        e.preventDefault();
        this.open = false;
        break;
    }
  };

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

  // private _bodyOverflow: string | null | undefined;
  // private _bodyPosition: string | null | undefined;
  attributeChangedCallback(_name: string, _oldValue: any, _newValue: any) {
    if (_name === "open") {
      // When the drawer is closed, update keyboard/screen reader behavior.
      if (!this.open) {
        this.setAttribute("tabindex", "-1");
        this.setAttribute("aria-disabled", "true");

        document.removeEventListener("keyup", this.handleKeyUp);
        // if (this._bodyOverflow !== undefined) {
        //   document.body.style.overflow = this._bodyOverflow;
        // }
        // if (this._bodyPosition !== undefined) {
        //   document.body.style.position = this._bodyPosition;
        // }

        this.dispatchEvent(
          new CustomEvent("close", {
            bubbles: true
          })
        );
      } else {
        this.setAttribute("tabindex", "0");
        this.setAttribute("aria-disabled", "false");

        this.focus({
          preventScroll: true
        });

        document.addEventListener("keyup", this.handleKeyUp);
        // to prevent body behind drawer from scrolling you need
        // to set overflow to hidden and position to fixed (for iOS)
        // TODO: this is too buggy
        // this._bodyOverflow = document.body.style.overflow;
        // document.body.style.overflow = "hidden";
        // this._bodyPosition = document.body.style.position;
        // document.body.style.position = "fixed";

        this.dispatchEvent(
          new CustomEvent("open", {
            bubbles: true
          })
        );
      }
    }
  }

  private handleFreeSpaceDivClick = (_e: any) => {
    this.open = false;
  };
}

customElements.define("side-drawer", SideDrawer);

// JSX Type Declaration - using 'any' for now just so things will
// compile. Need to decide if we want to bring in a dep on (p)react
// so that we can properly extend HTMLAttributes JSX interface.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "side-drawer": any;
    }
  }
}
