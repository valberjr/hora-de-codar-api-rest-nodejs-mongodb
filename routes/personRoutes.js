const router = require('express').Router();

const Person = require('../models/Person');

// Create - criação de dados
router.post('/', async (req, res) => {
    // req.body
    const { name, salary, approved } = req.body;

    const person = { name, salary, approved };

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório' });
        return;
    }

    // create
    try {
        // criando dados
        await Person.create(person);

        res.status(201).json({
            message: 'Pessoa inserida no sistema com sucesso!',
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// READ - leitura de dados
router.get('/', async (req, res) => {
    try {
        const people = await Person.find();

        res.status(200).json(people);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', async (req, res) => {
    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id;

    try {
        const person = await Person.findOne({ _id: id });

        if (!person) {
            res.status(404).json({ error: 'Pessoa não encontrada' });
            return;
        }

        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;
