const html = String.raw;

class ChessCircle extends HTMLElement {
  private circle: HTMLElement;
  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.appendChild(template.content.cloneNode(true));
    this.circle = root.querySelector("div")!;
  }
  connectedCallback() {
    this._upgradeProperty("color");
    this._upgradeProperty("width");
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.circle.style.borderStyle = "solid";
    this.circle.style.borderColor = this.color || "green";
    this.circle.style.borderWidth = this.width || "2px";
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

const template = document.createElement("template");
template.innerHTML = html`
  <style>
    :host {
      position: relative;
    }
    div {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 50%;
    }
  </style>
  <div></div>
`;

window.customElements.define("chess-circle", ChessCircle);
export {};
