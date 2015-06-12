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
Meteor.publish('singleplayer', function(){
    return Singleplayer.find();

});

Meteor.publish('users', function(){
    return users.find();

});
Meteor.publish('roles', function (){
    return Meteor.roles.find({});
});

Meteor.publish("directory", function () {
    return Meteor.users.find({}, {fields: {username :1, emails: 1, profile: 1, svnquiz:1}});
});

Meteor.publish('filteredUsers', function(filter) {
    return filteredUserQuery(this.userId, filter);
});
Meteor.publish('items', function() {
    return Items.find();
});

Meteor.publish('uploads', function() {
    return Uploads.find();
})