/**
 * Created by pfu on 29/05/14.
 */
Router.configure({
    layoutTemplate: 'layout'
});

//Router.onRun(function(){setActiveLinks();});

Router.map(function() {
    this.route('board', {
        path: 'board',
        template: 'board'

    });
    this.route('boardInactive', {
        path: 'boardInactive'
    });
    this.route('singleplayer', {
        path: 'singleplayer'
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
    this.route('login', {
        path: 'login'

    });

    this.route('admin', {
        path:'/admin',
        layoutTemplate: 'admin_layout',
        template: 'adminTemplate',
        onBeforeAction: function() {
            if (Meteor.loggingIn()) {
                this.render(this.loadingTemplate);
            } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
                //console.log('redirecting');
                this.redirect('/');
            }
            else {
                this.next();
            }
        }
    });



    this.route('list_questions', {
        path:'/list_questions',
        layoutTemplate: 'admin_layout',
        template: 'listquestions',
        onBeforeAction: function() {
            if (Meteor.loggingIn()) {
                this.render(this.loadingTemplate);
            } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
                //console.log('redirecting');
                this.redirect('/');
            }
            else {
                this.next();
            }
        }
    });

    Router.route('/editquestion/:_id/', {
        //path: '/edit_questions/:_id',
        //path:'/list_questions/:_id',
        name: 'editquestion',
        layoutTemplate: 'admin_layout',

        waitOn: function() {

            return Meteor.subscribe('quizzes');
        },

        data: function() {
            Session.set('qId', this.params._id);

            //Posts.findOne(this.params._id)
            //return Quizzes.findOne(this.params._id);
            },
        onBeforeAction: function() {
            if (Meteor.loggingIn()) {
                this.render(this.loadingTemplate);
            } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
                //console.log('redirecting');
                this.redirect('/');
            }
            else {
                this.next();
            }
        }

    });


    this.route('create_question', {
        path:'/create_question',
        layoutTemplate: 'admin_layout',
        template: 'createquestion',
        onBeforeAction: function() {
            if (Meteor.loggingIn()) {
                this.render(this.loadingTemplate);
            } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
                //console.log('redirecting');
                this.redirect('/');
            }
            else {
                this.next();
            }
        }
    });


});


