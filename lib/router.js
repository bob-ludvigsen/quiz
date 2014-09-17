/**
 * Created by pfu on 29/05/14.
 */
Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('board', {
        path: 'board',
        template: 'board'



    });




    this.route('menu', {
        path: '/',
        template: 'menu'

    });
    //this.route('quiz', {path: 'quiz'});
    this.route('quiz', {
        path: 'quiz'
    });
    this.route('halloffame', {
        path: 'halloffame'
    });
    this.route('mystatus', {
        path: 'mystatus'
    });
    this.route('inviteplayer', {
        path: 'inviteplayer'
    });
    this.route('instructions', {
        path: 'instructions'
    });
    this.route('mygames', {
        path: 'mygames'
    });
    this.route('admin', {
        path:'/admin',
        layoutTemplate: 'admin_layout',
        template: 'adminTemplate',
        onBeforeAction: function() {
            if (Meteor.loggingIn()) {
                this.render(this.loadingTemplate);
            } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
                console.log('redirecting');
                this.redirect('/');
            }
        }
    });
    this.route('edit_questions', {
        path:'/edit_questions',
        layoutTemplate: 'admin_layout',
        template: 'edit_questions',
        onBeforeAction: function() {
            if (Meteor.loggingIn()) {
                this.render(this.loadingTemplate);
            } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
                console.log('redirecting');
                this.redirect('/');
            }
        }
    });

});


