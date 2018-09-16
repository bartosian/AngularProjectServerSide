const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const eventSchema = new Schema({
    type: {
        type: String,
        enum: ['income','outcome']
    },
    amount: {
        type: Number,
        min: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    date: {
        type: String
    },
    description: {
        type: String,
        maxLength: 100
    }
});

const Event = mongoose.model("Event", eventSchema);

function validateEvent(eventData) {
    const event = {
        type: Joi.string().required(),
        amount: Joi.number().min(0).required(),
        category: Joi.string().required,
        date: Joi.string().required,
        description: Joi.string.max(100).required
    };

    let result = Joi.validate(eventData, event);
    let { error } =  result;

    return error;
}


module.exports = {
    Event,
    validateEvent,
    eventSchema
};