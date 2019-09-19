const express = require('express');
const router = express.Router();

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
// @access Public
router.post('/', (req, res) => {
    const newEntry = new Entry({
        name: req.body.name 
    });
    newEntry.save()
        .then(entries => res.json(entries))
});

// @route DELETE api/entries/:id
// desc Delete an entry
// @access Public
router.delete('/:id', (req, res) => {
    Entry.findById(req.params.id)
        .then(entry => {entry.remove().then(() => res.json({ success : true }))})
        .catch(err => { res.status(404).json({ success : false })})
});

module.exports = router;