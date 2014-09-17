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
    thecorrect:function(){
        return Session.get("yahhh");
    }



});



Template.feedback.events({

    'click .close': function(e) {
        e.preventDefault();
        Session.set("show-feedback-pos", false);
        Session.set("show-feedback-neg", false);

        Router.go('board');
    //alert("det virker");
    }


});