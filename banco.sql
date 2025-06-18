CREATE DATABASE vale_das_artes;

CREATE TABLE artistas(
    id_artista INT PRIMARY KEY AUTO_INCREMENT,
    cpf_artista VARCHAR (100) NOT NULL,
    cnpj_artista VARCHAR(100),
    telefone_artista VARCHAR (100) NOT NULL,
    nome_artista VARCHAR(100) NOT NULL,
    nome_empresa VARCHAR (100),
)

CREATE TABLE endereco(
    id_endereco INT PRIMARY KEY AUTO_INCREMENT,
    logadouro VARCHAR (100) NOT NULL,
    complemento VARCHAR (100) NOT NULL,
    telefone VARCHAR (100) NOT NULL,
    numero INT NOT NULL,
    bairro VARCHAR (100) NOT NULL,
    cidade VARCHAR (100) NOT NULL,
    estado VARCHAR (100) NOT NULL,
    cep VARCHAR (100) NOT NULL
)

CREATE TABLE pedido(
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    valor_total DECIMAL(10, 2) NOT NULL,
    status_pedido VARCHAR (100) ENUM('pendente', 'pago', 'em_processamento', 'enviado', 'entregue', 'cancelado') NOT NULL DEFAULT 'pendente',
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    data_pagamento DATATIME NOT NULL,
    data_envio DATATIME NOT NULL
)

CREATE TABLE carrinho(
    id_carrinho INT PRIMARY KEY AUTO_INCREMENT,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status_carrinho ENUM('ativo', 'abandonado', 'finalizado') NOT NULL DEFAULT 'ativo'
)

CREATE TABLE avalicao(
    id_avaliacao INT PRIMARY KEY AUTO_INCREMENT,
    nota DECIMAL (2,1) NOT NULL,
    comentario TEXT,
    data_avaliacao DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
)

CREATE TABLE produto (
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR (100) NOT NULL
)

CREATE TABLE credenciais (
    id_credencial INT PRIMARY KEY AUTO_INCREMENT,
    email_credencial VARCHAR (100) NOT NULL,
    senha_credencial VARCHAR (100) NOT NULL
)

CREATE TABLE administradores (
    id_administrador INT PRIMARY KEY AUTO_INCREMENT,
    nome_administrador VARCHAR (100) NOT NULL,
    cpf_administrador VARCHAR(100) NOT NULL,
    telefone_administrador VARCHAR (100) NOT NULL
)

CREATE TABLE cliente (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nome_cliente VARCHAR (100) NOT NULL,
    cpf_cliente VARCHAR (100) NOT NULL,
    telefone_cliente VARCHAR (100) NOT NULL
)

CREATE TABLE carteira (
    id_carteira INT PRIMARY KEY AUTO_INCREMENT,
    valor_carteira DECIMAL (10, 2) NOT NULL,
    cartao_carteira VARCHAR (16) UNIQUE NOT NULL
)

CREATE TABLE pagamento (
    id_pagamento INT PRIMARY KEY AUTO_INCREMENT,
    data_pagamento DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    forma_pagamento VARCHAR(50) NOT NULL,
    valor_pagamento DECIMAL (10, 2) NOT NULL
)

