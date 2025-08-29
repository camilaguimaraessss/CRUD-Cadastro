import express from 'express';
import mysql from 'mysql2';
import path from 'path';

const app = express();
const port = 3022;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(process.cwd(), 'public')));

// Conexão com banco
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'crud',
    port: 3309,
    charset: 'utf8mb4'
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar no banco:", err);
    } else {
        console.log("Conectado ao banco com sucesso!");
    }
});

// Rotas
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'index.html'));
});

app.post('/cadastrar', (req, res) => {
    console.log('Dados recebidos:', req.body);
    
    const { nome, email, telefone } = req.body;

    if (!nome || !email || !telefone) {
        console.error('Dados incompletos:', req.body);
        return res.status(400).send('Por favor, preencha todos os campos.');
    }

    const sql = "INSERT INTO usuarios (nome, email, telefone) VALUES (?, ?, ?)";

    db.query(sql, [nome, email, telefone], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar:', err);
            return res.status(500).send('Erro ao cadastrar usuário.');
        }
        console.log('Usuário cadastrado com sucesso:', result);
        return res.redirect('/');
    });
});

app.get('/delete', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'delete.html'));
});

app.post('/delete', (req, res) => {
    console.log('Dados recebidos para delete:', req.body);
    
    const { nome } = req.body;

    if (!nome) {
        console.error('Nome não fornecido');
        return res.status(400).send('Nome é obrigatório para deletar.');
    }

    const sql = "DELETE FROM usuarios WHERE nome = ?";

    db.query(sql, [nome], (err, result) => {
        if (err) {
            console.error('Erro ao deletar:', err);
            return res.status(500).send('Erro ao deletar usuário.');
        }

        console.log(`Tentativa de deletar usuário: ${nome}`);
        console.log('Resultado:', result);

        if (result.affectedRows > 0) {
            console.log(`Usuário ${nome} deletado com sucesso.`);
        } else {
            console.log(`Nenhum usuário encontrado com nome: ${nome}`);
        }
        
        return res.redirect('/delete');
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});