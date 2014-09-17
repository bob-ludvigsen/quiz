/**
 * Created by pfu on 21/08/14.
 */
Template.inviteplayer.helpers({
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
    invites: function () {
        var player = Meteor.userId();

        var myinvites = Gamedata.find({player2_id: player, pending: true}).fetch();
        //alert(myinvitations)
        return myinvites;


    }


});

Template.inviteplayer.events({
    'click .pickplayer': function (e, template) {
        console.log(this._id);
        e.preventDefault();
        var invitedId = this._id;
        Meteor.call('game', invitedId, function (error, id) {
            if (error)
                return alert(error.reason);
        })
    },
    'click #deleteinvitation': function (e, template) {
        //alert(this._id);
        Gamedata.remove({_id: this._id});
    },
    'click #acceptinvitation': function (e, template) {
        //alert(this._id);
        Gamedata.update({_id: this._id}, {
            $set: { pending: false, accepted: true }

        });
    }
});

