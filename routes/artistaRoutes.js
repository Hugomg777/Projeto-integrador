// routes/artistas.js
const express = require('express');
const router = express.Router();
const Artista = require('../models/entidades/Artista');

router.get('/', async (req, res) => {
    try {
        const artistas = await Artista.findAll();
        res.json(artistas);
    } catch (error) {
        console.error("Erro ao buscar artistas:", error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar artistas.' });
    }
});

router.post('/', async (req, res) => {
    console.log('Requisição POST recebida na rota /api/artistas');
    try {
        
        const novoArtista = await Artista.create(req.body);
        res.status(201).json(novoArtista); 
    } catch (error) {
        
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({ errors }); 
        }
        console.error("Erro ao criar artista:", error);
        res.status(500).json({ error: 'Erro interno do servidor ao criar artista.' });
    }
});

module.exports = router;