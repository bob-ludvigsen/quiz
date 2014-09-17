/**
 * Created by pfu on 04/06/14.
 */
Template.board.rendered = function () {


}

Template.board.helpers({

    cats: function () {
        var gameId = Session.get("playgame");
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

        console.log("turn" + griddata.turn);
        //enable knapperne på brædtet...
        var whoosturn = griddata.turn;
        Session.set("turn", whoosturn);
        var clickCount = griddata.turncount;
        var player_1 = griddata.player1_id;
        var player_2 = griddata.player2_id;
        var loggedInUser = Meteor.userId();
        console.log(player_2 + "samme som " + loggedInUser);

        //returner true if the loggedin user is player 1


        if (loggedInUser === player_1 && Session.get("turn") === 1) {
            //alert("hej");

            $(".enabled").addClass("is-disabled");


        }
        else if (loggedInUser === player_2 && Session.get("turn") === 0) {
            //alert("hej bob");
            setInterval(function () {
                $(".enabled").addClass("is-disabled");
            }, 300);
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
                //console.log(a);
                //
                // if (a === -1) {
                //TheGrid += '<div  class="pull-left"><div id="' + number + '" class="box"></div></div>';
                // }
                //if (b > -1) {
                //$("#" + number).removeClass("yellow");
//alert(number);
                // setInterval( function(){
                // $("#" + number).addClass("yellow");
                //   }, 300 );

                // }


                if (b > -1) {
                    TheGrid += '<div  class="pull-left"><div id="' + number + '" class="box yellow is-disabled"></div></div>';
                }
                else if (a > -1) {
                    TheGrid += '<div  class="pull-left"><div id="' + number + '" class="box blue is-disabled"></div></div>';
                }
                else {
                    TheGrid += '<div  class="pull-left"><div id="' + number + '" class="box"></div></div>';
                }


            }
            TheGrid += '</div>';
        }

        return TheGrid;

        //return TheGrid;

    }

    /* player: function(){
     var gameId = Session.get("playgame");
     var griddata = Gamedata.findOne({_id: gameId});
     var currentPlayer;
     var turn = griddata.turn;
     var clickCount = griddata.turncount;
     var player_1 = griddata.player1_id;
     var player_2 = griddata.player2_id;
     var loggedInUser = Meteor.userId();
     console.log(loggedInUser);
     //returner true if the loggedin user is player 1
     if (loggedInUser === player_1){
     if(turn === 0){
     currentPlayer = true;
     }

     }
     else if(loggedInUser === player_2){
     if(turn === 1) {
     currentPlayer = false;
     }
     }
     //alert(currentPlayer);
     return currentPlayer;
     }*/

});


Template.board.events({

    'click #cat': function (e) {
        e.preventDefault();
//alert(this.category);
        var gameId = Session.get("playgame");
        var griddata = Gamedata.findOne({_id: gameId});
        var turnCount = griddata.turncount;
        turnCount += 1;
        Session.set("turncount", turnCount);
        Session.set('category', this.category);
        Session.set("show-my-modal", true);

        Router.go('quiz');
    },

    'click  .box': function (e) {
        e.stopPropagation()
        var clickedElement = $(event.target).attr("id");
        if ($(".disabled")[0]) {
            if (Session.get("turn") === 0) {
                if ($("#" + clickedElement).hasClass('blue')|| $("#" + clickedElement).hasClass('yellow')) {
                    return false;
                }
                else{
                    $("#" + clickedElement).addClass("blue is-disabled");
                }

            }
            else if (Session.get("turn") === 1) {

                if ($("#" + clickedElement).hasClass('yellow')|| $("#" + clickedElement).hasClass('blue')) {
                    alert('er gul')
                    return false;
                }
                else{
                $("#" + clickedElement).addClass("yellow is-disabled");
                }

            }
            $(".btn").removeClass("disabled");

            Session.set("currentTile", clickedElement);
        }
        else {
            var lastClickedElement = Session.get("currentTile", clickedElement);

            if (Session.get("turn") === 0) {
                $("#" + lastClickedElement).removeClass("blue is-disabled");
                $("#" + clickedElement).addClass("blue is-disabled");
            }
            else if (Session.get("turn") === 1) {
                $("#" + lastClickedElement).removeClass("yellow is-disabled");
                $("#" + clickedElement).addClass("yellow is-disabled");

            }
            Session.set("currentTile", clickedElement);
        }


    },
    'click #login-dropdown-list': function (event) {
        if ($(".dropdown").hasClass("open")) {
            $(".dropdown").removeClass("open");
        }
        else {
            $(".dropdown").addClass("open");
        }

    }


});

Meteor.subscribe('quizzes');
Meteor.subscribe('categories');
Meteor.subscribe('gamedata');
Meteor.subscribe("directory");
