var css = ":host {\n  background-color: #ffffff;\n  width: 350px;\n  max-width: 75vw;\n\n  visibility: hidden;\n  transition: visibility 0.5s;\n}\n\n:host([open]) {\n  visibility: visible;\n}\n\n::slotted(div) {\n  box-sizing: border-box;\n}\n\n#d {\n  position: fixed;\n  z-index: 99;\n  background-color: inherit;\n  -webkit-overflow-scrolling: touch;\n  overflow: auto;\n\n  top: 0;\n  bottom: 0;\n  left: 0;\n  height: 100vh;\n  box-sizing: border-box;\n  -webkit-transform: translateX(-100%);\n          transform: translateX(-100%);\n  transition: -webkit-transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  width: inherit;\n  max-width: inherit;\n  border-top-right-radius: inherit;\n  border-bottom-right-radius: inherit;\n}\n\n:host([open]) #d {\n  -webkit-transform: none;\n          transform: none;\n  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.5);\n}\n\n#fs {\n  position: fixed;\n  z-index: 98;\n  background-color: #000000;\n\n  top: 0;\n  bottom: 0;\n  right: 0;\n  height: 100vh;\n  transition: var(\n    --side-drawer-overlay-transition,\n    opacity 0.25s ease-in-out 0.25s\n  );\n  width: 100vw;\n  opacity: 0;\n  visibility: hidden;\n}\n\n:host([open]) #fs {\n  opacity: var(--side-drawer-overlay-opacity, 0.7);\n  visibility: visible;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osZUFBZTs7RUFFZixrQkFBa0I7RUFDbEIsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLFdBQVc7RUFDWCx5QkFBeUI7RUFDekIsaUNBQWlDO0VBQ2pDLGNBQWM7O0VBRWQsTUFBTTtFQUNOLFNBQVM7RUFDVCxPQUFPO0VBQ1AsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixvQ0FBNEI7VUFBNUIsNEJBQTRCO0VBQzVCLCtEQUF1RDtFQUF2RCx1REFBdUQ7RUFBdkQsNEdBQXVEO0VBQ3ZELGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsZ0NBQWdDO0VBQ2hDLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLHVCQUFlO1VBQWYsZUFBZTtFQUNmLCtDQUErQztBQUNqRDs7QUFFQTtFQUNFLGVBQWU7RUFDZixXQUFXO0VBQ1gseUJBQXlCOztFQUV6QixNQUFNO0VBQ04sU0FBUztFQUNULFFBQVE7RUFDUixhQUFhO0VBQ2I7OztHQUdDO0VBQ0QsWUFBWTtFQUNaLFVBQVU7RUFDVixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxnREFBZ0Q7RUFDaEQsbUJBQW1CO0FBQ3JCIiwiZmlsZSI6InN0eWxlLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgd2lkdGg6IDM1MHB4O1xuICBtYXgtd2lkdGg6IDc1dnc7XG5cbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICB0cmFuc2l0aW9uOiB2aXNpYmlsaXR5IDAuNXM7XG59XG5cbjpob3N0KFtvcGVuXSkge1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuXG46OnNsb3R0ZWQoZGl2KSB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbiNkIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiA5OTtcbiAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcbiAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xuICBvdmVyZmxvdzogYXV0bztcblxuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcbiAgd2lkdGg6IGluaGVyaXQ7XG4gIG1heC13aWR0aDogaW5oZXJpdDtcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IGluaGVyaXQ7XG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiBpbmhlcml0O1xufVxuXG46aG9zdChbb3Blbl0pICNkIHtcbiAgdHJhbnNmb3JtOiBub25lO1xuICBib3gtc2hhZG93OiAwcHggMHB4IDI1cHggMHB4IHJnYmEoMCwgMCwgMCwgMC41KTtcbn1cblxuI2ZzIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiA5ODtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcblxuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgcmlnaHQ6IDA7XG4gIGhlaWdodDogMTAwdmg7XG4gIHRyYW5zaXRpb246IHZhcihcbiAgICAtLXNpZGUtZHJhd2VyLW92ZXJsYXktdHJhbnNpdGlvbixcbiAgICBvcGFjaXR5IDAuMjVzIGVhc2UtaW4tb3V0IDAuMjVzXG4gICk7XG4gIHdpZHRoOiAxMDB2dztcbiAgb3BhY2l0eTogMDtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuXG46aG9zdChbb3Blbl0pICNmcyB7XG4gIG9wYWNpdHk6IHZhcigtLXNpZGUtZHJhd2VyLW92ZXJsYXktb3BhY2l0eSwgMC43KTtcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbn1cbiJdfQ== */";

var template = "<div id=\"d\"><slot></slot></div>\n<div id=\"fs\"></div>\n";

// @ts-ignore
// using a template so it only needs to be parsed once, whereas setting
// innerHTML directly in the custom element ctor means the HTML would get parsed
// for every custom element on the page
const tmpl = document.createElement("template");
tmpl.innerHTML = `<style>${css}</style>${template}`;
var KEYCODE;
(function (KEYCODE) {
    KEYCODE[KEYCODE["ESC"] = 27] = "ESC";
})(KEYCODE || (KEYCODE = {}));
class SideDrawer extends HTMLElement {
    constructor() {
        super();
        // from https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
        this.upgradeProperty = (prop) => {
            if (this.hasOwnProperty(prop)) {
                let value = this[prop];
                delete this[prop];
                this[prop] = value;
            }
        };
        this.handleKeyUp = (e) => {
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
        this.handleFreeSpaceDivClick = (_e) => {
            this.open = false;
        };
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
        this._freeSpaceDiv = shadowRoot.getElementById("fs");
    }
    connectedCallback() {
        if (this._freeSpaceDiv) {
            this._freeSpaceDiv.addEventListener("click", this.handleFreeSpaceDivClick);
        }
        this.upgradeProperty("open");
    }
    disconnectedCallback() {
        document.removeEventListener("keyup", this.handleKeyUp);
    }
    get open() {
        return this.hasAttribute("open");
    }
    set open(isOpen) {
        if (isOpen) {
            this.setAttribute("open", "");
        }
        else {
            this.removeAttribute("open");
        }
    }
    static get observedAttributes() {
        return ["open"];
    }
    // private _bodyOverflow: string | null | undefined;
    // private _bodyPosition: string | null | undefined;
    attributeChangedCallback(_name, _oldValue, _newValue) {
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
                this.dispatchEvent(new CustomEvent("close", {
                    bubbles: true
                }));
            }
            else {
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
                this.dispatchEvent(new CustomEvent("open", {
                    bubbles: true
                }));
            }
        }
    }
}
customElements.define("side-drawer", SideDrawer);

export { SideDrawer };
