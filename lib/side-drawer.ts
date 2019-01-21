// @ts-ignore
import style from "./style.css";
// @ts-ignore
import template from "./template.html";

// using a template so it only needs to be parsed once, whereas setting
// innerHTML directly in the custom element ctor means the HTML would get parsed
// for every custom element on the page
const tmpl = document.createElement("template");
tmpl.innerHTML = `<style>${style}</style>${template}`;

export class SideDrawer extends HTMLElement {
  private _freeSpaceDiv: HTMLElement | null;

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
  }

  get open() {
    return this.hasAttribute("open");
  }

  set open(isOpen) {
    if (isOpen) {
      this.setAttribute("open", "");
    } else {
      this.removeAttribute("open");
    }
  }

  // static get observedAttributes() {
  //   return ["open"];
  // }

  // attributeChangedCallback(_name: string, _oldValue: any, _newValue: any) {
  //   // When the drawer is closed, update keyboard/screen reader behavior.
  //   if (!this.open) {
  //     this.setAttribute("tabindex", "-1");
  //     this.setAttribute("aria-disabled", "true");
  //   } else {
  //     this.setAttribute("tabindex", "0");
  //     this.setAttribute("aria-disabled", "false");
  //   }
  // }

  private handleFreeSpaceDivClick = (_e: any) => {
    this.open = false;
  };
}

customElements.define("side-drawer", SideDrawer);
