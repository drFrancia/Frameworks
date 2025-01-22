const express = require('express');
const Link = require('../models/Link');
const router = express.Router();

// Crear un enlace
router.post('/', async (req, res) => {
    try {
        const { url, tags } = req.body;
        if (!url || !tags) throw new Error('URL y tags son obligatorios');
        const link = new Link({ url, tags });
        await link.save();
        res.status(201).json(link);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todos los enlaces
router.get('/', async (req, res) => {
    try {
        const links = await Link.find();
        res.json(links);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener enlaces' });
    }
});

// Buscar enlaces por tags
router.get('/search', async (req, res) => {
    try {
        const { tag } = req.query;
        const links = await Link.find({ tags: tag });
        res.json(links);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar enlaces' });
    }
});

// Votar por un enlace
router.patch('/:id/vote', async (req, res) => {
    try {
        const { id } = req.params;
        const link = await Link.findById(id);
        if (!link) throw new Error('Enlace no encontrado');
        link.votes += 1;
        await link.save();
        res.json(link);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Agregar comentario
router.post('/:id/comment', async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const link = await Link.findById(id);
        if (!link) throw new Error('Enlace no encontrado');
        link.comments.push(comment);
        await link.save();
        res.json(link);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
