// config inicial
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// forma de ler JSON / middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rotas da API
const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes);

// rota inicial /endpoint
app.get('/', (req, res) => {
    // mostrar req

    res.json({ message: 'Oi Express' });
});

// entregar uma porta
const DB_USER = '???';
const DB_PASSWORD = encodeURIComponent('???');

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@api-cluster.gbookwh.mongodb.net/bancodaapi?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(3000);
        console.log('Conectamos ao MongoDB!');
    })
    .catch((err) => console.log(err));
