/**
 * Created by pfu on 02/08/14.
 */

/////////////////////////create account///////////////////////////


Template.createAccountModalInner.events({
    // add new user with email address
    'click .btn-danger': function(evt, tmpl) {

        var emailField = tmpl.find('#input-username').value;

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(emailField)) {
           // alert("goood email");
        } else {
            //alert("Invalid email");
            $('#hidethealert').removeClass('hide');
            return false;
        }

        Meteor.call('adminAddUser', emailField);
        //Session.set(closeDropdown);
        $("#createaccount").modal("hide");


        /* Meteor.call('adminAddUser', emailField, function(error) {
         if (error)
         {
         if (typeof Errors === "undefined") Log.error('Error: ' + error.reason);
         else Errors.throw(error.reason);
         return;
         }
         // Session.set('userInScope', Meteor.users.findOne(userId));
         });*/

        //emailField.value = '';
    }
});

