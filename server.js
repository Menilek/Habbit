const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const entries = require('./routes/api/entries');

const app = express();
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

app.use('/api/entries', require('./routes/api/entries'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
