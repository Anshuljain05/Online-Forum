const express = require("express");
const router = express.Router();
const Category = require('../models/Category');

router.post('/create', async (req, res) => {
    const {title} = req.body;
    const newCategory = Category({
        title,
        createdAt: Date.now()
    });

    await newCategory.save();
    res.send(newCategory);
});

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(404).send({
            message: 'Category not found'
        });
        return;
    }

    res.send(category);
})

router.get('/', async (req, res) => {
    const allCategories = await Category.find({});
    res.send(allCategories);
});

module.exports = router;