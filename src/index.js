import { loaded } from 'document-promises';

customElements.define('iframe-defer', class extends HTMLElement {
  connectedCallback() {
    loaded.then(() => {
      if (!this.closest(':root')) return;

      const iframe = document.createElement('iframe');

      [].forEach.call(this.attributes, attr => {
        iframe.setAttribute(attr.name, attr.value);
      });

      this.appendChild(iframe);
    });
  }
});
