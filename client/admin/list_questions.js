/**
 * Created by pfu on 20/08/14.
 */
/**
 *sorter vha category
 * list spm
 *
 *
 *
 */
Template.listquestions.helpers({
    questions: function() {
        return filteredQuestionQuery(Meteor.userId(), Session.get("questionFilter"));
    }
});
// search no more than 2 times per second
var setQuestionFilter = _.throttle(function(template) {
    var search = template.find(".search-input-filter").value;
    Session.set("questionFilter", search);
}, 500);

Template.listquestions.events({
    'keyup .search-input-filter': function(event, template) {
        setQuestionFilter(template);
        return false;
    },
    'click .updatequestion': function (e) {
        e.preventDefault();
        Session.set('qId', this._id);
        //Session.set('questionInScope', Quizzes.findOne({_id:this._id}));
        //Router.go('/edit_questions');
        //alert(this._id)
        //Router.go('/edit_questions/', {_id: this._id});

    },
    'click #deletequestion': function (e) {
        e.preventDefault();
        Session.set('qId', this._id);
        //Session.set('questionInScope', Quizzes.findOne({_id:this._id}));
        //Router.go('/edit_questions');

        var r = confirm("Er du sikker på du vil slette??");
        if (r == true) {
            Quizzes.remove({_id: this._id});
        };

    }


});
Template.listquestions.rendered = function() {
    var searchElement = document.getElementsByClassName('search-input-filter');
    if(!searchElement)
        return;
    var filterValue = Session.get("questionFilter");

    var pos = 0;
    if (filterValue)
        pos = filterValue.length;

    searchElement[0].focus();
    searchElement[0].setSelectionRange(pos, pos);
};
