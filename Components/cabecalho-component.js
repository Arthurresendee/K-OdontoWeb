const template = document.createElement('template');
template.innerHTML = `
    <header>
        <div class="logo">
                <img src="../img/logo-marrom.png" alt="">
        </div>
        <div class="cabecalho">
            <nav>
                <ul>
                    <li><a href="home.html">Home</a></li>
                    <li><a href="servicos.html">Servicos</a></li>
                    <li><a href="contato.html">Contato</a></li>
                    <li><a href="sobre.html">Sobre</a></li>
                    <li><a href="login.html">ADM</a></li>
                </ul>
            </nav>
        </div>
    </header>
`;

class Cabecalho extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        //link do css do cabecalho
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', '../css/cabecalho.css');
        this.shadowRoot.appendChild(linkElem);

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('app-cabecalho', Cabecalho);
