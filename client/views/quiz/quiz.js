/**
 * Created by pfu on 23/05/14.
 */

Template.quiz.helpers({

   quizes: function () {
   var cat = Session.get('category');
   var number = Quizzes.find({category: cat}).count();
        //console.log(number)
        //var array = Quizzes.find().fetch();
     var randomIndex = Math.floor( Math.random() * number );
      //  alert(randomIndex);
     return Quizzes.find({category: cat}, {skip: randomIndex, limit: 1}).fetch();
    }


});

Template.quiz.events({
    'click #ansver': function(e){
        e.preventDefault();
        //alert(this.category);

        //alert($('input[type="radio"]:checked').val() + 'rigtigt svar ' + this.correct);

        if($('input[type="radio"]:checked').val() === this.correct){
            Session.set("show-feedback-pos", true);
            var newscore = Session.get('score');
            newscore += 1;

            Session.set("yahhh", this.correct);
            Session.set('score', newscore );

            setInterval( function(){
                $(".alert").delay(202).addClass("in");
            }, 300 );

            var whooseturn = Session.get("turn");
            var id = Session.get("playgame");

            var tile = parseInt(Session.get('currentTile'));
            if(whooseturn === 0){
                //update player 1 gamedata for this game
            Gamedata.update({ _id: id }, { $push: { "tilesp1": tile }, $set: { scorep1: newscore } });
            }
            else if (whooseturn === 1){
                //update player 2 gamedata for this game
                Gamedata.update({ _id: id }, { $push: { "tilesp2": tile }, $set: { scorep2: newscore } });
            }

            //Router.go('/');

        }
        else{

            Session.set("show-feedback-neg", true);

            setInterval( function(){
                $(".alert").delay(202).addClass("in");
            }, 300 );

            Session.set("yahhh", this.correct);

            //Router.go('/');

        }



    }


});


