// Classe User representa um usuário cadastrado
class User {
    constructor(name, email, password) {
        this.name = name;         // Nome do usuário
        this.email = email;       // E-mail do usuário
        this.password = password; // Senha do usuário
    }
}

// Classe Auth gerencia o processo de login e cadastro
class Auth {
    constructor() {
        this.users = []; // Array para armazenar os usuários cadastrados
    }

    // Método para cadastrar um novo usuário
    registerUser(name, email, password, confirmPassword) {
        // Verifica se o e-mail já está registrado
        if (this.isEmailRegistered(email)) {
            this.showError('registerErrorMessage', 'E-mail já cadastrado.');
            return;
        }

        // Valida se as senhas coincidem
        if (!this.validatePassword(password, confirmPassword)) {
            this.showError('registerErrorMessage', 'As senhas não coincidem.');
            return;
        }

        // Cria um novo usuário e adiciona ao array de usuários
        const newUser = new User(name, email, password);
        this.users.push(newUser);
        this.showError('registerErrorMessage', ''); // Limpa as mensagens de erro
        $('#registerModal').modal('hide'); // Fecha o modal de cadastro
        alert('Cadastro realizado com sucesso!'); // Exibe um alerta de sucesso
    }

    // Método para realizar o login de um usuário
    loginUser(email, password) {
        // Busca o usuário no array de usuários cadastrados
        const user = this.users.find(user => user.email === email && user.password === password);
        if (user) {
            this.showError('errorMessage', ''); // Limpa mensagens de erro
            window.location.href = "main.html"; // Redireciona para a página principal
        } else {
            this.showError('errorMessage', 'E-mail ou senha incorretos.'); // Exibe mensagem de erro
        }
    }

    // Verifica se o e-mail já está registrado
    isEmailRegistered(email) {
        return this.users.some(user => user.email === email);
    }

    // Valida se a senha e a confirmação de senha são iguais
    validatePassword(password, confirmPassword) {
        return password === confirmPassword;
    }

    // Exibe uma mensagem de erro no formulário
    showError(elementId, message) {
        document.getElementById(elementId).textContent = message;
    }
}

// Instancia a classe Auth para ser usada no sistema
const auth = new Auth();

// Adiciona um listener para o formulário de login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Previne o comportamento padrão de submissão do formulário
    const email = document.getElementById('email').value; // Obtém o e-mail digitado
    const password = document.getElementById('password').value; // Obtém a senha digitada
    auth.loginUser(email, password); // Tenta realizar o login
});

// Adiciona um listener para o formulário de cadastro
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Previne o comportamento padrão de submissão do formulário
    const name = document.getElementById('name').value; // Obtém o nome digitado
    const email = document.getElementById('registerEmail').value; // Obtém o e-mail digitado
    const password = document.getElementById('registerPassword').value; // Obtém a senha digitada
    const confirmPassword = document.getElementById('confirmPassword').value; // Obtém a confirmação da senha
    auth.registerUser(name, email, password, confirmPassword); // Tenta cadastrar o usuário
});
