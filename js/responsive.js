// Script para melhorar a responsividade e experiência do usuário
document.addEventListener('DOMContentLoaded', function() {
    // Menu responsivo
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Header com efeito de scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Animação suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Detecção de dispositivo móvel para otimizações específicas
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Ajustes específicos para dispositivos móveis
        document.body.classList.add('mobile-device');
        
        // Ajustar altura do hero em dispositivos móveis
        const heroElements = document.querySelectorAll('.hero, .obra-hero');
        heroElements.forEach(hero => {
            hero.style.height = window.innerHeight * 0.9 + 'px';
        });
    }
    
    // Lazy loading para imagens
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    }
    
    // Melhorar desempenho de animações em dispositivos móveis
    if (isMobile) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!reducedMotion.matches) {
            document.body.classList.add('enable-animations');
        }
    } else {
        document.body.classList.add('enable-animations');
    }
    
    // Validação de formulário de newsletter
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                showFormError(emailInput, 'Por favor, insira um e-mail válido');
                return;
            }
            
            // Simulação de envio bem-sucedido
            this.innerHTML = '<p style="text-align: center; color: var(--dourado-fosco);">Obrigado por se inscrever! Em breve você receberá nossos conteúdos exclusivos.</p>';
        });
    });
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    function showFormError(inputElement, message) {
        // Remover mensagem de erro anterior, se existir
        const existingError = inputElement.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Criar e adicionar nova mensagem de erro
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#ff6b6b';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '0.5rem';
        errorElement.textContent = message;
        
        inputElement.parentElement.appendChild(errorElement);
        inputElement.style.borderColor = '#ff6b6b';
        
        // Remover mensagem de erro quando o usuário começar a digitar novamente
        inputElement.addEventListener('input', function() {
            const error = this.parentElement.querySelector('.error-message');
            if (error) {
                error.remove();
                this.style.borderColor = '';
            }
        }, { once: true });
    }
});
