/**
 * Created by pfu on 23/05/14.
 */
Template.quiz.rendered = function () {


    var clock, interval, timeLeft, size, stopTime;
    clock = 15;
    stopTime = Session.get("stoptimer");
    //alert(stoptime);
    size = 0;
    timeLeft = function () {

        if (clock > size) {
            clock--;

            //var progress = 100*clock*0.1 + '%'
            //Session.set("time", progress);
            Session.set("time", clock);
            // return console.log(clock);
        }

        if (clock === 0 && Session.get("stoptimer") === false) {
            //console.log("That's All Folks");
            var gameId = Session.get("playgame");
            // var griddata = Gamedata.findOne({_id: gameId});
            Gamedata.update({_id: gameId}, {$inc: {count: +1}});
            Session.set("show_time_up", true);
            setInterval(function () {
                $(".alert").delay(202).addClass("in");
            }, 300);
            Session.set("stoptimer", false);

            return Meteor.clearInterval(interval);
        }
        else if (clock > 0 && Session.get("stoptimer") === true) {
            //alert('tror det virker');
            clock = 0;
            Session.set("stoptimer", false);

            return Meteor.clearInterval(interval);
        }


    };

    interval = Meteor.setInterval(timeLeft, 1000);

}

Template.quiz.helpers({

    quizes: function () {
        //Session.set("stoptimer", false);
        var cat = Session.get('category');
        var randomIndex = Session.get('index');

        if (p1) {

            var gameId = Session.get("playgame");

            Gamedata.update({_id: gameId}, { $addToSet: { tags: randomIndex } });

        }
        else if (p2) {
            var gameId = Session.get("playgame");

            Gamedata.update({_id: gameId}, { $addToSet: { tags: randomIndex } });

        }
        var quiz = Quizzes.findOne({category: cat}, {skip: randomIndex, limit: 1});
        // alert('her er den rigtige id ' + quiz._id)
        if (quiz) {
            Session.set("yahhh", quiz.correct);
            Session.set('AnsverId', quiz._id);
            return quiz;
        }
    },
    time: function () {
        return Session.get("time");
    }


});

Template.quiz.events({
    'click #ansver': function (e) {

        e.preventDefault();
        Session.set("stoptimer", true);
        Session.set("closeAlert", true);
        var gameId = Session.get("playgame");
        var griddata = Gamedata.findOne({_id: gameId});
        Gamedata.update({_id: gameId}, {$inc: {count: +1}});

        if ($('input[type="radio"]:checked').val() === Session.get('yahhh')) {
            Session.set("show-feedback-pos", true);
            var id = Session.get("playgame");

            //var gameId = Session.get("playgame");
            //hent data til bonus brikkerne og put den i en array
            var bonusarr = [];
            var bonuslength = griddata.bonustile.length;
            for (var i = 0; i < bonuslength; i++) {
                bonusarr.push(griddata.bonustile[i])

            }

            setInterval(function () {
                $(".alert").delay(202).addClass("in");

            }, 100);


            var whooseturn = griddata.turn;
            //alert(whooseturn);

            var count = Session.get("counter");
            //Gamedata.update({_id:id},{$set:{"count":count}});
            var tile = parseInt(Session.get('currentTile'));

            if (whooseturn === 0) {
                //update player 1 gamedata for this game
                var a = bonusarr.indexOf(tile);


                if (a > -1) {
                    Gamedata.update({_id: id}, {$push: {"tilesp1": tile}, $inc: {scorep1: +6, countbonus: +1}});
                }
                else {
                    Gamedata.update({_id: id}, {$push: {"tilesp1": tile}, $inc: {scorep1: +1}});
                }

            }
            else if (whooseturn === 1) {
                //update player 2 gamedata for this game
                var a = bonusarr.indexOf(tile);

                if (a > -1) {
                    Gamedata.update({_id: id}, {$push: {"tilesp2": tile}, $inc: {scorep2: +6, countbonus: +1}});
                }
                else {
                    Gamedata.update({_id: id}, {$push: {"tilesp2": tile}, $inc: {scorep2: +1}});
                }
            }
        }

        else {
            // alert('forkert ' + this.correct)
            Session.set("show-feedback-neg", true);
            var id = Session.get("playgame");

            setInterval(function () {
                $(".alert").delay(202).addClass("in");
            }, 300);


        }

    }


});


