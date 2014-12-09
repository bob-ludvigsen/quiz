/**
 * Created by pfu on 20/08/14.
 */
Template.adminTemplate.helpers({
    // check if user is an admin
    isAdminUser: function() {

        return Roles.userIsInRole(Meteor.user(), ['admin']);
    }
});
