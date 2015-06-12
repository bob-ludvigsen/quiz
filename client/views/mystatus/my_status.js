/**
 * Created by pfu on 21/08/14.
 */

Template.mystatus.helpers({

    myself: function (userId) {
        return Meteor.userId() === userId;
    },
    myStats: function () {
        var player = Meteor.userId();

        var myFinishedGames = Gamedata.find({
            $and: [
                {$or: [{player2_id: player}, {player1_id: player}]},
                {$or: [{finished: 1}]}
            ]
        }).fetch();

        //alert( myinvites.length);
        // Gamedata.find({player2_id: player, pending: true}).fetch();
        //alert(myinvitations)
        return myFinishedGames;


    },
    numOfWins: function () {
        //var countArr = [];
        var player = Meteor.userId();
        var gameId = this._id;

        var count1 = Gamedata.find({player1_id: player, finished: 1, $where: "this.scorep2 < this.scorep1"}).count();

        var count2 = Gamedata.find({player2_id: player, finished: 1, $where: "this.scorep2 > this.scorep1"}).count();

        //alert(count1)
        return count1 + count2;


    },
    numOfGames: function () {

        var player = Meteor.userId();

        var myFinishedGames = Gamedata.find({
            $and: [
                {$or: [{player2_id: player}, {player1_id: player}]},
                {$or: [{finished: 1}]}
            ]
        }).count();

        return myFinishedGames;

    },
    myStatus: function () {
        //var countArr = [];
        /*var player = Meteor.userId();
        var gameId = this._id;

        var count1 = Gamedata.find({player1_id: player, finished: 1, $where: "this.scorep2 < this.scorep1"}).count();

        var count2 = Gamedata.find({player2_id: player, finished: 1, $where: "this.scorep2 > this.scorep1"}).count();


        //alert(count1)
        var wins = count1 + count2;
        setInterval( function(){



        if (wins < 10) {

           var att = $(".Floater").attr("src");
            //alert(att)
            att = att.replace("levelOFF.png", "levelON.png");
            $('.Floater').attr("src", att);

            return ' Floater';
        }
        else if (wins >= 10 && wins < 20) {
            var att = $(".Sailor").attr("src");
            att = att.replace("levelOFF.png", "levelON.png");
            $('.Sailor').attr("src", att);
            return ' Sailor';
        }
        else if (wins >= 20 && wins < 30) {
            var att = $(".Fighter").attr("src");
            att = att.replace("levelOFF.png", "levelON.png");
            $('.Fighter').attr("src", att);
            return ' Fighter';
        }
        else if (wins >= 30 && wins < 40) {
            var att = $(".Captain").attr("src");
            att = att.replace("levelOFF.png", "levelON.png");
            $('.Captain').attr("src", att);
            return ' Captain';
        }
        else if (wins >= 40 && wins < 50) {
            var att = $(".Admiral").attr("src");
            att = att.replace("levelOFF.png", "levelON.png");
            $('.Admiral').attr("src", att);
            return ' Admiral';
        }
        }, 300 );*/

    },
    winsToLevelUp: function () {
        //var countArr = [];
        var player = Meteor.userId();
        var gameId = this._id;

        //alert(player)

        var count1 = Gamedata.find({player1_id: player, finished: 1, $where: "this.scorep2 < this.scorep1"}).count();

        var count2 = Gamedata.find({player2_id: player, finished: 1, $where: "this.scorep2 > this.scorep1"}).count();


        //alert(count1)
        var wins = count1 + count2;


        if (wins <= 10) {
            return 10 - wins + ' wins to level up to Sailor';

        }
        else if (wins <= 20) {
            return ' Sailor';
        }
        else if (wins <= 30) {
            return ' Fighter';
        }
        else if (wins <= 40) {
            return ' Captain';
        }
        else if (wins <= 60) {
            return ' Admiral';
        }


    }




});

Template.mystatus.rendered = function () {

    var player = Meteor.userId();
    var gameId = this._id;

    var count1 = Gamedata.find({player1_id: player, finished: 1, $where: "this.scorep2 < this.scorep1"}).count();

    var count2 = Gamedata.find({player2_id: player, finished: 1, $where: "this.scorep2 > this.scorep1"}).count();



    var wins = count1 + count2;

    if (wins < 10) {

        var att = $(".Floater").attr("src");
        //alert(att)
        att = att.replace("levelOFF.png", "levelON.png");
        $('.Floater').attr("src", att);

        return ' Floater';
    }
    else if (wins >= 10 && wins < 20) {
        var att = $(".Sailor").attr("src");
        att = att.replace("levelOFF.png", "levelON.png");
        $('.Sailor').attr("src", att);
        return ' Sailor';
    }
    else if (wins >= 20 && wins < 30) {
        var att = $(".Fighter").attr("src");
        att = att.replace("levelOFF.png", "levelON.png");
        $('.Fighter').attr("src", att);
        return ' Fighter';
    }
    else if (wins >= 30 && wins < 40) {
        var att = $(".Captain").attr("src");
        att = att.replace("levelOFF.png", "levelON.png");
        $('.Captain').attr("src", att);
        return ' Captain';
    }
    else if (wins >= 40 && wins < 50) {
        var att = $(".Admiral").attr("src");
        att = att.replace("levelOFF.png", "levelON.png");
        $('.Admiral').attr("src", att);
        return ' Admiral';
    }

}

Template.mystatuslist.helpers({

    winner: function () {
        var gameId = this._id;
        var griddata = Gamedata.findOne({_id: gameId, finished: 1});

        var scoreP1 = griddata.scorep1;
        var scoreP2 = griddata.scorep2;

        if (scoreP1 > scoreP2) {

            var pl1 = Gamedata.findOne({_id: gameId}, {fields: {player1: 1}});
            return pl1.player1;
        }
        else if (scoreP1 < scoreP2) {
            var pl2 = Gamedata.findOne({_id: gameId}, {fields: {player2: 1}});
            return pl2.player2;
        }
        else {
            return "This was a draw";
        }
    }


})