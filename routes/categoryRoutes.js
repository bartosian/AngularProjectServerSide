const express = require('express');
const router  = express.Router();
const authToken = require('../middleware/auth');
const { User } = require('../models/user');
const { Category } = require('../models/category');

/* Get categories info */
router.get('/categories', authToken, async function(req, res, next) {
    const { _id } = req.user;

    try {
        const user = await User.findById(_id);
        let categories = [...user.categories];

        return res.status(200)
            .json({
                categories
            });
    } catch(ex) {
        return next(ex);
    }
});

/* Get category info */
router.get('/categories/:id', authToken, async function(req, res, next) {
    const userId = req.user._id;
    const  categoryId = req.params.id;

    try {
        const user = await User.findById(userId);
        const category = await user.categories.id(categoryId);

        return res.status(200)
            .json({
                category
            });
    } catch(ex) {
        return next(ex);
    }
});

/* Update category info */
router.put('/categories/:id', authToken, async function(req, res, next) {
    const userId = req.user._id;
    const  categoryId = req.params.id;
    const { name, capacity } = req.body;

    try {
        const user = await User.findById(userId);
        let category = await user.categories.id(categoryId);
        category.name = name;
        category.capacity = capacity;

        await user.save();

        return res.status(203)
            .json({
                category
            });
    } catch(ex) {
        return next(ex);
    }
});


/* Add new category */
router.post('/categories', authToken, async function(req, res, next) {
    const { _id } = req.user;
    const { name, capacity } = req.body;

    try {
        const user = await User.findById(_id);
        const newCategory = new Category({
            name,
            capacity
        });

        user.categories.push(newCategory);
        await user.save();

        const category = {
            name,
            capacity
        };

        return res.status(201)
            .json({
                category
            });
    } catch(ex) {
        return next(ex);
    }
});

module.exports = router;