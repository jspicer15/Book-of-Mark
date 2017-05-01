const mongoCollections = require("../config/mongoCollections");
const experiences = mongoCollections.experiences;
const uuid = require('node-uuid');
const data = require('../data');
const experienceData = data.experiences;

var exportedMethods = {
    getAllTerms() {
        return experiences().then((experienceCollectino) => {
            return experienceCollection.find({}).toArray();
        });
    }, 
    newTerm(term, bool) {
        if (bool) {
            var newTerm = {
                term: term, 
                isPalindrome: "is-palindrome"
            };
            return terms().then((termCollection) => {
                return termCollection.insertOne(newTerm).then(() => {
                    return;
                });
            });
        }
        else {
            var newTerm = {
                term: term, 
                isPalindrome: "not-palindrome"
            };
            return terms().then((termCollection) => {
                return termCollection.insertOne(newTerm).then(() => {
                    return;
                });
            });
        }
    }
}

module.exports = exportedMethods;