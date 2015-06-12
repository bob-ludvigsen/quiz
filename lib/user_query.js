/**
 * Created by bob on 13/11/14.
 */
filteredUserQuery = function(userId, filter) {
    // if not an admin user don't show any other user
    if (!Roles.userIsInRole(userId, ['admin']))
        return Meteor.users.find(userId);

    // TODO: configurable limit and paginiation
    var queryLimit = 25;

    if(!!filter) {
        // TODO: passing to regex directly could be dangerous
        users = Meteor.users.find({
            $or: [
                {'profile.name': {$regex: filter, $options: 'i'}},
                {'emails.address': {$regex: filter, $options: 'i'}}
            ]
        }, {sort: {emails: 1}, limit: queryLimit});
    } else {
        users = Meteor.users.find({}, {sort: {emails: 1}, limit: queryLimit});
    }
    return users;
};

filteredQuestionQuery = function(userId, filter) {
    // if not an admin user don't show any other user
    if (!Roles.userIsInRole(userId, ['admin']))
        return Meteor.users.find(userId);

    // TODO: configurable limit and paginiation
    var queryLimit = 55;

    if(!!filter) {
        // TODO: passing to regex directly could be dangerous
        questions = Quizzes.find({$or: [
            {'category': {$regex: filter, $options: 'i'}},
            {'question': {$regex: filter, $options: 'i'}}
        ]
        }, {sort: {question: 1}, limit: queryLimit});
    } else {
        questions = Quizzes.find({},{sort: {question: 1}, limit: queryLimit});
    }
    return questions;
};
