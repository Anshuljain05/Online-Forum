const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

router.get('/:email', async (req, res) => {
    const profile = await Profile.findOne({email: req.params.email});
    res.send(profile);
});

router.post('/update', async (req, res) => {
    const {email, firstName, lastName, college, branch, specialization, batch} = req.body;
    const updateData = {
        firstName,
        lastName,
        college,
        branch,
        specialization,
        batch,
        updatedAt: Date.now(),
    };
    try {
        const updatedProfile = await Profile.findOneAndUpdate(
            { email: email }, // find a document with that filter
            updateData, // document to insert when nothing was found
            { new: true, upsert: false, runValidators: true }, // options
        )
        res.sendStatus(200).json(updatedProfile); // respond with the updated document
    } catch (err) {
        res.sendStatus(400).json({ error: err.message });
    }
});

module.exports = router;