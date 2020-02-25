class ChessArrow extends HTMLElement {
  connectedCallback() {
    this._upgradeProperty("square");
    this._upgradeProperty("color");
  }

  set square(square: string | null) {
    if (square != null) {
      this.setAttribute("square", square);
    } else {
      this.removeAttribute("square");
    }
  }
  get square() {
    return this.getAttribute("square");
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

window.customElements.define("chess-arrow", ChessArrow);
export {};
