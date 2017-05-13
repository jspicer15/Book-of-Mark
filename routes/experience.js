const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const data = require("../data");
const experienceData = data.experiences;
const categoryData = data.categories;
const uuid = require('node-uuid');

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

router.post("/:experienceId/add_review", (req, res) => {
    try {
        var postData = req.body;
        
        experienceData.getExperienceById(req.params.experienceId).then((experience) => {
        var newReview = {
            _id: uuid.v4(),
            user: "",
            text: postData.review_text,
            rating: postData.rating,
            title: postData.review_title,
            likes: 0,
            createdOn: new Date().getTime(),
            dateOf: postData.review_date 
        };
        
        var reviews = experience.reviews;
        reviews.push(newReview);
        var newData = {
            _id: experience._id,
            name: experience.name,
            category: experience.category,
            addedOn: experience.addedOn,
            reviews: reviews,
            likes: experience.likes
        };
            console.log(newData);
            experienceData.updateExperience(newData).then((result) => {
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
    var id = req.user._id;
    try {
        experienceData.newExperience(postData.title, postData.categories, postData.review_text, postData.rating, postData.review_title,   postData.review_date, id);
        res.redirect("/experience");
}
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});

module.exports = router;