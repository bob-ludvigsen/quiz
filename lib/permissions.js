/**
 * Created by pfu on 22/08/14.
 */

ownsDocument = function(userId, doc){
    return doc && doc.userId === userId;

}


if (Meteor.isClient) {
    /*accountsUIBootstrap3.map('da', {
        _resetPasswordDialog: {
            title: 'Nulstil adgangskode',
            newPassword: 'Ny adgangskode',
            cancel: 'Fortryd',
            submit: 'Indsend adgangskode'
        },
        _enrollAccountDialog: {
            title: 'Vælg adgangskode',
            newPassword: 'Ny adgangskode',
            cancel: 'Luk',
            submit: 'Indsend adgangskode'
        },
        _justVerifiedEmailDialog: {
            verified: 'Email address verified',
            dismiss: 'Dismiss'
        },
        _loginButtonsMessagesDialog: {
            dismiss: 'Dismiss'
        },
        _loginButtonsLoggedInDropdownActions: {
            password: 'Ændre adgangskode',
            signOut: 'Log af'
        },
        _loginButtonsLoggedOutDropdown: {
            signIn: 'Log på',
            up: 'Opret bruger'
        },
        _loginButtonsLoggedOutPasswordServiceSeparator: {
            or: 'eller'
        },
        _loginButtonsLoggedOutPasswordService: {
            create: 'Opret',
            signIn: 'Log på',
            forgot: 'Glemt adgangskode?',
            createAcc: 'Opret bruger'
        },
        _forgotPasswordForm: {
            email: 'Email',
            reset: 'Nulstil adgangskode'
        },
        _loginButtonsBackToLoginLink: {
            back: 'Fortryd'
        },
        _loginButtonsChangePassword: {
            submit: 'Ændre adgangskode',
            cancel: 'Fortryd'
        },
        _loginButtonsLoggedOutSingleLoginButton: {
            signInWith: 'Log på med',
            configure: 'Konfigurer',
            login: 'Login'
        },
        _loginButtonsLoggedInSingleLogoutButton: {
            signOut: 'Log ud'
        },
        _loginButtonsLoggedOut: {
            noLoginServices: 'No login services configured'
        },
        loginFields: {
            'username-or-email': 'Brugernavn eller email',
            'username': 'Brugernavn',
            'email': 'Email',
            'password': 'Adgangskode'
        },
        signupFields: {
            'username': 'Brugernavn',
            'email': 'Email',
            'email-opt': 'Email (ikke påkrævet)',
            'password': 'Adgangskode',
            'password-again': 'Adgangskode (igen)'
        }
    })

    accountsUIBootstrap3.setLanguage('da');


    Accounts.ui.config({ passwordSignupFields: 'USERNAME_AND_EMAIL' })*/



};