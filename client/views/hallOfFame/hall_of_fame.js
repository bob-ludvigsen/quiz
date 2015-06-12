/**
 * Created by pfu on 21/08/14.
 */

Template.halloffame.helpers({

    myStats: function () {
        var hallOfFameList = Meteor.users.find({},{sort: {svnquiz: -1}, limit:10}).fetch();
        return hallOfFameList;
    }
});

Template.halloffame.events({
    'click .white-text': function (event) {
        //Meteor.call('insertWinner', 'YrBYomgqmB7iymQYP', 'svnquiz');
    }
});

Template.halloffamelist.helpers({

    myStatus: function () {
        var hallOfFameList = Meteor.users.findOne({_id:this._id}, {sort: {svnquiz: -1}, limit: 10});

        var wins = hallOfFameList.svnquiz;

        if (wins < 10) {

            return ' Floater';
        }
        else if (wins >= 10 && wins < 20) {

            return ' Sailor';
        }
        else if (wins >= 20 && wins < 30) {

            return ' Fighter';
        }
        else if (wins >= 30 && wins < 40) {

            return ' Captain';
        }
        else if (wins >= 40) {

            return ' Admiral';
        }
    }
})