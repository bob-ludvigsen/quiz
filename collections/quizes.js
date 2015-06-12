/**
 * Created by pfu on 27/05/14.
 */

Quizzes = new Meteor.Collection('quizzes');
Categories = new Meteor.Collection('categories');
Gamedata = new Meteor.Collection('gamedata');
Winlist = new Meteor.Collection('winlist');
Singleplayer = new Meteor.Collection('singleplayer');
//Users = new Meteor.Collection('users');
Items = new Mongo.Collection('items');
Uploads = new Mongo.Collection('uploads');

Uploads.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc, fields, modifier) {
        return true
    }
});
Gamedata.allow({
    insert: function(userId, file) {
        //console.log('Gamedata insert ' +userId);
        //return true;
        return !! userId;
    },
    update: function(userId, file, fields, modifier) {
        //console.log('Gamedata update ' + userId);
        //return true;
        return !! userId;
    },
    remove: function(userId, file) {
        //return true;
        return !! userId;
    }
});

Quizzes.allow({
    insert: function(userId, file) {
        //console.log('Quizzes insert ' +userId);
        //return true;
        return !! userId;
    },

    update: function(userId, file, fields, modifier) {
        //console.log('Quizzes update ' + userId);
        //return true;
        return !! userId;
    },
    remove: function(userId, file) {
        return true;
        return !! userId;
    }
});

