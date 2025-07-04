
CREATE TABLE IF NOT EXISTS type_classroom (
    id_type_classroom SERIAL PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);


CREATE TABLE IF NOT EXISTS classroom (
    id_classroom SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    capacidade INT NOT NULL,
    localizacao VARCHAR(100),
    id_type_classroom INT,
    FOREIGN KEY (id_type_classroom) REFERENCES type_classroom(id_type_classroom)
);


CREATE TABLE IF NOT EXISTS status_reservation (
    id_status SERIAL PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);


CREATE TABLE IF NOT EXISTS reservation (
    id_reservation SERIAL PRIMARY KEY,
    id_users UUID NOT NULL,
    id_classroom INT NOT NULL,
    data_reservation DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    id_status INT NOT NULL,
    FOREIGN KEY (id_users) REFERENCES auth.users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_classroom) REFERENCES classroom(id_classroom),
    FOREIGN KEY (id_status) REFERENCES status_reservation(id_status)
);


INSERT INTO type_classroom (descricao) VALUES
('Sala de Aula'),
('Laboratório'),
('Auditório');

INSERT INTO classroom (nome, capacidade, localizacao, id_type_classroom) VALUES
('Sala 101', 30, 'Prédio A', 1),
('Laboratório de Informática', 25, 'Prédio B', 2),
('Auditório Principal', 100, 'Prédio Central', 3);

INSERT INTO status_reservation (descricao) VALUES
('Pendente'),
('Aprovada'),
('Recusada');


INSERT INTO reservation (id_users, id_classroom, data_reservation, hora_inicio, hora_fim, id_status) VALUES
('0e3cd725-cecf-4456-b3aa-f647ff730c0e', 1, '2025-06-20'::DATE, '09:00'::TIME, '11:00'::TIME, 2),
('02bae703-1d06-424f-8e0e-e01e930a858e', 2, '2025-06-21'::DATE, '14:00'::TIME, '16:00'::TIME, 1),
('f111deac-7f4d-4ba1-a2d3-e00670089a31', 3, '2025-06-22'::DATE, '08:00'::TIME, '10:00'::TIME, 3);
