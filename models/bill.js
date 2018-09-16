const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const billSchema = new Schema({
    value: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        default: "USD"
    }
});

const Bill = mongoose.model("Bill", billSchema);

function validateBill(billData) {
    const bill = {
        value: Joi.number(),
        currency: Joi.string()
    };

    let result = Joi.validate(billData, bill);
    let { error } =  result;

    return error;
}


module.exports = {
    Bill,
    validateBill,
    billSchema
};