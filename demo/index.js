(function () {
'use strict';

let promisify = (type, readyState) => {
	return new Promise((resolve) => {
		let listener = () => {
			if (readyState.test(document.readyState)) {
				document.removeEventListener(type, listener);

				resolve();
			}
		};

		document.addEventListener(type, listener);

		listener();
	});
};



let loaded = promisify('readystatechange', /^complete$/);

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

      this.append(this._iframe);
    });
  }
});

}());
