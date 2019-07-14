const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const Users = require('../users/users-model.js');


function generateToken(user) {
    return jwt.sign({
        userId: user.id,    
    }, secrets.jwt, {
        expiresIn: '1h'
    })
}


// /api/auth/register

router.post('/register', async (req, res) => {
    try {
        const user = await Users.add(req.body);
        res.status(201).json(user)
    } catch(err) {
        res.status(500).json({ message: 'Error adding user' })
    }
  });
  


module.exports = router;