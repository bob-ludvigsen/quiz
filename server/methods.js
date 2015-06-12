/**
 * Created by pfu on 25/08/14.
 */



Meteor.methods({
    game: function (id) {
        var inviter = Meteor.userId();
        var invited = Meteor.users.findOne({_id: id});


        // ensure the user is logged in
        if (!inviter)
            throw new Meteor.Error(401, "Du skal være logget ind for at invitere");

        //generer 5 tilfældige tal ml 1 og 49 til at placere bonus tiles på
        var arr = []
        while(arr.length < 5){
            var randomnumber=Math.ceil(Math.random()*49)

            var a = arr.indexOf(randomnumber);

            if ( a === -1 ) {

                arr.push(randomnumber);

            }



        }
        //console.log(arr);

         var gameid = Gamedata.insert({
             "player1_id": inviter,
             //"player1": Meteor.user().emails[0].address,
             //"player2_id": invited._id,
             "player1": Meteor.user().username,
             "player2_id": invited._id,
             "player2": invited.username,
             "tilesp1":[],
             "tilesp2":[],
             "scorep1": 0,
             "scorep2": 0,
             "questionsp1":[],
             "questionsp2":[],
             "turn": 0,
             "pending":true,
             "accepted":false,
             "rejected":false,
             "submitted": new Date().getTime(),
             "finished":0,
             "count":0,
             "bonustile": arr
         });

        return gameid;

        //send en mail til den der er blevet inviteret..
    },
    singlePlayer: function (id) {
        var inviter = Meteor.userId();

        // ensure the user is logged in
        if (!inviter)
            throw new Meteor.Error(401, "Du skal være logget ind for at invitere");

        //generer 5 tilfældige tal ml 1 og 49 til at placere bonus tiles på
        var arr = []
        while(arr.length < 5){
            var randomnumber=Math.ceil(Math.random()*49)

            var a = arr.indexOf(randomnumber);

            if ( a === -1 ) {

                arr.push(randomnumber);

            }



        }
        //console.log(arr);

        var gameid = Singleplayer.insert({
            "player1_id": inviter,
            "player1": Meteor.user().username,
            "tilesp1":[],
            "scorep1": 0,
            "questionsp1":[],
            "pending":true,
            "accepted":false,
            "rejected":false,
            "submitted": new Date().getTime(),
            "finished":0,
            "count":0,
            "bonustile": arr
        });

        return gameid;
    },
    editquestion: function(id, cat, quest, answ0, answ1, answ2, answ3, cor, radios){

        console.log('Data gemt' + id + cat + quest + answ0 + answ1 + answ2 + answ3 + cor + radios)

        Quizzes.update({_id:id}, {$set:{
            "category": cat,
            "question":quest,
            "answer_0": answ0,
            "answer_1": answ1,
            "answer_2": answ2,
            "answer_3": answ3,
            "correct": cor,
            "active": radios
        }});


    },
    createquestion: function(cat, created, active){

        var quizId = Quizzes.insert({
            "category": cat,
            "created":created,
            "active": active});
        return quizId;
    },

    addcategory: function(cat) {

        Categories.insert({'category': cat});

    },
    mailChangeTurn: function(id){
        //process.env.MAIL_URL="smtp://postmaster@sandbox0cbcbe15c9e346919a24fd77b3bd38d7.mailgun.org:9c92decdffcf3d1b8818e0b4c4afe2ae@smtp.mailgun.org:587/";
        //var inviter = Meteor.userId();
        var invited = Meteor.users.findOne({_id: id});
        var to = invited.emails[0].address;
        //console.log(to);
        var text = 'It´s your turn. Click this link to play: http://quizspil.fels.dk/mygames';

       Email.send({
            to: to,
            from: 'Forsvarets quiz spil <pfu-fu4@fak.dk>',
            subject: 'It´s your turn in the Naval English Quiz game',
            text: text
        });

    },
    mailInvitePlayer: function(id){

        var inviter = Meteor.userId();
        var finduser = Meteor.users.findOne({_id: inviter});
        var userName = finduser.username;

        var invited = Meteor.users.findOne({_id: id});
        var to = invited.emails[0].address;
        var text = 'You have been invited to play by ' + userName + '. Click this link to accept the challenge: http://quizspil.fels.dk/login';

        Email.send({
            to: to,
            from: 'Forsvarets quiz spil <pfu-fu4@fak.dk>',
            subject: 'Invitation to the Naval English Quiz game',
            text: text
        });

    },
    mailAcceptPlayer: function(id){

        var inviter = Meteor.userId();
        var finduser = Meteor.users.findOne({_id: inviter});
        var userName = finduser.username;

        var invited = Gamedata.findOne({_id: id});
        var findPlayer1 = invited.player1_id;
        var finduser1 = Meteor.users.findOne({_id: findPlayer1});

        var to = finduser1.emails[0].address;
        var text = userName + ' has accepted your challenge. Click this link to play: http://quizspil.fels.dk';

        Email.send({
            to: to,
            from: 'Forsvarets quiz spil <pfu-fu4@fak.dk>',
            subject: 'Accept of invitation',
            text: text
        });

    },
    insertWinner: function(userid, gamename){



        var date = new Date()
        //var wins = 'wins'+ gameid;
        //var data = {$inc:{wins: 1}};
        /*var obj = {key: 'value'}; //prints {key: "value"}
        var obj2 = {};
        var key = thisgameid;
        var val = obj2[key] = 1;*/
        //{someKey: 'someValue'}

        var query = {};
        var myCustomField = gamename;
        var myCustomValue = 1;
        query[myCustomField] = myCustomValue;
        //console.log('Et object  ' + JSON.stringify(query));
        Meteor.users.update({_id:userid},{$inc:query});


},
    deleteUser: function (userId) {
        var user = Meteor.user();
        if (!user || !Roles.userIsInRole(user, ['admin']))
            throw new Meteor.Error(401, "You need to be an admin to delete a user.");

        if (user._id == userId)
            throw new Meteor.Error(422, 'You can\'t delete yourself.');

        // remove the user
        Meteor.users.remove(userId);
    },

    addUserRole: function (userId, role) {
        var user = Meteor.user();
        if (!user || !Roles.userIsInRole(user, ['admin']))
            throw new Meteor.Error(401, "You need to be an admin to update a user.");

        if (user._id == userId)
            throw new Meteor.Error(422, 'You can\'t update yourself.');

        // handle invalid role
        if (Meteor.roles.find({name: role}).count() < 1)
            throw new Meteor.Error(422, 'Role ' + role + ' does not exist.');

        // handle user already has role
        if (Roles.userIsInRole(userId, role))
            throw new Meteor.Error(422, 'Account already has the role ' + role);

        // add the user to the role
        Roles.addUsersToRoles(userId, role);
    },

    removeUserRole: function (userId, role) {
        var user = Meteor.user();
        if (!user || !Roles.userIsInRole(user, ['admin']))
            throw new Meteor.Error(401, "You need to be an admin to update a user.");

        if (user._id == userId)
            throw new Meteor.Error(422, 'You can\'t update yourself.');

        // handle invalid role
        if (Meteor.roles.find({name: role}).count() < 1)
            throw new Meteor.Error(422, 'Role ' + role + ' does not exist.');

        // handle user already has role
        if (!Roles.userIsInRole(userId, role))
            throw new Meteor.Error(422, 'Account does not have the role ' + role);

        Roles.removeUsersFromRoles(userId, role);
    },

    addRole: function (role) {
        var user = Meteor.user();
        if (!user || !Roles.userIsInRole(user, ['admin']))
            throw new Meteor.Error(401, "You need to be an admin to update a user.");

        // handle existing role
        if (Meteor.roles.find({name: role}).count() > 0)
            throw new Meteor.Error(422, 'Role ' + role + ' already exists.');

        Roles.createRole(role);
    },

    removeRole: function (role) {
        var user = Meteor.user();
        if (!user || !Roles.userIsInRole(user, ['admin']))
            throw new Meteor.Error(401, "You need to be an admin to update a user.");

        // handle non-existing role
        if (Meteor.roles.find({name: role}).count() < 1)
            throw new Meteor.Error(422, 'Role ' + role + ' does not exist.');

        if (role === 'admin')
            throw new Meteor.Error(422, 'Cannot delete role admin');

        // remove the role from all users who currently have the role
        // if successfull remove the role
        Meteor.users.update(
            {roles: role},
            {$pull: {roles: role}},
            {multi: true},
            function (error) {
                if (error) {
                    throw new Meteor.Error(422, error);
                } else {
                    Roles.deleteRole(role);
                }
            }
        );
    },

    updateUserInfo: function (id, property, value) {
        var user = Meteor.user();
        if (!user || !Roles.userIsInRole(user, ['admin']))
            throw new Meteor.Error(401, "You need to be an admin to update a user.");

        if (property !== 'profile.name')
            throw new Meteor.Error(422, "Only 'name' is supported.");

        obj = {};
        obj[property] = value;
        Meteor.users.update({_id: id}, {$set: obj});

    },
    clientEditUser: function (email, username, firstname, lastname, nat, service) {

        var user = Meteor.user();
        //console.log('brugernavn: '+user._id)
        Meteor.users.update({_id:user._id},{$set:{
            email: email,
            profile: {

                firstname: firstname,
                lastname: lastname,
                nationality: nat,
                Service: service

            },
            username: username
        }

        });

    },
    'deleteFile': function(nameid, id) {
        //check(nameid, String);
//console.log(nameid)
        var upload = Uploads.findOne({url:nameid});
        if (upload == null) {
            throw new Meteor.Error(404, 'Upload not found'); // maybe some other code
        }

        UploadServer.delete(upload.path);
        Uploads.remove({url:nameid});

    }


});


