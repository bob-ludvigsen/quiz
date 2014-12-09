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
            var found=false;
            for(var i=1;i<arr.length;i++){
                if(arr[i]==randomnumber){found=true;break}
            }
            if(!found)arr[arr.length]=randomnumber;

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
    editquestion: function(id, cat, quest, answ0, answ1, answ2, answ3, cor, radios){

        /*"category": tmpl.find('#input-category').value,
            "question": tmpl.find('#input-question').value,
            "answer_0": tmpl.find('#input-spm1').value,
            "answer_1": tmpl.find('#input-spm2').value,
            "answer_2": tmpl.find('#input-spm3').value,
            "answer_3": tmpl.find('#input-spm4').value,
            "correct": tmpl.find('#input-correct').value*/

        Quizzes.update({_id:id}, {$set:{

            "category": cat,
            "active": radios,
            "question":quest,
            "answer_0": answ0,
            "answer_1": answ1,
            "answer_2": answ2,
            "answer_3": answ3,
            "correct": cor}});


    },
    createquestion: function(cat, created, active){

        Quizzes.insert({
            "category": cat,
            "created":created,
            "active": active});
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
            from: 'Forsvarets quiz spil <no-reply@forsvaretsquizspil.dk>',
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
            from: 'Forsvarets quiz spil <no-reply@forsvaretsquizspil.dk>',
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
            from: 'Forsvarets quiz spil <no-reply@forsvaretsquizspil.dk>',
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
        console.log('Et object  ' + JSON.stringify(query));

        //var count = SomeCollection.find(query).count();


       // Winlist.insert({'gamename':gamename, 'userid':userid, 'gameid':thisgameid, 'date': date});
        Meteor.users.update({_id:userid},{$inc:query});
       // { $inc: { quantity: -2, "metrics.orders": 1 }

}


});


Accounts.config({
    //sendVerificationEmail: true
    //forbidClientAccountCreation: false
});

Meteor.startup(function() {




    // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
    Accounts.emailTemplates.from = 'Forsvarets quiz spil <no-reply@forsvaretsquizspil.dk>';

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
});