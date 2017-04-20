const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const data = require("../data");
const experienceData = data.experiences;

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get("/", (req, res) => {
    try {
            res.render('experiences/add_exp', {experiences : experienceData.getAllExperiences()});
    }
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});


router.get("/:experienceId", (req, res) => {
    try {
            res.render('experiences/singleExp', {experience: experienceData.getExperienceById(req.params.experienceId)});
    }
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});

router.post("/add", (req, res) => {
    return;
});

module.exports = router;