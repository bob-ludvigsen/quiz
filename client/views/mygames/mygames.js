/**
 * Created by pfu on 21/08/14.
 */
Template.mygames.helpers({
    players: function () {

        var player = Meteor.users.find({}).fetch();
        //Meteor.user().emails[0].address
        //console.log(player[0].emails[0].address);
        return player;
    },
    invitations: function () {
        //alert(Meteor.user()._id);
        var player = Meteor.userId();
        //console.log(player);
        //setInterval( function(){
        var myinvitations = Gamedata.find({player1_id: player}).fetch();
        //alert(myinvitations)
        return myinvitations;
        //}, 300 );
        //alert(Gamedata.find({player1_id: Meteor.user()}).fetch())


    },
    myself: function (userId) {
        return Meteor.userId() === userId;
    },
    myactivegames: function () {
        var player = Meteor.userId();

        var myinvites = Gamedata.find({
            $and : [
                    { $or: [ { player2_id: player }, { player1_id: player } ] },
                    { $or: [ {accepted: true} ] }

        ]}).fetch();
           // Gamedata.find({player2_id: player, pending: true}).fetch();
        //alert(myinvitations)
        return myinvites;


    }


});
Template.mygames.events({

    'click #playgame': function (e, template) {
        e.preventDefault();
        console.log(this._id)
        Session.set("playgame", this._id);
        Router.go('board');
    }
});
