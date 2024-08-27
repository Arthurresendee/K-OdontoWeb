class CabecalhoSystemTag extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Carregar o HTML
        fetch('/components/cabecalhoSystem/cabecalho.html')
            .then(response => response.text())
            .then(data => {
                const template = document.createElement('template');
                template.innerHTML = data;

                const linkElem = document.createElement('link');
                linkElem.setAttribute('rel', 'stylesheet');
                linkElem.setAttribute('href', '/components/cabecalhoSystem/cabecalho.css');

                this.shadowRoot.appendChild(linkElem);
                this.shadowRoot.appendChild(template.content.cloneNode(true));

                this.shadowRoot.getElementById("botao-nav-home").onclick = function() {
                    window.location.href = "/pages/pagesSystem/homeSystem.html";
                };

                this.shadowRoot.getElementById("botao-nav-dashboard").onclick = function() {
                    window.location.href = "/pages/pagesSystem/dashboard.html";
                };

                this.shadowRoot.getElementById("botao-nav-cadastro").onclick = function() {
                    window.location.href = "/pages/pagesSystem/cadastro.html";
                };

                this.shadowRoot.getElementById("botao-nav-financeiro").onclick = function() {
                    window.location.href = "/pages/pagesSystem/financeiro.html";
                };

                this.shadowRoot.getElementById("botao-nav-ControleDeEstoque").onclick = function() {
                    window.location.href = "/pages/pagesSystem/controleDeEstoque.html";
                };

                this.shadowRoot.getElementById("botao-nav-cadastro").onclick = function() {
                    window.location.href = "/pages/pagesSystem/cadastro.html";
                };
            })
            .catch(error => console.error('Erro ao carregar o HTML:', error));
    }
}

window.customElements.define('app-cabecalho-system', CabecalhoSystemTag);
