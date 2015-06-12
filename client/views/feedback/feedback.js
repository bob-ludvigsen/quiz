/**
 * Created by pfu on 27/06/14.
 */


Template.feedback.helpers({

    showfeedbackpos:function(){

         return Session.get("show-feedback-pos");

    },
    showfeedbackneg:function(){

        return Session.get("show-feedback-neg");
    },
    timeIsUp:function(){

        return Session.get("show_time_up");
    },
    thecorrect:function(){



     /*if(Session.get("closeAlert") === true){
         if(Session.get("show-feedback-pos") === true || Session.get("show-feedback-neg") === true || Session.get("show_time_up") === true) {
             setInterval(function () {
                 Session.set("show-feedback-pos", false);
                 Session.set("show-feedback-neg", false);
                 Session.set("show_time_up", false);
                 //lukker quizzen se board.js
                 Session.set('gotoquiz', false);
                 Session.set('closeAlert', false);
                 Router.go('board');
             }, 4000);
         }
        };*/


        var ansver = Session.get("yahhh");

        switch (Session.get('yahhh')) {
            case "ansver1":
                var id = Session.get('AnsverId');
                var svar = Quizzes.findOne({_id: id});
                return svar.answer_0;
                break;
            case "ansver2":
                var id = Session.get('AnsverId');
                var svar = Quizzes.findOne({_id: id});

                return svar.answer_1;
                break;
            case "ansver3":
                var id = Session.get('AnsverId');
                var svar = Quizzes.findOne({_id: id});

                return svar.answer_2;
                break;
            case "ansver4":
                var id = Session.get('AnsverId');
                var svar = Quizzes.findOne({_id: id});

                return svar.answer_3;
                break;
            default:
              // alert("Other");
        }


    },
    playSound: function () {
        var id = Session.get('AnsverId');
        return Quizzes.findOne({_id: id});
    },

    playCorrect: function (){

      /*  var rand = Math.floor(Math.random() * 10) + 1;
       //  alert('right'+rand+'.mp3');
        return 'right'+rand+'.mp3';*/

    },

    closeAlert: function(){



    }



});



Template.feedback.events({

    'click .close': function(e) {
        e.preventDefault();
        var destination = Session.get('gamename');
        State.running = true;
        Session.set("show-feedback-pos", false);
        Session.set("show-feedback-neg", false);
        Session.set("show_time_up", false);
        //lukker quizzen se board.js
        $(".alert").removeClass("in");
        Session.set('gotoquiz', false);
        Router.go(destination);

    //alert("det virker");
    }


});