Accounts.config({
    //sendVerificationEmail: true
    //forbidClientAccountCreation: false
});

Meteor.startup(function() {
    // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
    Accounts.emailTemplates.from = 'Forsvarets quiz spil <pfu-fu4@fak.dk>';
    // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
    Accounts.emailTemplates.siteName = 'Forsvarets quiz spil';
    // A Function that takes a user object and returns a String for the subject line of the email.
    Accounts.emailTemplates.verifyEmail.subject = function(user) {
        return 'Bekræft din emailadresse';
    };

    // A Function that takes a user object and a url, and returns the body text for the email.
    // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
    Accounts.emailTemplates.verifyEmail.text = function(user, url) {
        return 'Klik på dette link for at verificere denne email adresse tilhører dig: ' + url;
    };

    // init items collection
    /*if (Items.find().count() == 0) {
        Items.insert({name: 'My Item', uploads: []});
    }*/

    UploadServer.init({
        tmpDir: process.env.PWD + '/uploads/tmp',
        uploadDir: process.env.PWD + '/uploads/',
        checkCreateDirectories: true,
        getDirectory: function(fileInfo, formData) {
            if (formData && formData.directoryName != null) {
                return formData.directoryName;
            }
            return "";
        },
        getFileName: function(fileInfo, formData) {
            if (formData && formData.prefix != null) {
                // console.log('Vi logger stien '+ formData.prefix + '_' + fileInfo.name);
                return formData.prefix + '_' + fileInfo.name;
            }
            return fileInfo.name;
        },
        finished: function(fileInfo, formData) {
            if (formData && formData._id != null) {
                //console.log('vi logger fileinfo '+fileInfo.path)
                //console.log('vi logger formdata '+formData.directoryName)
                Items.update({_id: formData._id}, { $push: { uploads: fileInfo }});
            }
        }
    });
});
