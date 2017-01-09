import { loaded } from 'document-promises';

customElements.define('iframe-defer', class extends HTMLElement {
  constructor() {
    super();
    this._iframe = document.createElement('iframe');
  }

  static get observedAttributes() {
    return Object.keys(HTMLIFrameElement.prototype);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._iframe.setAttribute(name, newValue);
  }

  connectedCallback() {
    loaded.then(() => {
      if (!this.closest(':root')) return;

      for (const attr of this.attributes) {
        this._iframe.setAttribute(attr.name, attr.value);
      }

      this.append(this._iframe);
    });
  }
});
