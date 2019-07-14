const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js');
const bucketlistRouter = require('../bucketlist/bucketlist-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/home', bucketlistRouter);
server.use('/users', usersRouter);


server.get('/', (req, res) => {
    res.send('I am alive!! :D')
});


module.exports = server;