const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use (bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({ 
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud',
    port: '3309'
});

app.get('/', (req, res) =>{
    res.sendFile(process.cwd() + "/index.html")
})

app.post('/cadastrar', (req, res) => {
    const { nome, email, telefone} = req.body;

    const sql = "INSERT INTO usuarios (nome, email, telefone) VALUES (?, ?, ?)";
    db.query(sql, [nome, email, telefone], (err, result) => {
        if(err) throw err;
        res.send("Usuário cadastrado com sucesso!");
    });
});

app.get('/deletar', (req, res) =>{
    res.sendFile(process.cwd() + "/delete.html")
})


app.post('/deletar', (req, res) => {
    const{ nome } = req.body;

    const sql = "DELETE FROM usuarios WHERE nome = ?";
    db.query(sql, [nome], (err, result) =>{
        if(err) throw err;
        if (result.affectedRows > 0) {
            res.send(`Usuário ${nome} deletado com sucesso!`);
        } else {
            res.send(`Nenhum usuário encontrado com o nome ${nome}.`);
        }
    });
});

app.listen(3010, () => {
    console.log(`O servidor está ativo em http://localhost:3010`);
});