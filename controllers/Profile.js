const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

router.get('/:email', async (req, res) => {
    const profile = await Profile.findOne({email: req.params.email});
    res.send(profile);
});

module.exports = router;