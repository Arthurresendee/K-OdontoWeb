class CabecalhoWeb extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Carregar o HTML
        fetch('/components/cabecalhoHorizontal/cabecalhoWeb.html')
            .then(response => response.text())
            .then(data => {
                const template = document.createElement('template');
                template.innerHTML = data;

                const linkElem = document.createElement('link');
                linkElem.setAttribute('rel', 'stylesheet');
                linkElem.setAttribute('href', '/components/cabecalhoHorizontal/cabecalhoWeb.css');

                this.shadowRoot.appendChild(linkElem);
                this.shadowRoot.appendChild(template.content.cloneNode(true));

                this.shadowRoot.getElementById("botao-nav-home").onclick = function() {
                    window.location.href = "/pages/pagesWeb/home.html";
                };

                this.shadowRoot.getElementById("botao-nav-servicos").onclick = function() {
                    window.location.href = "/pages/pagesWeb/servicos.html";
                };

                this.shadowRoot.getElementById("botao-nav-contato").onclick = function() {
                    window.location.href = "/pages/pagesWeb/contato.html";
                };

                this.shadowRoot.getElementById("botao-nav-Sobre").onclick = function() {
                    window.location.href = "/pages/pagesWeb/sobre.html";
                };

                this.shadowRoot.getElementById("botao-nav-ADM").onclick = function() {
                    window.location.href = "/components/login/login.html";
                };

            })
            .catch(error => console.error('Erro ao carregar o HTML:', error));
    }
}

window.customElements.define('app-cabecalho-web', CabecalhoWeb);

