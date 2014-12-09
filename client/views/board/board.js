/**
 * Created by pfu on 04/06/14.
 */
Template.board.rendered = function () {


}

Template.board.helpers({

    cats: function () {
        //return Categories.find().fetch();
        var gameId = Session.get("playgame");

        var griddata = Gamedata.findOne({_id: gameId});
        if (griddata) {
var count = griddata.count;
            var usedCats = griddata.catsUsed;
//alert(usedCats);
        }
        var categories = Categories.find().fetch();

        var numOfCats = categories.length;
        if (usedCats) {
            if (numOfCats === usedCats.length) {
                Gamedata.update({_id: gameId}, {$set: {"catsUsed": []}});
            }
        }

        var TheCats = '';
        for (var i = 0; i < numOfCats; i++) {
            //alert(usedCats)
            if (usedCats) {
                if (usedCats.length === 0) {
                    TheCats += '<a id="cat" class="btn custom " href="' + categories[i].category + '">' + categories[i].category + '</a>';
                }
                else if (usedCats.length > 0) {
                    var a = usedCats.indexOf(categories[i].category);
                }
            }

            if (usedCats.length > 0) {
                if (a < 0) {
                    TheCats += '<a id="cat" class="btn custom " href="' + categories[i].category + '">' + categories[i].category + '</a>';

                }
                else {
                    TheCats += '<a id="cat" class="btn custom disabled " href="' + categories[i].category + '">' + categories[i].category + '</a>'
                }
            }

        }
        return TheCats;
        // }, 4);
    },
    score: function () {
        var gameId = Session.get("playgame");

        return Gamedata.findOne({_id: gameId});
        //return Session.get('score');
    },
    grid: function () {
        var gameId = Session.get("playgame");

        var griddata = Gamedata.findOne({_id: gameId});
        if (griddata) {
            var whoosturn = griddata.turn;
            var count = griddata.count;
            var player_1 = griddata.player1_id;
            var player_2 = griddata.player2_id;
            var scorep1 = griddata.scorep1;
            var scorep2 = griddata.scorep2;
            var loggedInUser = Meteor.userId();

            //return the logged in user
            //console.log('count er ' + count + "  tur er " + whoosturn)

            var foundBonusTiles = griddata.countbonus;

            if (foundBonusTiles >= 5) {
                Gamedata.update({_id: gameId}, {$set: {"finished": 1, "turn": 2}});
                if(scorep1>scorep2){
                    // 01 er sat midlertidigt indtil hoved spil generatoren er implementeret

                    Meteor.call('insertWinner', player_1, 'svnquiz' );
                }
                else if(scorep2>scorep1){
                    Meteor.call('insertWinner', player_2, 'svnquiz' );
                }

                Router.go('boardInactive');
            }

            if (count >= 5) {

                if (loggedInUser === player_1 && whoosturn === 0) {
                    //skift fra spiller et til spiller to
                    Gamedata.update({_id: gameId}, {$set: {"turn": 1, "count": 0, "catsUsed": []}});
                    //send en mail til spiller 2
                    Meteor.call('mailChangeTurn', player_2);
                    //alert('her mailer vi til spiller 2')


                }
                else if (loggedInUser === player_2 && whoosturn === 1) {
                    //skift fra spiller 2 til spiller 1
                    Gamedata.update({_id: gameId}, {$set: {"turn": 0, "count": 0, "catsUsed": []}});
                    //send en mail til spiller 1
                    Meteor.call('mailChangeTurn', player_1);
                    //alert('her mailer vi til spiller 1');

                }
            }
            else if (count < 5) {
                //player_1 er 0 og player_2 er 1
                if (loggedInUser === player_1 && whoosturn === 1) {
                    Router.go('boardInactive');
                }
                else if (loggedInUser === player_1 && whoosturn === 0) {
                    if (Session.get('gotoquiz') === true) {
                        Router.go('quiz');
                    }
                    else {
                        Router.go('board');
                    }
                }

                if (loggedInUser === player_2 && whoosturn === 0) {
                    Router.go('boardInactive');
                }
                else if (loggedInUser === player_2 && whoosturn === 1) {
                    if (Session.get('gotoquiz') === true) {
                        Router.go('quiz');
                    }
                    else {
                        Router.go('board');
                    }
                }

            }


            var tilenumbers1 = [];
            var tilenumbers2 = [];


            //bonus brikker
            var bonusarr = [];
            var bonuslength = griddata.bonustile.length;
            for (var i = 0; i < bonuslength; i++) {
                bonusarr.push(griddata.bonustile[i])

            }

            var dataene1 = griddata.tilesp1.length;

            var dataene2 = griddata.tilesp2.length;

            for (var i = 0; i < dataene1; i++) {
                tilenumbers1.push(griddata.tilesp1[i])

            }
            for (var i = 0; i < dataene2; i++) {
                tilenumbers2.push(griddata.tilesp2[i])

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
                        if (c > -1) {
                            TheGrid += '<div  class="pull-left"><div id="' + number + '" class="box yellow is-disabled"><img src="graphics/boya.jpg" class="img-responsive pull-right centerimg" alt="Responsive image"></div></div>';
                        }
                        else {
                            TheGrid += '<div  class="pull-left"><div id="' + number + '" class="box yellow is-disabled"></div></div>';
                        }
                    }
                    else if (a > -1) {
                        if (c > -1) {
                            TheGrid += '<div  class="pull-left"><div id="' + number + '" class="box blue is-disabled"><img src="graphics/boya.jpg" class="img-responsive pull-right centerimg" alt="Responsive image"></div></div>';
                        }
                        else {
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
    curplayer: function () {

        var gameId = Session.get("playgame");
        var griddata = Gamedata.findOne({_id: gameId});
        if (griddata) {
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

    }

});


Template.board.events({

    'click #cat': function (event) {
        event.preventDefault();
        var gameId = Session.get("playgame");
        var clickedElement = $(event.target).attr("href");
        Session.set('category', clickedElement);
        Session.set("show-my-modal", true);
        Gamedata.update({_id: gameId}, {$push: {catsUsed: clickedElement}});
        //update the data in the session variable to update modal templates
        var cat = Session.get('category');

        var number = Quizzes.find({category: cat}).count();
        var randomIndex = Math.floor(Math.random() * number);
        Session.set('index', randomIndex);

        // denne session skal bruges så spm ikke bliver fornyet ved refresh af browser se evt. question.js
        //Session.set('quizInScope', Quizzes.findOne({category: cat}, {skip: randomIndex, limit: 1}));
        Session.set('gotoquiz', true);
    },

    'click  .box': function (event) {
        // e.stopPropagation()
        var clickedElement = $(event.target).attr("id");
        var gameId = Session.get("playgame");
        var griddata = Gamedata.findOne({_id: gameId});
        var playerTurn = griddata.turn;
        //alert(playerTurn)
        //enabler kategorierne


        //Gamedata.update({_id: gameId},{ $inc: { count: +1 } } );
        //set en session med værdien af det klikkede element sammenlign med bonus arrayen med de værdier der kan anvendes..
        //og anvend denne til bonus bomberne, når 5 bomber er sprunget er spillet slut
        var lastClickedElement = Session.get("currentTile");
        //if ($(".disabled")[0]) {
        if (playerTurn === 0) {

            if ($("#" + clickedElement).hasClass('blue is-disabled') || $("#" + clickedElement).hasClass('yellow is-disabled')) {
                alert('er blå')
                //return false;
            }
            else {
                $("#" + clickedElement).addClass("blue is-disabled");
                $("#" + lastClickedElement).removeClass("blue is-disabled");
            }
            $(".pull-left").removeClass("cat-is-disabled");
            // Session.set("currentTile", clickedElement);
        }
        else if (playerTurn === 1) {


            if ($("#" + clickedElement).hasClass('yellow') || $("#" + clickedElement).hasClass('blue')) {
                alert('er gul')
                //return false;
            }
            else {
                $("#" + clickedElement).addClass("yellow is-disabled");
                $("#" + lastClickedElement).removeClass("yellow is-disabled");
            }
            $(".pull-left").removeClass("cat-is-disabled");

        }
        //alert(Session.get("currentTile"))
        // }
        // else {
        Session.set("currentTile", clickedElement);


        /* if (playerTurn === 0) {
         $("#" + lastClickedElement).removeClass("blue is-disabled");
         //$("#" + clickedElement).addClass("blue is-disabled");
         Session.set("currentTile", clickedElement);
         }
         else if (playerTurn === 1) {

         $("#" + lastClickedElement).removeClass("yellow is-disabled");
         //$("#" + clickedElement).addClass("yellow is-disabled");
         Session.set("currentTile", clickedElement);
         }*/

        //}
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
