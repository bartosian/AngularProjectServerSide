const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const categorySchema = new Schema({
    name: {
        type: String
    },
    capacity: {
        type: Number
    }
});

const Category = mongoose.model("Category", categorySchema);

function validateCategory(categoryData) {
    const category = {
        name: Joi.string().required(),
        capacity: Joi.number().required()
    };

    let result = Joi.validate(categoryData, category);
    let { error } =  result;

    return error;
}


module.exports = {
    Category,
    validateCategory,
    categorySchema
};