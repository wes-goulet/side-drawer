// @ts-check

const style = `
:host {
  background-color: #ffffff;
  width: 350px;
  max-width: 75vw;

  visibility: hidden;
  transition: visibility 0.5s;
}

:host([open]) {
  visibility: visible;
}

::slotted(div) {
  box-sizing: border-box;
}

#d {
  position: fixed;
  z-index: 99;
  background-color: inherit;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  overscroll-behavior: contain;
  backdrop-filter: var(--side-drawer-backdrop-filter, none);

  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  box-sizing: border-box;
  transform: translateX(-100%);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  width: inherit;
  max-width: inherit;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
}

:host([open]) #d {
  transform: none;
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.5);
}

#fs {
  position: fixed;
  z-index: 98;
  background-color: #000000;
  backdrop-filter: var(--side-drawer-backdrop-filter, none);

  top: 0;
  bottom: 0;
  right: -30px; /* hide scrollbar until overscroll bug is fixed */
  height: 100vh;
  transition: var(
    --side-drawer-overlay-transition,
    opacity 0.25s ease-in-out 0.25s
  );
  width: calc(
    100vw + 30px
  ); /* put back to just 100vw once overscroll bug fixed */
  opacity: 0;
  visibility: hidden;

  overflow: auto;
  overscroll-behavior: contain;
}

:host([open]) #fs {
  opacity: var(--side-drawer-overlay-opacity, 0.7);
  visibility: visible;
}

/*
   * Workaround for bug https://bugs.chromium.org/p/chromium/issues/detail?id=813094
   * Once bug is fixed and in the wild we can remove this element and make #if overflow:hidden
   * and set "right: 0; width: 100vw" for #fs
   */
#ifs {
  height: calc(100vh + 1px);
}
`;

const template = `
<div id="d"><slot></slot></div>
<div id="fs"><div id="ifs"></div></div>
`;

// using a template so it only needs to be parsed once, whereas setting
// innerHTML directly in the custom element ctor means the HTML would get parsed
// for every custom element on the page
const tmpl = document.createElement("template");
tmpl.innerHTML = `<style>${style}</style>${template}`;

/**
 * A simple side drawer custom element
 */
export class SideDrawer extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    /**
     * @internal
     * @type {HTMLElement | null}
     */
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
  /**
   * @param {string} prop
   *
   * @internal
   */
  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  /**
   * @param {KeyboardEvent} e
   *
   * @internal
   */
  handleKeyUp = (e) => {
    if (e.altKey) {
      return;
    }

    switch (e.key) {
      case "Escape":
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

  /**
   * @param {string} name
   * @param {unknown} _oldValue
   * @param {unknown} _newValue
   * @memberof WcMenuButton
   */
  attributeChangedCallback(name, _oldValue, _newValue) {
    if (name === "open") {
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
            bubbles: true,
          })
        );
      } else {
        this.setAttribute("tabindex", "0");
        this.setAttribute("aria-disabled", "false");

        this.focus({
          preventScroll: true,
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
            bubbles: true,
          })
        );
      }
    }
  }

  /**
   * @internal
   */
  handleFreeSpaceDivClick = () => {
    this.open = false;
  };
}

customElements.define("wc-menu-button", SideDrawer);
