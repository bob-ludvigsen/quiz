/**
 * Created by bob on 10/10/14.
 */
/**
 * Created by bob on 25/09/14.
 */

Template.createquestion.helpers({


    categories : function(){
        return Categories.find().fetch();

    }
    //Session.get('search_category')
});



Template.createquestion.events({
    'click .opret':function(evt, tmpl){

        var cat = tmpl.find('#input-category').value;
        var created = new Date().getTime();
        var active = false;

        Meteor.call('createquestion', cat, created, active, function(error, result) {
            if (error) {
                // display the error to the user
                console.log(error);
                //alert(error);

            } else {
                var Id = result;
                Router.go('editquestion', {_id: Id});

            }
        });

        //Router.go('/list_questions');opretkategori
        //alert(options.correct);
    },
    'click .opretkategori':function(evt, tmpl){

        var cat = tmpl.find('#create-category').value;
        var created = new Date().getTime();



        var r = confirm("Er du sikker på du vil oprette kategorien "+cat);
        if (r == true) {


            Meteor.call('addcategory', cat, function(error) {
                if (error) {
                    // display the error to the user
                    console.log(error);
                    //alert(error);

                }
            })


        };
       /* Meteor.call('addcategory', cat, created, active, function(error, result) {
            if (error) {
                // display the error to the user
                console.log(error);
                //alert(error);

            } else {
                setInterval(function () {


                    var Id = result;
                    //Router.go('usercreatepost', {_id: currentPostId});
                    Session.set('qId', Id);
                    Session.set('questionInScope', Quizzes.findOne({_id:Id}));


                }, 100);

                Router.go('/edit_questions');
            }
        });*/

        //Router.go('/list_questions');opretkategori
        //alert(options.correct);
    },


    'click .cancel':function(evt, tmpl) {

        Router.go('/list_questions')

    },



    '#question, keypress':function(evt, tmpl) {

        var max = 500;
        var len = tmpl.find('#input-question').value.length;
        if (len >= max) {
            $('#charNum').text(' Du har ikke flere karakterer tilbage');
        } else {
            var char = max - len;
            $('#charNum').text(char + ' karakterer tilbage');
        }
    }
});



/* var emailField = tmpl.find('#input-username').value;

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
 $("#createaccount").modal("hide");*/
