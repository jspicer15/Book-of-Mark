const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const data = require("../data");
const experienceData = data.experiences;
const categoryData = data.categories;

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get("/", (req, res) => {
    try {
            categoryData.getAllCategories().then((categoryList) => {

                res.render('experiences/add_exp', {categories : categoryList});
        }); 
    }
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});


router.get("/:experienceId", (req, res) => {
    try {
 experienceData.getAllReviews(req.params.experienceId).then((reviews) => {
  experienceData.getExperienceById(req.params.experienceId).then((experience) => {
      console.log(experience);
            res.render('experiences/single_exp', {experience: experience, reviews: reviews});
        });
    }); 
    }
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});

router.get("/:experienceId/upvote", (req, res) => {
    try {
        experienceData.getExperienceById(req.params.experienceId).then((experience) => {
            var likes = experience.likes + 1;
        var upvoted = {
            _id: experience._id,
            name: experience.name,
            category: experience.category,
            addedOn: experience.addedOn,
            reviews: experience.reviews,
            likes: likes
        };
            experienceData.updateExperience(upvoted).then((result) => {
                return result;
            });
        });
        res.redirect('/experience/' + req.params.experienceId);
    }
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});

router.get("/:experienceId/downvote", (req, res) => {
    try {
        experienceData.getExperienceById(req.params.experienceId).then((experience) => {
       var likes = experience.likes - 1;
        var upvoted = {
            _id: experience._id,
            name: experience.name,
            category: experience.category,
            addedOn: experience.addedOn,
            reviews: experience.reviews,
            likes: likes
        };
            experienceData.updateExperience(upvoted).then((result) => {
                return result;
            });
        });
        res.redirect('/experience/' + req.params.experienceId);
    }
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});

router.post("/add", (req, res) => {
    var postData = req.body;
    var id = postData.id;
    try {
        experienceData.newExperience(postData.title, postData.categories, postData.review_text, postData.rating, postData.review_title,   postData.review_date, postData.id);
        res.redirect("/experience");
}
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});

module.exports = router;