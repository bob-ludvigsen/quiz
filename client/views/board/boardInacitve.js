/**
 * Created by bob on 03/10/14.
 */
Template.boardInactive.helpers({

    cats: function () {
       /* var gameId = Session.get("playgame");
        var scoredata = Gamedata.findOne({_id: gameId});

        var score1 = scoredata.scorep1;
        var score2 = scoredata.scorep2;

        if (Session.get("turn") === 0) {
            Session.set('score', score1);
        }
        else if (Session.get("turn") === 1) {
            Session.set('score', score2);
        }

        Session.set("show-my-modal", false);
        var score = Session.get('score');
        //alert(typeof score);
*/

        return Categories.find().fetch();
    },
    score: function () {
        var gameId = Session.get("playgame");

        return Gamedata.findOne({_id: gameId});
        //return Session.get('score');
    },
    grid: function () {
        var gameId = Session.get("playgame");

        var griddata = Gamedata.findOne({_id: gameId});

        if(griddata){
        var whoosturn = griddata.turn;

        var count = griddata.count;
        var player_1 = griddata.player1_id;
        var player_2 = griddata.player2_id;
        var foundBonusTiles = griddata.countbonus;
        }
        var loggedInUser = Meteor.userId();


        //setInterval( function(){
       // alert('der er ca ' + foundBonusTiles + 'bonustiles');
        if(foundBonusTiles >= 5){
            //alert('hva sååååå');
            //sæt spillet til at være slut og vis alert med vinderen
            Gamedata.update({_id:gameId},{$set:{"finished":1, "turn":2}});

           var score1 = griddata.scorep1;
            var score2 = griddata.scorep2;

           /* if(score1 > score2){
                var text = "Winnner is "+player_1;
            }
            else if (score2 > score1){
                var text = "Winnner is "+player_2;
            }
            else if(score1 === score2){
                var text = "This was a draw!";
            }*/

            setInterval( function(){
               $(".alert").delay(202).addClass("in");
                //$( ".gameover" ).append( text );

            }, 300 );

        };
       // }, 100 );

         if(count >= 5){

            if(loggedInUser === player_1 && whoosturn === 0){
                Gamedata.update({_id:gameId},{$set:{"turn":1,"count":0}});

            }
            else if(loggedInUser === player_2 && whoosturn === 1){
                Gamedata.update({_id:gameId},{$set:{"turn":0,"count":0}});

            }
        }
        else if(count < 5){
            //player_1 er 0 og player_2 er 1
            if (loggedInUser === player_1 && whoosturn === 1) {
                Router.go('boardInactive');
            }
            else if (loggedInUser === player_1 && whoosturn === 0) {
                Router.go('board');
            }

            if (loggedInUser === player_2 && whoosturn === 0) {
                Router.go('boardInactive');
            }
            else if (loggedInUser === player_2 && whoosturn === 1) {
                Router.go('board');
            }
        };



        //bonus brikker
        var bonusarr = [];
        if(griddata){
        var bonuslength = griddata.bonustile.length;
        for (var i = 0; i < bonuslength; i++) {
            bonusarr.push(griddata.bonustile[i])

        }

        tilenumbers1 = [];
        tilenumbers2 = [];
        //var griddata = Gamedata.find({_id:gameId}).fetch();

        //alert(griddata.turn);

        var dataene1 = griddata.tilesp1.length;
        //alert(dataene1);

        var dataene2 = griddata.tilesp2.length;
        //alert(dataene2);


        for (var i = 0; i < dataene1; i++) {
            tilenumbers1.push(griddata.tilesp1[i])
            //alert(griddata.tilesp1[i]);
        }
        for (var i = 0; i < dataene2; i++) {
            tilenumbers2.push(griddata.tilesp2[i])
            // alert(griddata.tilesp2[i]);
        }

        var TheGrid = ''

        var i, j;

        for (j = 1; j <= 7; j++) {
            TheGrid += '<div class="col-xs-10 col-md-10">';

            for (i = 1; i <= 7; i++) {
                var number = ((7 * j) + i) - 7;
                var a = tilenumbers1.indexOf(number);
                var b = tilenumbers2.indexOf(number);
                var c = bonusarr.indexOf(number);

                if (b > -1) {
                    if(c > -1){
                        TheGrid += '<div  class="pull-left"><div id="' + number + '" class="box yellow is-disabled"><img src="graphics/boya.jpg" class="img-responsive pull-right centerimg" alt="Responsive image"></div></div>';
                    }
                    else{
                        TheGrid += '<div  class="pull-left"><div id="' + number + '" class="box yellow is-disabled"></div></div>';
                    }
                }
                else if (a > -1) {
                    if(c > -1){
                        TheGrid += '<div  class="pull-left"><div id="' + number + '" class="box blue is-disabled"><img src="graphics/boya.jpg" class="img-responsive pull-right centerimg" alt="Responsive image"></div></div>';
                    }
                    else{
                        TheGrid += '<div  class="pull-left"><div id="' + number + '" class="box blue is-disabled"></div></div>';
                    }
                }
                else {
                    TheGrid += '<div  class="pull-left"><div id="' + number + '" class="box"></div></div>';
                }


            }
            TheGrid += '</div>';
        }

        return TheGrid;
        }
        //return TheGrid;

    },
    curplayer: function(){

        var gameId = Session.get("playgame");
        //alert(gameId);
        var griddata = Gamedata.findOne({_id: gameId});
        if(griddata){
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

    }

});

Template.boardInactive.events({

    'click .close': function(e) {
        e.preventDefault();
        Router.go('mygames');

    }


});