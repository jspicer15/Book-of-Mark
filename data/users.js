const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require('node-uuid');
const passHash = require('password-hash');

var exportedMethods = {
    getUserById(id) {
        return users().then((userCollection) => {
            return userCollection.findOne({_id : id}).then((user) => {
                if (!user) throw "User Not Found";
                return user;
            });
        });
    },
    newUser(sid, password, username) {
            var newUser = {
                _id : uuid.v4(),
                sessionId : sid, 
                password : passHash.generate(password),
                bio : '',
                username : username
            };
            return users().then((userCollection) => {
                return userCollection.insertOne(newUser).then(() => {
                    return;
                });
            });
    },
    updateProfile(newProfile) {
        var password;
        var bio;
        return this.getUserById(newProfile._id).then((currentProfile) => {
            if (!newProfile.password) {
                password = currentProfile.password;
            } else {
                password = passHash.generate(newProfile.password);
            }
            if (!newProfile.bio) {
                bio = currentProfile.bio;
            } else {
                bio = newProfile.bio;
            }
            
            var updatedProfile = {
                _id : newProfile._id,
                sessionId : newProfile.sessionId,
                password : password,
                bio : bio,
                username : currentProfile.username
            };
            
            var updateCommand = {
                $set : updatedProfile
            };
            
            return users().then((userCollection) => {
                return userCollection.updateOne({_id : currentProfile._id}, updateCommand).then(() => {
                    return this.getUserById(currentProfile._id);
                });
            });
        });
    }
}

module.exports = exportedMethods;
