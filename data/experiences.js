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
                reviews: [{
                    _id: uuid.v4(),
                    user: userId,
                    text: initReviewText,
                    rating: initReviewRating,
                    title: initReviewTitle,
                    likes: 0,
                    createdOn: new Date().getTime(),
                    dateOf: dateOfExp
                }],
            likes: 0
        };
        return experiences().then((expCollection) => {
            return expCollection.insertOne(newExp).then(() => {
                console.log(newExp);
                return;
            });
        });
    },
    updateExperience(newExp) {
        return experiences().then((expCollection) => {
            return this.getExperienceById(newExp._id).then((oldExp) => {
            var name, category, addedOn, reviews, likes;
            
            if (newExp.name) 
                name = newExp.name;
            else
                name = oldExp.name;
            
            if (newExp.category)
                category = newExp.category;
            else
                category = oldExp.category;
            
            if (newExp.reviews)
                reviews = newExp.reviews;
            else
                reviews = oldExp.reviews;
			
            if (newExp.likes)
                likes = newExp.likes;
            else
                likes = oldExp.likes;
                
            var newExpData = {
				_id: oldExp._id,
				name: name,
				category: category,
				reviews: reviews,
				likes: likes
			}

            var updateCommand = {
                $set: newExpData
            };
            
            return expCollection.updateOne({_id: oldExp._id}, updateCommand).then((result) => {
                return this.getExperienceById(newExpData._id).then((result) => {
                    return result;
                    });
                });
            });
        });
    },
    
    getAllReviews(id) {
    return experiences().then((expCollection) => {
    return expCollection.findOne({_id : id}).then((experience) => {
        if (experience) {
  console.log(experience.reviews);
           return experience.reviews;
        } else {
            throw "Experience not found";
        }
    });
});
},
    getExperienceByCategory(category) {
        return experiences().then((expCollection) => {
            return expCollection.find({category : category}).toArray();
            });
        }
    }

module.exports = exportedMethods;