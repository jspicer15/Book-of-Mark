const mongoCollections = require("../config/mongoCollections");
const terms = mongoCollections.terms;
const uuid = require('node-uuid');

var exportedMethods = {
    getAllTerms() {
        return terms().then((termCollection) => {
            return termCollection.find({}).toArray();
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