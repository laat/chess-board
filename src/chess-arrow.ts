export class ChessArrow extends HTMLElement {
  static observedAttributes = ["from", "to", "color", "width"];
  connectedCallback() {
    this._upgradeProperty("from");
    this._upgradeProperty("to");
    this._upgradeProperty("color");
    this._upgradeProperty("width");
  }

  attributeChangedCallback() {
    this.dispatchEvent(new Event("chess-arrow-updated", { bubbles: true }));
  }

  set from(from: string | null) {
    if (from != null) {
      this.setAttribute("from", from);
    } else {
      this.removeAttribute("from");
    }
  }
  get from() {
    return this.getAttribute("from");
  }

  set to(to: string | null) {
    if (to != null) {
      this.setAttribute("to", to);
    } else {
      this.removeAttribute("to");
    }
  }
  get to() {
    return this.getAttribute("to");
  }

  set width(width: string | null) {
    if (width != null) {
      this.setAttribute("width", width);
    } else {
      this.removeAttribute("width");
    }
  }
  get width() {
    return this.getAttribute("width");
  }

  set color(color: string | null) {
    if (color != null) {
      this.setAttribute("color", color);
    } else {
      this.removeAttribute("color");
    }
  }
  get color() {
    return this.getAttribute("color");
  }

  set opacity(opacity: string | null) {
    if (opacity != null) {
      this.setAttribute("opacity", opacity);
    } else {
      this.removeAttribute("opacity");
    }
  }
  get opacity() {
    return this.getAttribute("opacity");
  }

  private _upgradeProperty(prop: any) {
    if (this.hasOwnProperty(prop)) {
      // @ts-ignore
      let value = this[prop];
      // @ts-ignore
      delete this[prop];
      // @ts-ignore
      this[prop] = value;
    }
  }
}

window.customElements.define("chess-arrow", ChessArrow);
export {};
