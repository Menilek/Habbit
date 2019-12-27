const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route POST api/users
// desc Register user
// @access Public
router.post('/', (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({msg: 'Please complete all fields'});
    }
    
    User.findOne({email})
        .then(user => {
            if(user) {
                return res.status(400).json({msg: 'User already exists'});
            }

            const newUser = new User({
                name,
                email,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) { throw err; }
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id }, 
                                process.env.jwt_secret,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) { throw err; }
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                                )
                            })
                        })
                })
            })
        });

module.exports = router;