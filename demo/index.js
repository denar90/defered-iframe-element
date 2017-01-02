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
  connectedCallback() {
    loaded.then(() => {
      if (!this.closest(':root')) return;

      const iframe = document.createElement('iframe');

      for (const attr of this.attributes) {
        iframe.setAttribute(attr.name, attr.value);
      }

      this.append(iframe);
    });
  }
});

}());
