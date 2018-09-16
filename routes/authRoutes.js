const express = require('express');
const router  = express.Router();
const { User, validateUser } = require('../models/user');
const bcrypt = require('bcryptjs');

/* Create new User */
router.post('/signup', async function(req, res, next)  {

    let { name, email, password } = req.body;

    let validateRes = validateUser({
        name,
        password,
        email
    });

    let message = null;

    if(validateRes) {
        message = validateRes.details[0].message;
        return res.status(400)
            .json({
                "message": message
            });
    }
    //
    // let user = await User.findOne({ username });
    //
    // if(user) {
    //
    //     message = "User with this name already exists!";
    //
    //     return res.status(400)
    //         .render('passport/signup', {
    //             message,
    //             username,
    //             password
    //         });
    //
    // } else {

        try {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            user = new User({ name, email, password });
            const result = await user.save();

            if(result) {
                res.status(201)
                    .json({
                       "message": "Successfully created user."
                    });
            }

        } catch(ex) {
            next(ex);
    }
});

module.exports = router;
