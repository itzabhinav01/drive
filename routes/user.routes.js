const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');//not bcryptjs, bcrypt is a library for hashing passwords

// GET route to render the registration form
router.get('/register', (req, res) => {
    res.render('register');  // Render the registration form (register.ejs)
});

// POST route to handle form submission and validation
router.post('/register', 
    // Validation checks
    body('email').trim().isEmail().isLength({ min: 13 }),
    body('password').trim().isLength({ min: 5 }),
    body('username').trim().isLength({ min: 3 }),
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid Data',
            });
        }

        // Extract the form data
        const { username, email, password } = req.body;

        const hashPassword = await bcrypt.hash(password, 10); // Hash the password with bcrypt
        
            // Create a new user (assuming userModel is set up for database interaction)
            const newUser = await userModel.create({
                username,
                email,
                password: hashPassword,
            });

           res.json(newUser);

        
    }
);

router.get('/login', (req, res) => {
    res.render('login');  // Render the login form (login.ejs)
});

router.post('/login',
    body('username').trim().isLength({ min: 3 }),
    body('password').trim().isLength({ min: 5 }),
    async (req,res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid Data',
            });
        }
        const { username, password } = req.body;

        const user = await userModel.findOne({
            username: username
        })

        if(!user){
            return res.status(404).json({
                message: 'Username or password is incorrect',
            });
        }

        const isMatch= await bcrypt.compare(password, user.password); // Compare the hashed password

        if(!isMatch){
            return res.status(404).json({
                message: 'Username or password is incorrect',
            });
        }

        


    }

)

module.exports = router;
