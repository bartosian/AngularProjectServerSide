const express = require('express');
const router  = express.Router();
const authToken = require('../middleware/auth');
const { User } = require('../models/user');

/* Get bill info */
router.get('/bill', authToken, async function(req, res, next) {
    const { _id } = req.user;

    try {
        const user = await User.findById(_id);
        const { value, currency } = user.bill;
        const bill = { value, currency };


        return res.status(200)
            .json({
                ...bill
            });
    } catch(ex) {
        return next(ex);
    }
});


/* Update bill info */
router.put('/bill', authToken, async function(req, res, next) {
    const { _id } = req.user;
    const { value } = req.body;

    try {
        const user = await User.findById(_id);
        user.bill.value = +value;

        await user.save();

        return res.status(203)
            .json({
                "message": "Bill was updated successfully!"
            });
    } catch(ex) {
        return next(ex);
    }
});

module.exports = router;