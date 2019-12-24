const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Entry = require('../../models/Entry');

// @route GET api/entries
// desc Get all entries
// @access Public
router.get('/', (req, res) => {
    Entry.find()
        .sort({ date: -1 })
        .then(entries => res.json(entries));
});


// @route POST api/entries
// desc Create an entry
// @access Private
router.post('/', auth, (req, res) => {
    const newEntry = new Entry({
        name: req.body.name 
    });
    newEntry.save()
        .then(entry => res.json(entry))
});

// @route DELETE api/entries/:id
// desc Delete an entry
// @access Private
router.delete('/:id', auth, (req, res) => {
    Entry.findById(req.params.id)
        .then(entry => {entry.remove().then(() => res.json({ success : true }))})
        .catch(err => { res.status(404).json({ success : false })})
});

module.exports = router;