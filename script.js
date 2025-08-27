document.addEventListener('DOMContentLoaded', function () {



    // Criando um preloader

    function createPreloader() {

        const preloader = document.createElement('div');
        preloader.id = 'preloader';
        preloader.innerHTML = `
            <div class="preloader-content">
                <div class="preloader-logo">
                    <img src="images/png/LOGOTIPO PRINCIPAL-1@150x.png" alt="Logotipo Tesselas">
                </div>
                <div class="loading-animation">
                    <div class="mosaic-loader">
                        <div class="piece piece-1"></div>
                        <div class="piece piece-2"></div>
                        <div class="piece piece-3"></div>
                        <div class="piece piece-4"></div>
                    </div>
                </div>
                <p class="loading-text">Carregando...</p>
            </div>
        `;

        const preloaderStyle = document.createElement('style');
        preloaderStyle.textContent = `
            #preloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg,
                    #E8E9EB 0%,
                    #F5F5F5 25%,
                    #FFFFFF 50%,
                    #F5F5F5 75%,
                    #E8E9EB 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.5s ease-out;
            }

            .preloader-content {
                text-align: center;
                animation: fadeInUp 1s ease-in-out;
            }

            .preloader-logo img {
                width: 160px;
                height: auto;
                margin-bottom: 20px;
                opacity: 0;
                animation: logoFadeIn 1.5s ease-out 0.5s forwards;
            }

            .mosaic-loader {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-bottom: 20px;
            }
                
            .mosaic-loader .piece {
                width: 8px;
                height: 8px;
                border-radius: 10px;
                animation: mosaicPulse 1.5s ease-in-out infinite;
            }

            .piece-1 {
                background-color: #EBE1CF;
                animation-delay: 0s;
            }

            .piece-2 {
                background-color: #CCD3C2;
                animation-delay: 0.3s;
            }

            .piece-3 {
                background-color: #DB835C;
                animation-delay: 0.6s;
            }

            .piece-4 {
                background-color: #557468;
                animation-delay: 0.9s;
            }

            .loading-text {
                font-family: 'AcehLight', sans-serif;
                color: #557468;
                font-size: 14px;
                letter-spacing: 1px;
                opacity: 0;
                animation: textFadeIn 1.5s ease-out;
            }

            @keyframes logoFadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes mosaicPulse {
                0%, 100% {
                    transform: scale(1);
                    opacity: 0.7;                    
                }
                50% {
                    transform: scale(1.2);
                    opacity: 1;
                }
            }

            @keyframes textFadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 0.8;
                }
            }

            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;

        document.head.insertAdjacentElement('beforeend', preloaderStyle);
        document.body.insertBefore(preloader, document.body.firstChild);

        window.addEventListener('load', function () {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 1500);
        });

    }

    createPreloader();



    // Adicionando um header responsivo ao scroll

    const header = document.querySelector('header');
    const logo = document.querySelector('.logo img');
    let lastScrollTop = 0;
    let isHeaderVisible = true;

    function handleHeaderScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';

        if (scrollTop > 50) {
            header.classList.add('scrolled');
            header.style.padding = '5px 0 0 0';
            if (logo) {
                logo.style.height = '60px';
            }
        } else {
            header.classList.remove('scrolled');
            header.style.padding = '10px 0 0 0';
            if (logo) {
                logo.style.height = '80px';
            }
        }

        if (scrollTop > 100) {
            if (scrollDirection === 'down' && isHeaderVisible) {
                header.style.transform = 'translateY(-100%)';
                isHeaderVisible = false;
            } else if (scrollDirection === 'up' && !isHeaderVisible) {
                header.style.transform = 'translateY(0)';
                isHeaderVisible = true;
            }
        } else {
            header.style.transform = 'translateY(0)';
            isHeaderVisible = true;
        }

        lastScrollTop = scrollTop;
    }

    const headerStyles = `
        <style>
            header {
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                padding 0.3s ease,
                box-shadow 0.3s ease !important;
            }

            .logo img {
                transition: transform height 0.3s ease !important;
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', headerStyles);

    window.addEventListener('scroll', handleHeaderScroll);



    // Animação dos elementos ao rolar a página e visualizar as seções

    const observerOptions = {
        root: null, // Observa em relação ao viewport do navegador
        rootMargin: '0px',
        threshold: 0.1
    };

    // O callback que será executado sempre que um elemento observado entrar ou sair da tela.
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Verifica se o elemento está atualmente visível (intersecting)
            if (entry.isIntersecting) {
                // Adiciona a classe '.visible' para acionar a transição CSS
                entry.target.classList.add('visible');

                // --- Lógica extra para o contador animado ---
                // Se o elemento que se tornou visível for um número de estatística...
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }

                // Uma vez que a animação foi acionada, paramos de observar o elemento.
                // Isso é uma ótima prática para performance, pois o navegador não precisa mais
                // verificar a posição deste elemento.
                
            } // Caso a gente queira que a animação se repita quando visualizada outra vez, insira o código:
            // else {
            //    entry.target.classList.remove('visible');
            // }
        });
    };

    // Cria uma única instância do IntersectionObserver com nosso callback e opções.
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Seleciona TODOS os elementos que devem ser animados quando aparecerem na tela.
    // Usamos seletores genéricos para cobrir todas as seções de uma vez.
    const elementsToAnimate = document.querySelectorAll(`
        .section-header,
        .about-text .lead,
        .about-text .text-text,
        .stats,
        .about-image,
        .service-card,
        .approach-text h3,
        .approach-text .lead,
        .principle,
        .mosaic-representation,
        .contact-info h3,
        .contact-info p,
        .contact-details
    `);

    // Itera sobre cada elemento e pede ao observador para começar a "assistir" a ele.
    elementsToAnimate.forEach(el => observer.observe(el));


    // Animação dos contadores de números

    // Seleciona os elementos do contador para serem observados separadamente,
    // pois eles têm uma lógica de animação diferente (o número subindo).
    const statsCounters = document.querySelectorAll('.stat-number');
    statsCounters.forEach(counter => observer.observe(counter)); // Também os adicionamos ao observador

    // Função que anima um número de um ponto inicial até o valor final.
    const animateCounter = (element) => {
        const targetValue = parseInt(element.getAttribute('data-value'), 10);
        let currentValue = 0;
        const duration = 1500; // Duração da animação em milissegundos (1.5s)
        const stepTime = Math.abs(Math.floor(duration / targetValue));

        const timer = setInterval(() => {
            currentValue += 1;
            element.textContent = currentValue;
            if (currentValue === targetValue) {
                clearInterval(timer);
                // Adiciona o "+" se o valor original tiver
                if (element.dataset.value.includes('+')) {
                    element.textContent += '+';
                }
            }
        }, stepTime);
    };

    /* Menu Hamburger para dispositivos móveis */
    const menu = document.querySelector('.menu');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuLinks = document.querySelectorAll('.menu ul a');

    if (menu && menuToggle) { // <-- Adicionando uma verificação de segurança
        const toggleMenu = () => {
            menu.classList.toggle('active');
            const isExpanded = menu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        };

        menuToggle.addEventListener('click', toggleMenu);

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (menu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // Garante que o estado inicial do header seja verificado no carregamento da página
    // handleHeaderScroll(); // Certifique-se de que esta linha está presente e funcionando
    handleHeaderScroll();
});