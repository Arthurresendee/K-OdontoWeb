const template = document.createElement('template');
template.innerHTML = `
    <header class="vertical-header">
        <div class="logo">
            <img src="/img/logo-marrom.png" alt="Logo">
        </div>
        <div class="cabecalho">
            <nav>
                <ul>
                    <li>
                        <button>Colaboradores</button>
                    </li>
                    <li>
                        <button>XXX</button>
                    </li>
                    <li>
                        <button>XXX</button>
                    </li>
                    <li>
                        <button>XXX</button>
                    </li>
                    <li>
                        <button>XXX</button>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
`;

class CabecalhoSystem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // //link do css do cabecalho
        // const linkElem = document.createElement('link');
        // linkElem.setAttribute('rel', 'stylesheet');
        // linkElem.setAttribute('href', '/css/cabecalhoSystem.css');
        // this.shadowRoot.appendChild(linkElem);

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('app-cabecalhoSystem', CabecalhoSystem);