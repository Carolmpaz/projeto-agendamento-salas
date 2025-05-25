-- Tabela type_classroom
CREATE TABLE type_classroom (
    id_type_classroom SERIAL PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);

-- Tabela classroom
CREATE TABLE classroom (
    id_classroom SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    capacidade INT NOT NULL,
    localizacao VARCHAR(100),
    id_type_classroom INT,
    FOREIGN KEY (id_type_classroom) REFERENCES type_classroom(id_type_classroom)
);

-- Tabela users
CREATE TABLE users (
    id_users SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- Tabela status_reservation
CREATE TABLE status_reservation (
    id_status SERIAL PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);

-- Tabela reservation
CREATE TABLE reservation (
    id_reservation SERIAL PRIMARY KEY,
    id_users INT NOT NULL,
    id_classroom INT NOT NULL,
    data_reservation DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    id_status INT NOT NULL,
    FOREIGN KEY (id_users) REFERENCES users(id_users),
    FOREIGN KEY (id_classroom) REFERENCES classroom(id_classroom),
    FOREIGN KEY (id_status) REFERENCES status_reservation(id_status)
);
