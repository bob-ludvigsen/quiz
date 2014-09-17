/**
 * Created by pfu on 25/08/14.
 */
Meteor.methods({
    game: function (id) {
        var inviter = Meteor.userId();

        var invited = Meteor.users.findOne({_id: id});
       // console.log("Den der inviteres " + invited.emails[0].address);
        //console.log("User id på den der inviterer: " + Meteor.user().emails[0].address);
        // ensure the user is logged in
        if (!inviter)
            throw new Meteor.Error(401, "Du skal være logget ind for at invitere");

         var gameid = Gamedata.insert({
             "player1_id": inviter,
             "player1": Meteor.user().emails[0].address,
             "player2_id": invited._id,
             "player2": invited.emails[0].address,
             "tilesp1":[],
             "tilesp2":[],
             "scorep1":"0",
             "scorep2":"0",
             "questionsp1":[],
             "questionsp2":[],
             "turn":"0",
             "pending":true,
             "accepted":false,
             "rejected":false,
             "submitted": new Date().getTime(),
             "finished":0});

        return gameid;

        //send en mail til den der er blevet inviteret..
    }
});