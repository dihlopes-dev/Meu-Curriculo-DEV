// Função para controlar o efeito sanfona e destaque dos cards
function toggleCard(cardElement) {
    const grid = cardElement.closest('.cards-grid');
    
    // Se o card clicado já estiver expandido, ele fecha e remove o foco dos outros
    if (cardElement.classList.contains('card-expanded')) {
        cardElement.classList.remove('card-expanded');
        grid.classList.remove('has-active');
    } else {
        // Remove a expansão de qualquer outro card na mesma grade
        grid.querySelectorAll('.skill-card').forEach(card => {
            card.classList.remove('card-expanded');
        });
        
        // Ativa o card clicado e escurece os demais da grade
        cardElement.classList.add('card-expanded');
        grid.classList.add('has-active');
    }
}

// Iguala a altura de todos os cards à altura do maior card do currículo
function equalizeCards() {
    const root = document.documentElement;
    root.style.removeProperty('--card-height');

    let maxHeight = 0;
    document.querySelectorAll('.skill-card').forEach(card => {
        maxHeight = Math.max(maxHeight, card.offsetHeight);
    });

    root.style.setProperty('--card-height', maxHeight + 'px');
}

window.addEventListener('load', equalizeCards);
window.addEventListener('resize', equalizeCards);
if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(equalizeCards);
}

// Foto de perfil: clique alterna entre círculo e retângulo
const profilePic = document.querySelector('.profile-pic');
if (profilePic) {
    profilePic.addEventListener('click', () => {
        profilePic.classList.toggle('profile-expanded');
    });
}


