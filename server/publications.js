/**
 * Created by pfu on 03/07/14.
 */
Meteor.publish('quizzes', function(){
   return Quizzes.find();

});

Meteor.publish('categories', function(){
    return Categories.find();

});

Meteor.publish('gamedata', function(){
    return Gamedata.find();

});

Meteor.publish('users', function(){
    return users.find();

});

Meteor.publish("directory", function () {
    return Meteor.users.find({}, {fields: {username :1, emails: 1, profile: 1}});
});