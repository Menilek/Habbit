const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

const prodDB = process.env.MONGODB_URI;
const devDB = process.env.mongoURI;

mongoose
    .connect(prodDB || devDB, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.use('/api/entries', require('./routes/api/entries'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));