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
        try {

            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            user = new User({ name, email, password });
            const result = await user.save();

            if(result) {

                return res.status(201)
                    .json({
                       "message": "Successfully created user."
                    });
            }

        } catch(ex) {
            next(ex);
    }
});

/* Login User */
router.post('/login', async function(req, res, next)  {

    let { email, password } = req.body;

    let validateRes = validateUser({
        name:"Default",
        password,
        email
    });

    let errorMessage = null;

    if(validateRes) {
        errorMessage = validateRes.details[0].message;
        return res.status(400)
            .json({
                 errorMessage
            });
    }

    let user = await User.findOne({ email });

    if(!user) {

        errorMessage = "There isn't user with such email!";

        return res.status(200)
            .json({
                 errorMessage
            });

    } else {

        try {
            const resultCompare = await bcrypt.compare(password, user.password);

            if(resultCompare) {

                const authToken = user.generateToken();
                const { name, _id } = user;

                return res.status(200)
                    .json({
                        name,
                        _id,
                        authToken
                    });

            } else {
                errorMessage = "Incorrect password!";

                return res.status(200)
                    .json({
                        errorMessage
                    });
            }

        } catch(ex) {
            next(ex);
        }

    }

});

/* Check User email */
router.post('/valid', async function(req, res, next)  {

    let { email } = req.body;
    let user = await User.findOne({ email });

    if(!user) {
        return res.status(200).json();

    } else {
                return res.status(200)
                    .json(
                        user
                    );
        }

});


module.exports = router;
