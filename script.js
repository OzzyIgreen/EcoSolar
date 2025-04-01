// Carrinho de compras
let carrinho = [];
let carrinhoContador = 0;

// Função para mostrar loading
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);
    
    setTimeout(() => {
        loading.remove();
    }, 500);
}

// Função para atualizar o contador do carrinho
function atualizarCarrinhoContador() {
    const contador = document.querySelector('.carrinho-contador');
    if (contador) {
        contador.textContent = carrinhoContador;
    }
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(nome, preco) {
    showLoading();
    
    carrinho.push({ nome, preco });
    carrinhoContador++;
    atualizarCarrinhoContador();
    
    // Animação do botão
    const btn = event.target;
    btn.textContent = '✓ Adicionado';
    btn.style.background = '#4CAF50';
    
    setTimeout(() => {
        btn.textContent = 'Comprar';
        btn.style.background = '#333';
    }, 1500);
}

// Filtrar produtos por categoria
function filtrarProdutos(categoria) {
    showLoading();
    
    const produtos = document.querySelectorAll('.produto');
    const botoes = document.querySelectorAll('.categorias button');
    
    // Remove classe active de todos os botões
    botoes.forEach(btn => btn.classList.remove('active'));
    
    // Adiciona classe active ao botão clicado
    event.target.classList.add('active');
    
    produtos.forEach(produto => {
        produto.style.opacity = '0';
        produto.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            if (categoria === 'todos' || produto.dataset.categoria === categoria) {
                produto.style.display = 'block';
                setTimeout(() => {
                    produto.style.opacity = '1';
                    produto.style.transform = 'translateY(0)';
                }, 50);
            } else {
                produto.style.display = 'none';
            }
        }, 300);
    });
}

// Mostrar carrinho
function mostrarCarrinho() {
    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    alert(`Carrinho de Compras:\n\n${carrinho.map(item => `${item.nome} - R$ ${item.preco.toFixed(2)}`).join('\n')}\n\nTotal: R$ ${total.toFixed(2)}`);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona efeito de fadeIn nos produtos
    const produtos = document.querySelectorAll('.produto');
    produtos.forEach((produto, index) => {
        produto.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Cria o ícone do carrinho
    const carrinhoIcon = document.createElement('div');
    carrinhoIcon.className = 'carrinho-icon';
    carrinhoIcon.innerHTML = `
        <span class="carrinho-contador">0</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
    `;
    carrinhoIcon.onclick = mostrarCarrinho;
    document.body.appendChild(carrinhoIcon);

    // Smooth scrolling para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animação de fade-in para elementos quando aparecem na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observa elementos para animação
    document.querySelectorAll('.service-card, .benefit-item, .contact-form, .contact-info').forEach((el) => {
        observer.observe(el);
    });

    // Validação e envio do formulário
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const phone = form.querySelector('input[type="tel"]').value;
            const message = form.querySelector('textarea').value;

            if (!name || !email || !phone || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            // Validação básica de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }

            // Validação básica de telefone
            const phoneRegex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/;
            if (!phoneRegex.test(phone)) {
                alert('Por favor, insira um telefone válido no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX');
                return;
            }

            // Simulação de envio
            const button = form.querySelector('button');
            button.disabled = true;
            button.textContent = 'Enviando...';

            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                form.reset();
                button.disabled = false;
                button.textContent = 'Enviar Mensagem';
            }, 1500);
        });
    }

    // Efeito parallax no hero
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });

    // Contador de números
    const startCounting = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const count = parseInt(element.innerText);
        const increment = target / 100;

        if (count < target) {
            element.innerText = Math.ceil(count + increment);
            setTimeout(() => startCounting(element), 20);
        } else {
            element.innerText = target;
        }
    };

    // Adiciona números aos benefícios quando visíveis
    const benefitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    counter.innerText = '0';
                    startCounting(counter);
                });
                benefitObserver.unobserve(entry.target);
            }
        });
    });

    const benefitsSection = document.querySelector('.benefits');
    if (benefitsSection) {
        benefitObserver.observe(benefitsSection);
    }
});
