CREATE DATABASE vale_das_artes;

CREATE TABLE artistas(
    id_artista INT PRIMARY KEY AUTO_INCREMENT,
    cpf_artista VARCHAR (100) NOT NULL UNIQUE,
    cnpj_artista VARCHAR(100) UNIQUE,
    telefone_artista VARCHAR (100) NOT NULL,
    nome_artista VARCHAR(100) NOT NULL,
    nome_empresa VARCHAR (100)
);

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
);

CREATE TABLE pedidos(
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    valor_total DECIMAL(10, 2) NOT NULL,
    status_pedido ENUM('pendente', 'pago', 'em_processamento', 'enviado', 'entregue', 'cancelado') NOT NULL DEFAULT 'pendente',
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    data_pagamento DATETIME,
    data_envio DATETIME
);

CREATE TABLE carrinho(
    id_carrinho INT PRIMARY KEY AUTO_INCREMENT,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status_carrinho ENUM('ativo', 'abandonado', 'finalizado') NOT NULL DEFAULT 'ativo'
);

CREATE TABLE avaliacao(
    id_avaliacao INT PRIMARY KEY AUTO_INCREMENT,
    nota DECIMAL (2,1) NOT NULL,
    comentario TEXT,
    data_avaliacao DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE produtos (
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR (100) NOT NULL
);

CREATE TABLE credenciais (
    id_credencial INT PRIMARY KEY AUTO_INCREMENT,
    email_credencial VARCHAR (100) NOT NULL UNIQUE,
    senha_credencial VARCHAR (100) NOT NULL
);

CREATE TABLE administradores (
    id_administrador INT PRIMARY KEY AUTO_INCREMENT,
    nome_administrador VARCHAR (100) NOT NULL,
    cpf_administrador VARCHAR(100) NOT NULL UNIQUE,
    telefone_administrador VARCHAR (100) NOT NULL,
    email_administrador VARCHAR (100) NOT NULL,
    senha_administrador VARCHAR (50) NOT NULL
);

CREATE TABLE user (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    email_cliente VARCHAR (100) NOT NULL,
    senha_cliente VARCHAR (50) NOT NULL,
    nome_cliente VARCHAR (100) NOT NULL,
    cpf_cliente VARCHAR (100) NOT NULL UNIQUE,
    telefone_cliente VARCHAR (100) NOT NULL
);

CREATE TABLE carteira (
    id_carteira INT PRIMARY KEY AUTO_INCREMENT,
    valor_carteira DECIMAL (10, 2) NOT NULL,
    cartao_carteira VARCHAR (16) NOT NULL UNIQUE
);

CREATE TABLE pagamentos (
    id_pagamento INT PRIMARY KEY AUTO_INCREMENT,
    data_pagamento DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    forma_pagamento VARCHAR(50) NOT NULL,
    valor_pagamento DECIMAL (10, 2) NOT NULL
);

CREATE TABLE cartao (
    id_cartao INT PRIMARY KEY AUTO_INCREMENT,
    token_cartao VARCHAR(255) NOT NULL UNIQUE,
    bandeira VARCHAR(50) NOT NULL,
    validade DATE NOT NULL
);

-- Tabela auxiliar, pois  um pedido pode conter vários produtos e um produto pode estar em vários pedidos
CREATE TABLE pedido_produtos (
    id_pedido_produto INT PRIMARY KEY AUTO_INCREMENT,
    quantidade INT NOT NULL
);
-- Tabela auxiliar, pois um carrinho pode conter vários produtos e um produto pode estar em vários carrinhos
CREATE TABLE carrinho_produtos (
    id_carrinho_produto INT PRIMARY KEY AUTO_INCREMENT,
    quantidade INT NOT NULL
);

-- Relacionamentos

ALTER TABLE administradores
ADD COLUMN id_endereco INT,
ADD COLUMN id_credencial INT UNIQUE,
ADD CONSTRAINT fk_administradores_endereco
    FOREIGN KEY (id_endereco) REFERENCES endereco(id_endereco),
ADD CONSTRAINT fk_administradores_credenciais  
    FOREIGN KEY (id_credencial) REFERENCES credenciais(id_credencial);
 
ALTER TABLE pedidos
ADD COLUMN id_cliente INT,  
ADD CONSTRAINT fk_pedido_cliente
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente);

ALTER TABLE carrinho 
ADD COLUMN id_cliente INT NOT NULL,
ADD CONSTRAINT fk_carrinho_cliente
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente);

ALTER TABLE avaliacao 
ADD COLUMN id_produto INT NOT NULL,
ADD COLUMN id_cliente INT NOT NULL,
ADD CONSTRAINT fk_avaliacao_produto
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto),
ADD CONSTRAINT fk_avaliacao_cliente
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente);

ALTER TABLE produtos
ADD COLUMN id_artista INT NOT NULL,
ADD CONSTRAINT fk_produto_artista
    FOREIGN KEY (id_artista) REFERENCES artistas(id_artista);

ALTER TABLE clientes
ADD COLUMN id_endereco INT,
ADD COLUMN id_credencial INT UNIQUE,
ADD CONSTRAINT fk_cliente_endereco
    FOREIGN KEY (id_endereco) REFERENCES endereco(id_endereco),
ADD CONSTRAINT fk_cliente_credenciais
    FOREIGN KEY (id_credencial) REFERENCES credenciais(id_credencial);

ALTER TABLE carteira
ADD COLUMN id_cliente INT NOT NULL, 
ADD CONSTRAINT fk_carteira_cliente
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente);

ALTER TABLE pagamentos
ADD COLUMN id_pedido INT NOT NULL,
ADD CONSTRAINT fk_pagamento_pedido
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido);

ALTER TABLE pedido_produtos
ADD COLUMN id_pedido INT NOT NULL,
ADD COLUMN id_produto INT NOT NULL,
ADD CONSTRAINT fk_pedido_produto_pedido
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),   
ADD CONSTRAINT fk_pedido_produto_produto
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto);

ALTER TABLE carrinho_produtos
ADD COLUMN id_carrinho INT NOT NULL,
ADD COLUMN id_produto INT NOT NULL,
ADD CONSTRAINT fk_carrinho_produto_carrinho
    FOREIGN KEY (id_carrinho) REFERENCES carrinho(id_carrinho),
ADD CONSTRAINT fk_carrinho_produto_produto
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto);

ALTER TABLE cartao
ADD COLUMN id_cliente INT NOT NULL,
ADD CONSTRAINT fk_cartao_cliente
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente);

ALTER TABLE pagamentos
ADD COLUMN id_cartao INT,
ADD CONSTRAINT fk_pagamento_cartao
    FOREIGN KEY (id_cartao) REFERENCES cartao(id_cartao);

