/**
 * Created by pfu on 21/08/14.
 */
Template.mygames.helpers({
    players: function () {

        var player = Meteor.users.find({}).fetch();

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
                    { $or: [ {accepted: true} ] },
                    { $or: [ {finished: 0} ] }

        ]}).fetch();

        //alert( myinvites.length);
           // Gamedata.find({player2_id: player, pending: true}).fetch();
        //alert(myinvitations)
        return myinvites;


    }




});
Template.mygames.events({

    'click #playgame': function (e, template) {
        e.preventDefault();
        //console.log(this._id)
        Session.set("playgame", this._id);
        Router.go('board');
    }
});

Template.mygameslist.helpers({
    curplayer: function(){

        var gameId = this._id;
        var griddata = Gamedata.findOne({_id: gameId});
        var playerTurn = griddata.turn;
        if(playerTurn === 0){
            var pl1 = Gamedata.findOne({_id: gameId}, {fields: {player1: 1}});
            return pl1.player1;
        }
        else if(playerTurn === 1){
            var pl2 = Gamedata.findOne({_id: gameId}, {fields: {player2: 1}});
            return pl2.player2;
        }


    }
});