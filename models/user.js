const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
const { billSchema } = require('./bill');
const { categorySchema } = require('./category');
const { eventSchema } = require('./event');

const userSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    bill: {
        type: billSchema,
        default: {
            value: 0,
            currency: "USD"
        }
    },
    categories: [categorySchema],
    events: [eventSchema]
});

const User = mongoose.model("User", userSchema);

function validateUser(userData) {
    const user = {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    };

    let result = Joi.validate(userData, user);
    let { error } =  result;

    return error;
}


module.exports = {
  User,
  validateUser
};