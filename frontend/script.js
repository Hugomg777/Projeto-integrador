// loja-artesanato/frontend/script.js

// Seleciona os elementos do DOM
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const loginMessage = document.getElementById('message');
const registerMessage = document.getElementById('registerMessage');

// --- Lógica para alternar entre formulários de Login e Cadastro ---
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault(); // Previne o comportamento padrão do link
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    loginMessage.textContent = ''; // Limpa mensagens anteriores
    registerMessage.textContent = '';
    loginForm.reset(); // Limpa o formulário de login
    registerForm.reset(); // Limpa o formulário de cadastro
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    loginMessage.textContent = '';
    registerMessage.textContent = '';
    loginForm.reset(); // Limpa o formulário de login
    registerForm.reset(); // Limpa o formulário de cadastro
});

// --- Lógica para o formulário de LOGIN (ainda não conectada ao backend) ---
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    loginMessage.textContent = 'Autenticando...';
    loginMessage.className = 'message'; // Limpa classes de status anteriores

    // --- AQUI VAI A REQUISIÇÃO DE LOGIN PARA O BACKEND (NO PRÓXIMO PASSO) ---
    console.log('Tentando login com:', { email, password });

    // A lógica de login real virá aqui, similar ao cadastro.
    // Por enquanto, apenas para demonstrar:
    setTimeout(() => {
        // loginMessage.textContent = 'Login (simulado) bem-sucedido!';
        // loginMessage.classList.add('success');
        // Ou
        // loginMessage.textContent = 'Login (simulado) falhou. Credenciais inválidas.';
        // loginMessage.classList.add('error');
    }, 1000);
});

// --- Lógica para o formulário de CADASTRO (AGORA CONECTADA AO BACKEND) ---
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = registerForm.name.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    registerMessage.textContent = 'Cadastrando...';
    registerMessage.className = 'message';

    try {
        const response = await fetch('http://localhost:3000/api/usuarios/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json(); 

        if (response.ok) { 
            registerMessage.textContent = data.message || 'Usuário cadastrado com sucesso!';
            registerMessage.classList.add('success');
            registerForm.reset(); 
            setTimeout(() => {
                showLoginLink.click(); // Simula um clique para voltar ao login
            }, 2000);

        } else { 
            registerMessage.textContent = data.message || 'Erro ao cadastrar. Tente novamente.';
            registerMessage.classList.add('error');
            console.error('Erro de cadastro:', data); 
        }

    } catch (error) {
        console.error('Erro de rede ou na requisição:', error);
        registerMessage.textContent = 'Erro de conexão. Verifique se o servidor está ativo.';
        registerMessage.classList.add('error');
    }
});