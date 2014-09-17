/**
 * Created by pfu on 27/05/14.
 */

Quizzes = new Meteor.Collection('quizzes');
Categories = new Meteor.Collection('categories');
Gamedata = new Meteor.Collection('gamedata');



Gamedata.allow({
    insert: function(userId, file) {
        console.log(userId);
        //return true;
        return !! userId;
    },
    update: function(userId, file, fields, modifier) {
        console.log(userId);
        //return true;
        return !! userId;
    },
    remove: function(userId, file) {
        //return true;
        return !! userId;
    }
});