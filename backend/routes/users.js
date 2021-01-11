const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Get current User
// Called when getting sheet
router.get("/", auth, async (req, res) => {
    try {
        User.findById(res.user)
            .then(user => {
                res.json({
                    email: user.email,
                    id: user._id,
                    daily_sheets: user.daily_sheets
                });
            })
            .catch(err => {
                res.json('Error: ' + err);
            })
    }
    catch (err) {
        res.json('Error: ' + err);
    }
});

// Get All Users
router.route('/all').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Check Existing Email For Registration Purposes
router.route('/checkemail').post((req, res) => {
    User.findOne({email: req.body.email})
        .then(existingUser => {
            if (existingUser) {
                return res.json({msg: 'An account with this email already exists', value: -1});
            }
            else {
                return res.json({msg: 'email available', value: 0});
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add User (Register)
router.route('/add').post((req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password; // This password is already hashed
    
    const newUser = new User({
        email: email,
        password: password
    })

    newUser.save()
        .then(() => res.json('New User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.email = req.body.email;
            user.password = req.body.password;
            user.daily_sheets = req.body.daily_sheets;


            user.save()
                .then(() => res.json('User info updated.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

// Login
router.route('/login').post((req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.json({msg: "No account with this email has been found", value: -1});
            }
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            return res.json({msg: "Invalid password", value: 1})
                        }
                        else {
                            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
                            return res.json({
                                token: token,
                                user: {
                                    id: user._id,
                                    email: user.email,
                                },
                                value: 0
                            })
                        }
                    }
                )
                .catch(err => res.json('Error: ' + err))
            }
        })
        .catch (err => res.json('Error: ' + err))
})

// Something that requires auth
// Breaks without "aynsc" in 3rd param.
router.get("/history", auth, async (req, res) => {
    try {
        User.findById(res.user)
            .then(deletedUser => {
                res.json({msg: "found", user: res.user, value: deletedUser })
            });
    }
    catch (err) {
        res.status(500).json('Error: ' + err);
    }
})

// Update sheets
router.post("/updateSheets", auth, async (req, res) => {
    try {
        User.updateOne({_id: req.body.id}, {$set: {
            daily_sheets: req.body.daily_sheets
        }}, {upsert: true})
            .then(() => {
                res.json("User updated");
            })
            .catch(err => {
                res.status(400).json('Error: ' + err);
            })
    }
    catch (err) {
        res.status(500).json('Error: ' + err);
    }
});


// Returns boolean to check if token is valid
router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);

        User.findById(verified.id)
            .then(user => {
                if (!user) return res.json(false);
                return res.json(true);
            })
            .catch(() => {
                return res.json(false);
            })
    }
    catch (err) {
        res.status(500).json('Error: ' + err);
    }
})

module.exports = router;