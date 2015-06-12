/**
 * Created by bob on 27/10/14.
 */
//AccountsTemplates.removeField('email');

T9n.setLanguage('en');

var email = AccountsTemplates.removeField('email');
var pwd = AccountsTemplates.removeField('password');

AccountsTemplates.addFields([
    email,
    {
        _id: 'username',
        type: 'text',
        displayName: 'Username',
        required: true
    },
    {
        _id: "username_and_email",
        type: "text",
        displayName: "usernameOrEmail",
        placeholder: "usernameOrEmail",
        required: true
    },
    pwd
]);


/*
 AccountsTemplates.addField({
 _id: "username_and_email",
 type: "text",
 displayName: "Name or Email",
 placeholder: "name or email",
 });
 */


//AccountsTemplates.removeField('password');
/*AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    displayName: {
        signIn: "Secret"
    },
    placeholder: {
        signUp: "at least six characters"
    },
    required: true,
    minLength: 6,
    re: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
    errStr: 'At least 1 digit, 1 lowercase and 1 uppercase'
});


 AccountsTemplates.addField({
 _id: "username",
 type: "text",
 displayName: "username",
 required: true,
 minLength: 5
 });*/


/*AccountsTemplates.addField({
    _id: 'name',
    type: 'text',
    displayName: "Full Name",
    //minLength: 5,
    //maxLength: 30,
    func: function(value){return value === 'Full Name';},
    errStr: 'Only "Full Name" allowed!',
    trim: true
});

AccountsTemplates.addField({
    _id: 'phone',
    type: 'tel',
    displayName: "Phone",
    re: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
    errStr: 'Invalid Phone number!'
});*/


AccountsTemplates.configure({
    confirmPassword: true,
    enablePasswordChange: true,
    overrideLoginErrors: true,
    sendVerificationEmail: true,
    showAddRemoveServices: true,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    //privacyUrl: '/privacyPolicy',
    //termsUrl: '/termsOfUse',
    continuousValidation: true,
    negativeFeedback: true,
    positiveFeedback: true,
    negativeValidation: true,
    positiveValidation: true

});

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
   // path: '/login',
    layoutTemplate: 'simpleLayout',
    redirect: '/mygames'
    //redirect: function(){
    //    var user = Meteor.user();
    //    Router.go('/user/' + user._id);
    //}
});

AccountsTemplates.configureRoute('signUp', {
    name: 'signup',
    //path: '/login',
    //redirect: '/profile',
    layoutTemplate: 'simpleLayout',
    redirect: '/mygames'
});
AccountsTemplates.configureRoute('forgotPwd', {
    //path: '/login',
    layoutTemplate: 'simpleLayout'
});

//AccountsTemplates.configureRoute('changePwd' /*, {layoutTemplate: 'simpleLayout'}*/);
AccountsTemplates.configureRoute('resetPwd' /*, {layoutTemplate: 'simpleLayout'}*/);
AccountsTemplates.configureRoute('enrollAccount' /*, {layoutTemplate: 'simpleLayout'}*/);
AccountsTemplates.configureRoute('verifyEmail' /*, {layoutTemplate: 'simpleLayout'}*/);


