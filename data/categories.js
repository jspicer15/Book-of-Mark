const mongoCollections = require("../config/mongoCollections");
const categories = mongoCollections.categories;
const uuid = require('node-uuid');
const data = require('../data');
const experienceData = data.experiences;

var exportedMethods = {
    getAllCategories() {
        return categories().then((categoryCollection) => {
            return categoryCollection.find({}).toArray();
        });
    }, 
    newCategory(name, parent, description) {
            if (!parent) {
                parent = null;
            }
            var newCat = {
                _id: uuid.v4(), 
                name: name,
                parent: parent,
                desc: description
            };
            return categories().then((categoryCollection) => {
                return categoryCollection.insertOne(newCat).then(() => {
                    return;
                });
            });
    }
}

module.exports = exportedMethods;