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
            res.render('experiences/add_exp');
    }
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});


router.get("/:experienceId", (req, res) => {
    try {
        experienceData.getExperienceById(req.params.experienceId).then((experience) => {
            res.render('experiences/single_exp', {experience: experience});
        });
    }
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});

router.post("/add", (req, res) => {
    var postData = req.body;
    var id = postData.id;
    try {
        experienceData.newExperience(postData.title, postData.categories, postData.review_title, postData.review_text, postData.rating, postData.review_date, postData.id);
        res.redirect("/experience");
}
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});
module.exports = router;