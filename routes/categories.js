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
        categoryData.getAllExperiences().then((categoryList) => {
            console.log(categoryList);
            res.render('categories/categories_home', {categories : categoryList});
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
       categoryData.newCategory(postData.title, postData.parent, postData.description);
        res.redirect("/");
    }
    catch (err) {
        res.status(500).send('Server Error:' + err);
    }
});
module.exports = router;