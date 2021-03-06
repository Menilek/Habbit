const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

mongoose
    .connect(process.env.MongoDB_URI, {useNewUrlParser: true, 'useCreateIndex': true})
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

app.use('/api/entries', require('./routes/api/entries'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

if(process.env.NODE_ENV === 'production'){
    
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));