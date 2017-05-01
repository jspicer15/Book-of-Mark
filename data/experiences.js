const mongoCollections = require("../config/mongoCollections");
const experiences = mongoCollections.experiences;
const uuid = require('node-uuid');
const data = require('../data');
const categoryData = data.categories;

var exportedMethods = {
    getAllExperiences() {
        return experiences().then((expCollection) => {
            return expCollection.find({}).toArray();
        });
    }, 
    getExperienceById(id) {
        return experiences().then((expCollection) => {
            return expCollection.findOne({_id : id}).then((experience) => {
                if (!experience) throw "Experience Not Found";
                return experience;
            });
        });
    },
    newExperience(title, category, initReviewText, initReviewRating, initReviewTitle, dateOfExp, userId) {
        //categoryData.checkCatExists(category);
        var newExp = {
                _id: uuid.v4(), 
                name: title,
                category: category,
                addedOn: new Date().getTime(),
                reviews: {
                    _id: uuid.v4(),
                    user: userId,
                    text: initReviewText,
                    rating: initReviewRating,
                    title: initReviewTitle,
                    likes: 0,
                    createdOn: new Date().getTime(),
                    dateOf: dateOfExp
                }
        };
        return experiences().then((expCollection) => {
            return expCollection.insertOne(newExp).then(() => {
                console.log(newExp);
                return;
            });
        });
    }
}

module.exports = exportedMethods;