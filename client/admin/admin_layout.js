/**
 * Created by pfu on 20/08/14.
 */

Template.admin_layout.events({
    'click #login-dropdown-list': function (event) {
        if ($(".dropdown").hasClass("open")) {
            $(".dropdown").removeClass("open");
        }
        else {
            $(".dropdown").addClass("open");
        }

    }
});