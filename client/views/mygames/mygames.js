/**
 * Created by pfu on 21/08/14.
 */
Template.mygames.helpers({
    players: function () {

        var player = Meteor.users.find({}).fetch();

        return player;
    },
    invitations: function () {

        var player = Meteor.userId();

        //setInterval( function(){
        var myinvitations = Gamedata.find({player1_id: player}).fetch();

        return myinvitations;
        //}, 300 );

    },
    myself: function (userId) {
        return Meteor.userId() === userId;
    },
    myactivegames: function () {
        var player = Meteor.userId();

        var myinvites = Gamedata.find({
            $and: [
                {$or: [{player2_id: player}, {player1_id: player}]},
                {$or: [{accepted: true}]},
                {$or: [{finished: 0}]}

            ]
        }).fetch();

// itererer alle spil og deaktiverer alle der har været inaktive i 21 dage den spiller der har flest points vinner spillet

        var curdate = new Date().getTime();

        for (var key in myinvites) {
            if (myinvites.hasOwnProperty(key)) {
                var obj = myinvites[key];
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {

                        if (prop === 'update') {
                            var gamedate = obj['update'];
                            var diffDays = parseInt((curdate - gamedate) / (1000 * 60 * 60 * 24));
                            if(diffDays > 21){

                                var gameId = obj['_id'];
                                Gamedata.update({_id: gameId}, {$set: {finished: 1}});

                                var scorep1 = obj['scorep1'];
                                var scorep2 = obj['scorep2'];

                                if (scorep1 > scorep2) {

                                    // svnquiz er sat midlertidigt indtil hoved spil generatoren er implementeret
                                    var player_1 = obj['player1_id'];

                                    var player_2 = obj['player2_id'];

                                    Meteor.call('insertWinner', player_1, 'svnquiz');
                                }
                                else if (scorep2 > scorep1) {

                                    Meteor.call('insertWinner', player_2, 'svnquiz');
                                }


                            }
                            //console.log(prop + " = " + obj[prop]+ "  the id  " + obj['_id']);
                        }

                    }
                }
            }
        }

        return myinvites;


    }


});
Template.mygames.events({

    'click #playgame': function (e, template) {
        e.preventDefault();
        Session.set("playgame", this._id);
        Router.go('board');
    },
    'click .singleplayer': function (e, template) {
        //console.log(this._id);
        e.preventDefault();
        var invitedId = this._id;
        //alert('virker')
        Meteor.call('singlePlayer', invitedId, function (error, id) {
            if (error){
                return alert(error.reason);
            }
            else{
                //alert(id)
                Session.set("singleplayergame", id);
                Router.go('singleplayer');
            }
        })

    }
});

Template.mygameslist.helpers({
    curplayer: function () {

        var gameId = this._id;
        var griddata = Gamedata.findOne({_id: gameId});
        var playerTurn = griddata.turn;
        if (playerTurn === 0) {
            var pl1 = Gamedata.findOne({_id: gameId}, {fields: {player1: 1}});
            return pl1.player1;
        }
        else if (playerTurn === 1) {
            var pl2 = Gamedata.findOne({_id: gameId}, {fields: {player2: 1}});
            return pl2.player2;
        }


    }
});