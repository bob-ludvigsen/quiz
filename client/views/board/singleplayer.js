/**
 * Created by bob on 10/10/14.
 */
/**
 * Created by pfu on 04/06/14.
 */
Template.board.rendered = function () {


}

Template.singleplayer.helpers({

    cats: function () {
        var gameId = Session.get("singleplayergame");
        if(gameId){


            var griddata = Singleplayer.findOne({_id: gameId});

            if (griddata) {
                var count = griddata.count;
                var usedCats = [];
                if (griddata.catsUsed != undefined) {
                    usedCats = griddata.catsUsed;
                }
                else {
                    usedCats = [];
                }


            }
            var categories = Categories.find().fetch();
            if (categories) {
                var numOfCats = categories.length;
            }
            if (usedCats) {
                if (numOfCats === usedCats.length) {
                    Singleplayer.update({_id: gameId}, {$set: {"catsUsed": []}});
                }
            }

            var TheCats = '';
            for (var i = 0; i < numOfCats; i++) {
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

        }
    },
    score: function () {
        var gameId = Session.get("singleplayergame");

        return Singleplayer.findOne({_id: gameId});
        //return Session.get('score');
    },
    grid: function () {
        var gameId = Session.get("singleplayergame");
        alert('her er spil id '+ gameId)

        var griddata = Singleplayer.findOne({_id: gameId});
        //var whoosturn = griddata.turn;
        //var count = griddata.count;
        //var player_1 = griddata.player1_id;
        //var player_2 = griddata.player2_id;
        //var loggedInUser = Meteor.userId();

        //return the logged in user
       // console.log('count er ' + count + "  tur er " + whoosturn)
if(griddata){
        var foundBonusTiles = griddata.countbonus;

        if(foundBonusTiles == 5){
            Singleplayer.update({_id:gameId},{$set:{"finished":1, "turn":2}});
            //Router.go('boardInactive');
        }

       /* if(count >= 5){

            if(loggedInUser === player_1 && whoosturn === 0){
                Singleplayer.update({_id:gameId},{$set:{"turn":1,"count":0}});

            }
            else if(loggedInUser === player_2 && whoosturn === 1){
                Singleplayer.update({_id:gameId},{$set:{"turn":0,"count":0}});

            }
        }
        else if(count <= 5){
            //player_1 er 0 og player_2 er 1
            if (loggedInUser === player_1 && whoosturn === 1) {
                Router.go('boardInactive');
            }
            else if (loggedInUser === player_1 && whoosturn === 0) {
                if(Session.get('gotoquiz') === true){
                    Router.go('quiz')
                }
                else{
                    Router.go('board');
                }
            }

            if (loggedInUser === player_2 && whoosturn === 0) {
                Router.go('boardInactive');
            }
            else if (loggedInUser === player_2 && whoosturn === 1) {
                if(Session.get('gotoquiz') === true){
                    Router.go('quiz')
                }
                else{
                    Router.go('board');
                }
            }

        }*/





        var tilenumbers1 = [];
        var tilenumbers2 = [];

        /*  var arr = []
         while(arr.length < 5){
         var randomnumber=Math.ceil(Math.random()*49)
         var found=false;
         for(var i=1;i<arr.length;i++){
         if(arr[i]==randomnumber){found=true;break}
         }
         if(!found)arr[arr.length]=randomnumber;
         }
         console.log(arr);*/

        //bonus brikker
        var bonusarr = [];
        var bonuslength = griddata.bonustile.length;
        for (var i = 0; i < bonuslength; i++) {
            bonusarr.push(griddata.bonustile[i])

        }

        var dataene1 = griddata.tilesp1.length;

        //var dataene2 = griddata.tilesp2.length;

        for (var i = 0; i < dataene1; i++) {
            tilenumbers1.push(griddata.tilesp1[i])

        }


        /*for (var i = 0; i < dataene2; i++) {
           // tilenumbers2.push(griddata.tilesp2[i])

        }*/

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

        //return TheGrid;
}
    }/*,
    curplayer: function(){

        var gameId = Session.get("playgame");
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


    }*/

});




Template.singleplayer.events({

    'click #cat': function (event) {
        event.preventDefault();
        var gameId = Session.get("singleplayergame");
        var clickedElement = $(event.target).attr("href");
        Session.set('category', clickedElement);
        Session.set("show-my-modal", true);
        var now = new Date().getTime();

        // Set et timestamp i db (update) for at være i stand til at lukke inaktive spil efter 21 dage
        Gamedata.update({_id: gameId}, {$push: {catsUsed: clickedElement}, $set: {update: now}});
        //update the data in the session variable to update modal templates
        var cat = Session.get('category');

        //hent alle aktive spørgsmål
        var number = Quizzes.find({category: cat, $or: [{active: 'true'}, {active: true}]}).count();


        var randomIndex = Math.floor(Math.random() * number);
        Session.set('index', randomIndex);

        // denne session skal bruges så spm ikke bliver fornyet ved refresh af browser se evt. question.js
        Session.set('gotoquiz', true);
        Session.set('gamename', 'singleplayer');
        Router.go('quiz');
    },

    'click  .box': function (event) {
        // e.stopPropagation()
        var clickedElement = $(event.target).attr("id");
        var lastClickedElement = Session.get("currentTile");
        var gameId = Session.get("singleplayergame");
        var griddata = Singleplayer.findOne({_id: gameId});
        //var playerTurn = griddata.turn;

        //Gamedata.update({_id: gameId},{ $inc: { count: +1 } } );
        //set en session med værdien af det klikkede element sammenlign med bonus arrayen med de værdier der kan anvendes..
        //og anvend denne til bonus bomberne, når 5 bomber er sprunget er spillet slut

        if ($("#" + clickedElement).hasClass('blue')|| $("#" + clickedElement).hasClass('yellow')) {
            return false;
        }
        else{
            $("#" + clickedElement).addClass("blue is-disabled");
            $("#" + lastClickedElement).removeClass("blue is-disabled");
            $(".pull-left").removeClass("cat-is-disabled");
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
/*

Meteor.subscribe('quizzes');
Meteor.subscribe('categories');
Meteor.subscribe('gamedata');
Meteor.subscribe("directory");
*/
