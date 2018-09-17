const express = require('express');
const router  = express.Router();
const authToken = require('../middleware/auth');
const { User } = require('../models/user');
const { Event } = require('../models/event');


/* Get events info */
router.get('/events', authToken, async function(req, res, next) {
    const { _id } = req.user;

    try {
        const user = await User.findById(_id);
        let events = user.events;


        return res.status(200)
            .json(
                events
            );
    } catch(ex) {
        return next(ex);
    }
});

/* Get event info */
router.get('/events/:id', authToken, async function(req, res, next) {
    const userId = req.user._id;
    const  eventId = req.params.id;

    try {
        const user = await User.findById(userId);
       const event = await user.events.id(eventId);
        return res.status(200)
            .json(
                event
            );
    } catch(ex) {
        return next(ex);
    }
});


/* Add new event */
router.post('/events', authToken, async function(req, res, next) {
    const { _id } = req.user;
    let { type, amount,  date, description } = req.body;

    try {
        const user = await User.findById(_id);
        const newEvent = new Event({
            type,
            amount,
            category : "5b9fc56b8f38f52daa7a0296",
            date,
            description
        });

        user.events.push(newEvent);
        await user.save();

        return res.status(201)
            .json({
                "message": "Event was added successfully!"
            });
    } catch(ex) {
        return next(ex);
    }
});

module.exports = router;