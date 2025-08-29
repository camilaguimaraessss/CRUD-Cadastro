CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY UNIQUE,
    nome VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(14)
);

SELECT * FROM usuarios