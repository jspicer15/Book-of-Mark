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
        experienceData.getAllExperiences().then((experienceList) => {
            console.log(experienceList);
            res.render('categories/categories_home', {experiences : experienceList});
        });
    }
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});

router.get("/add", (req, res) => {
    try {
        categoryData.getAllCategories().then((categoryList) => {
            console.log(categoryList);
            res.render('categories/add_category', {categories : categoryList});
        });
    }
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});

router.post("/", (req, res) => {
    var postData = req.body;
    try {
       categoryData.newCategory(postData.name, postData.parent, postData.description).then(() => {
           res.redirect("/");
       });
    }
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});
module.exports = router;