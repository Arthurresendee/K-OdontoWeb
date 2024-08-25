class Cabecalho extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Carregar o HTML externo
        fetch('/model.html')
            .then(response => response.text())
            .then(data => {
                const template = document.createElement('template');
                template.innerHTML = data;

                const linkElem = document.createElement('link');
                linkElem.setAttribute('rel', 'stylesheet');
                linkElem.setAttribute('href', '/model.css');

                const linkElem2 = document.createElement('link');
                linkElem.setAttribute('rel', 'stylesheet');
                linkElem.setAttribute('href', '/css/cabecalho.css');

                this.shadowRoot.appendChild(linkElem);
                this.shadowRoot.appendChild(linkElem);

                this.shadowRoot.appendChild(template.content.cloneNode(true));
            })
            .catch(error => console.error('Erro ao carregar o HTML:', error));
    }
}

window.customElements.define('app-cabecalho-teste', Cabecalho);
