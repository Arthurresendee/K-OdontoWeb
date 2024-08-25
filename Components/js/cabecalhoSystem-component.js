class CabecalhoSystem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        fetch('/components/html/cabecalhoSystem-component.html')
            .then(response => response.text())
            .then(data => {
                const template = document.createElement('template');
                template.innerHTML = data;

                const linkElem = document.createElement('link');
                linkElem.setAttribute('rel', 'stylesheet');
                linkElem.setAttribute('href', '/components/css/cabecalhoSystem-component.css');

                this.shadowRoot.appendChild(linkElem);
                this.shadowRoot.appendChild(template.content.cloneNode(true));
            })
            .catch(error => console.error('Erro ao carregar o HTML:', error));
    }
}

window.customElements.define('app-cabecalho-system', CabecalhoSystem);