const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const PORT = process.env.PORT;

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'alex',
        password : 'aoaft',
        database : 'face-recognition'
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('success'));
app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db));

// app.post('/signin', (req, res) => signIn.handleSignIn(req, res, db, bcrypt));
app.post('/signin', signIn.handleSignIn(db, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.put('/image', (req, res) => image.handleImage(req, res, db));

app.listen(PORT || 3000, () => console.log(`Running on port ${PORT || 3000}`));