// ======================================================
// SELETOR DE IDIOMA (Português / English / Español)
// O texto original em português é a "chave" do dicionário.
// Se um texto não estiver no dicionário, ele continua em português.
// ======================================================
(function () {
    // [inglês, espanhol]
    const TRADUCOES = {
        // Sidebar
        "Desenvolvedor Full Stack & Mobile": ["Full Stack & Mobile Developer", "Desarrollador Full Stack y Mobile"],
        "Busco transição para a área de TI, imerso em desenvolvimento web, mobile e inteligência artificial. Criando soluções eficientes e dinâmicas.": [
            "Seeking a transition into IT, immersed in web development, mobile and artificial intelligence. Building efficient and dynamic solutions.",
            "Busco una transición hacia el área de TI, inmerso en desarrollo web, mobile e inteligencia artificial. Creando soluciones eficientes y dinámicas."
        ],
        "E-mail": ["Email", "Correo"],

        // Especialidades & Tecnologias
        "Especialidades & Tecnologias": ["Specialties & Technologies", "Especialidades y Tecnologías"],
        "Ferramentas": ["Tools", "Herramientas"],
        "Node.js, Express.js, Python, APIs REST, MySQL, PostgreSQL": ["Node.js, Express.js, Python, REST APIs, MySQL, PostgreSQL", "Node.js, Express.js, Python, APIs REST, MySQL, PostgreSQL"],
        "React Native, Expo Go, Desenvolvimento Cross-Platform": ["React Native, Expo Go, Cross-Platform Development", "React Native, Expo Go, Desarrollo Multiplataforma"],

        // Outros Conhecimentos
        "Outros Conhecimentos": ["Other Skills", "Otros Conocimientos"],
        "Inteligência Artificial": ["Artificial Intelligence", "Inteligencia Artificial"],
        "Uso de ferramentas de IA, prompts avançados, automação de fluxos e integração com código.": [
            "Use of AI tools, advanced prompting, workflow automation and code integration.",
            "Uso de herramientas de IA, prompts avanzados, automatización de flujos e integración con código."
        ],
        "Figma, Canva, CorelDRAW, estruturação de interfaces intuitivas e prototipagem.": [
            "Figma, Canva, CorelDRAW, structuring intuitive interfaces and prototyping.",
            "Figma, Canva, CorelDRAW, estructuración de interfaces intuitivas y prototipado."
        ],

        // Projetos em Destaque
        "Projetos em Destaque": ["Featured Projects", "Proyectos Destacados"],
        "Aplicação web para recomendação de séries utilizando HTML, CSS e JavaScript.": [
            "Web application for TV series recommendations built with HTML, CSS and JavaScript.",
            "Aplicación web de recomendación de series usando HTML, CSS y JavaScript."
        ],
        "Landing page focada em cuidados pet desenvolvida com design moderno e responsivo.": [
            "Pet care landing page built with a modern, responsive design.",
            "Landing page enfocada en el cuidado de mascotas, con diseño moderno y responsivo."
        ],
        "Aplicativo de lista de tarefas com funcionalidades de adicionar, editar e remover tarefas.": [
            "To-do list app with features to add, edit and remove tasks.",
            "Aplicación de lista de tareas con funciones para agregar, editar y eliminar tareas."
        ],
        "Aplicação web que informa a previsão do tempo em diferentes cidades em tempo real.": [
            "Web app that shows real-time weather forecasts for different cities.",
            "Aplicación web que muestra el pronóstico del tiempo en tiempo real para distintas ciudades."
        ],

        // Experiência Profissional
        "Experiência Profissional": ["Professional Experience", "Experiencia Profesional"],
        "Motorista por Aplicativos": ["Rideshare Driver", "Conductor de Aplicaciones de Transporte"],
        "Autônomo | 06/2016 - Atual": ["Self-employed | 06/2016 - Present", "Autónomo | 06/2016 - Actual"],
        "- Atendimento direto ao público": ["- Direct customer service", "- Atención directa al público"],
        "- Gestão do próprio tempo e de rotas": ["- Time and route management", "- Gestión del propio tiempo y de rutas"],
        "- Uso diário de aplicativos e GPS.": ["- Daily use of apps and GPS.", "- Uso diario de aplicaciones y GPS."],
        "Operador de Telemarketing Ativo": ["Outbound Telemarketing Operator", "Operador de Telemarketing Activo"],
        "- Atendimento e contato ativo com clientes": ["- Customer service and outbound client contact", "- Atención y contacto activo con clientes"],
        "- Comunicação clara e foco em metas.": ["- Clear communication and goal focus.", "- Comunicación clara y enfoque en metas."],
        "Porteiro (Hotel)": ["Hotel Doorman", "Portero (Hotel)"],
        "- Recepção e atendimento a hóspedes": ["- Guest reception and service", "- Recepción y atención a huéspedes"],
        "- Controle de acesso e responsabilidade operacional.": ["- Access control and operational responsibility.", "- Control de acceso y responsabilidad operativa."],
        "Instalador-Reparador de Telecom": ["Telecom Installer-Repairer", "Instalador-Reparador de Telecom"],
        "Serede | 09/2008 - 01/2009 e 12/2014 - 01/2016": ["Serede | 09/2008 - 01/2009 and 12/2014 - 01/2016", "Serede | 09/2008 - 01/2009 y 12/2014 - 01/2016"],
        "- Instalação e reparo de equipamentos de telecomunicações": ["- Installation and repair of telecommunications equipment", "- Instalación y reparación de equipos de telecomunicaciones"],
        "- Atendimento técnico em campo.": ["- Field technical support.", "- Atención técnica en campo."],
        "- Instalação e manutenção de redes e equipamentos de telecom.": ["- Installation and maintenance of telecom networks and equipment.", "- Instalación y mantenimiento de redes y equipos de telecomunicaciones."],
        "Praça da Marinha": ["Brazilian Navy Sailor", "Marinero de la Marina de Brasil"],
        "Comando da Marinha | 09/2006 - 12/2014": ["Brazilian Navy Command | 09/2006 - 12/2014", "Comando de la Marina de Brasil | 09/2006 - 12/2014"],
        "- Disciplina, trabalho em equipe e cumprimento de procedimentos": ["- Discipline, teamwork and procedural compliance", "- Disciplina, trabajo en equipo y cumplimiento de procedimientos"],
        "- Observação meteorológica e combate a incêndio.": ["- Meteorological observation and firefighting.", "- Observación meteorológica y combate de incendios."],

        // Formação & Certificações
        "Formação & Certificações": ["Education & Certifications", "Formación y Certificaciones"],
        "Ensino Médio Completo": ["High School Diploma", "Educación Secundaria Completa"],
        "(Concluído em 2008).": ["(Completed in 2008).", "(Concluido en 2008)."],
        "- Estudos em Full Stack Web Development (Concluído em 2026)": ["- Full Stack Web Development studies (Completed in 2026)", "- Estudios en Full Stack Web Development (Concluido en 2026)"],
        "- Desenvolvimento Mobile (React Native) *Previsão de conclusão: 2027.": ["- Mobile Development (React Native) *Expected completion: 2027.", "- Desarrollo Mobile (React Native) *Previsión de conclusión: 2027."],
        "Informática & Rotinas Administrativas": ["IT & Administrative Routines", "Informática y Rutinas Administrativas"],
        "CNI Escola de Informática:": ["CNI Computer School:", "CNI Escuela de Informática:"],
        "- Aux. Administrativo, Aux. Financeiro, Departamento Pessoal e Secretariado (145h).": [
            "- Administrative Assistant, Financial Assistant, HR and Secretarial (145h).",
            "- Auxiliar Administrativo, Auxiliar Financiero, Recursos Humanos y Secretariado (145h)."
        ],
        "Montagem e Manutenção": ["Assembly & Maintenance", "Montaje y Mantenimiento"],
        "- Curso de Montagem e Manutenção de Computadores (16h).": ["- Computer Assembly and Maintenance course (16h).", "- Curso de Montaje y Mantenimiento de Computadoras (16h)."],
        "- Curso prático de design e vetorização (16h).": ["- Hands-on course in design and vector graphics (16h).", "- Curso práctico de diseño y vectorización (16h)."],
        "Normas Regulamentadoras (NR)": ["Safety Regulations (NR)", "Normas Reglamentarias (NR)"],
        "Mazza Escola Técnica:": ["Mazza Technical School:", "Mazza Escuela Técnica:"],
        "- Formação Técnica Básica em Eletricidade NR-10 (40h)": ["- Basic Technical Training in Electricity NR-10 (40h)", "- Formación Técnica Básica en Electricidad NR-10 (40h)"],
        "- Trabalhos em Altura NR-35 (8h)": ["- Work at Height NR-35 (8h)", "- Trabajos en Altura NR-35 (8h)"],
        "- Técnico de Instalações e Reparos em telecomunicações (44h).": ["- Telecommunications Installation and Repair Technician (44h).", "- Técnico en Instalaciones y Reparaciones de telecomunicaciones (44h)."],
        "Meteorologia & Operacional": ["Meteorology & Operations", "Meteorología y Operaciones"],
        "Marinha do Brasil (Diretoria de Hidrografia e Navegação):": ["Brazilian Navy (Directorate of Hydrography and Navigation):", "Marina de Brasil (Dirección de Hidrografía y Navegación):"],
        "- Observação Meteorológica": ["- Meteorological Observation", "- Observación Meteorológica"],
        "- Combate a Incêndio.": ["- Firefighting.", "- Combate de Incendios."],

        // Rodapé
        "© 2026 Diego Pereira Lopes. Desenvolvido com HTML5, CSS e JS.": [
            "© 2026 Diego Pereira Lopes. Built with HTML5, CSS and JS.",
            "© 2026 Diego Pereira Lopes. Desarrollado con HTML5, CSS y JS."
        ]
    };

    const INDICE = { en: 0, es: 1 };
    const HTML_LANG = { pt: 'pt-BR', en: 'en', es: 'es' };

    const TITULO = {
        pt: 'Diego Pereira Lopes - Desenvolvedor Full Stack & Mobile',
        en: 'Diego Pereira Lopes - Full Stack & Mobile Developer',
        es: 'Diego Pereira Lopes - Desarrollador Full Stack y Mobile'
    };
    const ALT_FOTO = {
        pt: 'Foto de Diego Pereira Lopes',
        en: 'Photo of Diego Pereira Lopes',
        es: 'Foto de Diego Pereira Lopes'
    };
    const MSG_WHATSAPP = {
        pt: 'Olá Diego, vi seu currículo e gostaria de conversar.',
        en: 'Hello Diego, I saw your resume and would like to talk.',
        es: 'Hola Diego, vi tu currículum y me gustaría conversar.'
    };

    const normalizar = texto => texto.replace(/\s+/g, ' ').trim();

    // Guarda o texto original (português) de cada trecho de texto da página
    const originais = new Map();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(no) {
            const pai = no.parentElement;
            if (!pai || pai.closest('script, style, select, .lang-switcher')) return NodeFilter.FILTER_REJECT;
            return no.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    });
    while (walker.nextNode()) originais.set(walker.currentNode, walker.currentNode.nodeValue);

    const botaoWhats = document.querySelector('.whatsapp-btn');
    const baseWhats = botaoWhats ? botaoWhats.getAttribute('href').split('?')[0] : null;
    const foto = document.querySelector('.profile-pic');

    function aplicarIdioma(lang) {
        originais.forEach((original, no) => {
            const entrada = TRADUCOES[normalizar(original)];
            if (lang === 'pt' || !entrada) {
                no.nodeValue = original;
                return;
            }
            const inicio = original.match(/^\s*/)[0];
            const fim = original.match(/\s*$/)[0];
            no.nodeValue = inicio + entrada[INDICE[lang]] + fim;
        });

        document.documentElement.lang = HTML_LANG[lang];
        document.title = TITULO[lang];
        if (foto) foto.alt = ALT_FOTO[lang];
        if (botaoWhats && baseWhats) {
            botaoWhats.setAttribute('href', baseWhats + '?text=' + encodeURIComponent(MSG_WHATSAPP[lang]));
        }

        // O tamanho do texto muda de um idioma para outro: refaz a altura dos cards
        if (typeof equalizeCards === 'function') equalizeCards();
    }

    // Cria o seletor no canto superior direito
    const seletor = document.createElement('div');
    seletor.className = 'lang-switcher';
    seletor.innerHTML =
        '<i class="fas fa-globe"></i>' +
        '<select id="lang-select" aria-label="Idioma / Language / Idioma">' +
        '<option value="pt">Português</option>' +
        '<option value="en">English</option>' +
        '<option value="es">Español</option>' +
        '</select>';
    document.body.appendChild(seletor);
    const select = seletor.querySelector('select');

    // Idioma inicial: o último escolhido; na primeira visita, o idioma do navegador
    let inicial = 'pt';
    try {
        const salvo = localStorage.getItem('curriculo-idioma');
        if (salvo && HTML_LANG[salvo]) {
            inicial = salvo;
        } else {
            const nav = (navigator.language || 'pt').slice(0, 2).toLowerCase();
            if (nav === 'en' || nav === 'es') inicial = nav;
        }
    } catch (e) { /* sem localStorage: segue em português */ }

    select.value = inicial;
    if (inicial !== 'pt') aplicarIdioma(inicial);

    select.addEventListener('change', () => {
        aplicarIdioma(select.value);
        try { localStorage.setItem('curriculo-idioma', select.value); } catch (e) {}
    });
})();
