class ChessCircle extends HTMLElement {
  connectedCallback() {
    this._upgradeProperty("from");
    this._upgradeProperty("to");
    this._upgradeProperty("color");
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

window.customElements.define("chess-circle", ChessCircle);

export {};
