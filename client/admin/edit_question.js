/**
 * Created by bob on 25/09/14.
 */

Template.editquestions.rendered = function () {

    var spotId = Session.get('qId');
    //var role = Meteor.user().roles;
    //alert(Session.get('qId'));
    //alert(spotId);
    var dropdata = Quizzes.findOne({_id: spotId});
    //alert(typeof dropdata.active);

    if (dropdata) {
    var active = $.parseJSON(dropdata.active);

    if (active == true) {
        $("#optionsRadios1").prop("checked", true);
        $("#optionsRadios2").prop("checked", false);
    }
    else {
        $("#optionsRadios1").prop("checked", false);
        $("#optionsRadios2").prop("checked", true);
    }
    }
};

Template.editquestions.helpers({

    quest: function() {
        var quizId = Session.get('qId');
        return Quizzes.findOne({_id: quizId});

    },
    questionInScope: function() {
        return Session.get('questionInScope');
    },
    categories : function(){
        return Categories.find().fetch();

    },
    myFormDataQuestion: function() {
        var quizId = Session.get('qId');
        return { directoryName: 'audioq', prefix: quizId, _id: quizId }
    },
    myFormDatawrong: function() {
        var quizId = Session.get('qId');
        return { directoryName: 'audiow', prefix: quizId, _id: quizId }
    },
    myFormDataImage: function() {
        var quizId = Session.get('qId');
        return { directoryName: 'images', prefix: quizId, _id: this._id }
    },

    filesToUpload: function() {
        return Uploader.info.get();
    },
    audioquestion: function() {
        return {
            finished: function(index, fileInfo, context) {

                var quizId =  Session.get('qId');
                //console.log('indsæt denne i question: '+ fileInfo.url + ' med id ' + quizId);
                //Uploads.insert(fileInfo);
                Quizzes.update({_id: quizId},{ $set:{audioquestion : fileInfo.url}})


            }

        }

    },
    audiowrong: function() {
        return {
            finished: function (index, fileInfo, context) {

                var quizId =  Session.get('qId');
                console.log('indsæt denne i audiowrong: '+ fileInfo.url + ' med id ' + quizId);
                //Uploads.insert(fileInfo);
                Quizzes.update({_id: quizId},{ $set:{audiowrong : fileInfo.url}})

            }

        }
    },
    Image: function() {
        return {
            finished: function (index, fileInfo, context) {

                var quizId =  Session.get('qId');
                console.log('indsæt denne i images: '+ fileInfo.url + ' med id ' + quizId);
                //Uploads.insert(fileInfo);
                Quizzes.update({_id: quizId},{ $set:{logo : fileInfo.url}})

            }

        }
    }
});



Template.editquestions.events({
    // add new user with email address
    'click .image': function(evt, tmpl) {
        evt.preventDefault();
        var quizId = this._id;
        //var quizId =  this.data._id;
        var file = tmpl.find('#image').files[0];
        var type = file.type;
        //console.log('Filtypen er: ' +  file.type);

        if(type == ("image/png") || ("image/gif") || ("image/bmp") || ("image/jpg")){
            var reader = new FileReader();
            reader.onload = function(e) {
               // alert('billede uploaded');
                Quizzes.update({_id: quizId},{ $set:{logo : e.target.result}});
                //return false;
            };
            reader.readAsDataURL(file);
        }
        else{
            alert('Du skal vælge en png, gif, bmp eller jpg fil');
        }

    },

    'click #delete-logo': function(evt, tmpl){
        evt.preventDefault();
        var quizId = this._id;
        var r = confirm("Vil du virkelig slette dette billede?");
        if (r == true) {
            //alert('fjern billede med id: ' + quizId)
            Quizzes.update({_id: quizId},{ $unset:{logo : ""}})
        }

    },

    'click .correct': function(evt, tmpl) {
        evt.preventDefault();
        var quizId = this._id;
        //var quizId =  this.data._id;
        var file = tmpl.find('#audio-correct').files[0];
        var type = file.type;
        //console.log('Filtypen er: ' +  file.type);
        if(type === "audio/mp3"){
        var reader = new FileReader();
        reader.onload = function(e) {
            //console.log("id er: " + quizId + "  sti er: " + e.target.result);
            //Posts.update({_id: postID},{ $set:{logo:e.target.result}});
            Quizzes.update({_id: quizId},{ $set:{audiocorrect : e.target.result}})
            //return false;
        };
        reader.readAsDataURL(file);
    }
        else{
            alert('Du skal vælge en mp3 fil');
        }

    },
    'click #audio-correct-delete': function(evt, tmpl){
        evt.preventDefault();
        var quizId = this._id;
        var r = confirm("Vil du virkelig slette denne lydfil?");
        if (r == true) {
            //alert('fjern lydfil med id: ' + quizId)
            Quizzes.update({_id: quizId},{ $unset:{audiocorrect : ""}})
        }

    },
    'click .wrong': function(evt, tmpl) {
        evt.preventDefault();
        var quizId = this._id;
        //var quizId =  this.data._id;
        var file = tmpl.find('#audio-wrong').files[0];
        var type = file.type;
        //console.log('Filtypen er: ' +  file.type);
        if(type === "audio/mp3"){
            var reader = new FileReader();
            reader.onload = function(e) {
                //console.log("id er: " + quizId + "  sti er: " + e.target.result);
                //Posts.update({_id: postID},{ $set:{logo:e.target.result}});
                Quizzes.update({_id: quizId},{ $set:{audiowrong : e.target.result}})
                //return false;
            };
            reader.readAsDataURL(file);
        }
        else{
            alert('Du skal vælge en mp3 fil');
        }

    },
    'click #audio-wrong-delete': function(evt, tmpl){
        evt.preventDefault();
        var quizId = this._id;
        var r = confirm("Vil du virkelig slette denne lydfil?");
        if (r == true) {
            //alert('fjern lydfil med id: ' + quizId)
            Quizzes.update({_id: quizId},{ $unset:{audiowrong : ""}})
        }

    },
    'click .audio-question': function(evt, tmpl) {
        evt.preventDefault();
        var quizId = this._id;
        //var quizId =  this.data._id;
        var file = tmpl.find('#audio-question').files[0];
        var type = file.type;
        //console.log('Filtypen er: ' +  file.type);
        if(type === "audio/mp3"){
            var reader = new FileReader();
            reader.onload = function(e) {
                //console.log("id er: " + quizId + "  sti er: " + e.target.result);
                //Posts.update({_id: postID},{ $set:{logo:e.target.result}});
                Quizzes.update({_id: quizId},{ $set:{audioquestion : e.target.result}})
                //return false;
            };
            reader.readAsDataURL(file);
        }
        else{
            alert('Du skal vælge en mp3 fil');
        }

    },
    'click #audio-question-delete': function(evt, tmpl){
        evt.preventDefault();
        var quizId = this._id;
        var r = confirm("Vil du virkelig slette denne lydfil?");
        if (r == true) {
            //alert('fjern lydfil med id: ' + quizId)
            Quizzes.update({_id: quizId},{ $unset:{audioquestion : ""}})
        }

    },
    'click .opret':function(evt, tmpl){
        evt.preventDefault();
        var radios = $("input[name='optionsRadios']:checked").val();


        var quizId = Session.get('qId');
        //alert(typeof radios);
        //var quizId =  this.data._id;
        var cat = tmpl.find('#input-category').value;
        var question = tmpl.find('#input-question').value;
        var answ1 = tmpl.find('#input-spm1').value;
        var answ2 = tmpl.find('#input-spm2').value;
        var answ3 = tmpl.find('#input-spm3').value;
        var answ4 = tmpl.find('#input-spm4').value;
        var correct = tmpl.find('#input-correct').value;

        Meteor.call('editquestion',quizId, cat, question, answ1, answ2, answ3, answ4, correct, radios);

        Router.go('/list_questions');
        //alert(options.correct);
    },
    'click .cancel':function(evt, tmpl) {

        Router.go('/list_questions')

    },



        '.question, keypress':function(evt, tmpl) {

        var max = 500;
        var len = tmpl.find('#input-question').value.length;
        if (len >= max) {
            $('#charNum').text(' Du har ikke flere karakterer tilbage');
        } else {
            var char = max - len;
            $('#charNum').text(char + ' karakterer tilbage');
        }
    },

  /*  'dragover #audio-correct' : function(e, t) {
        e.preventDefault();
        $(e.currentTarget).addClass('dragover');
    },

    'dragleave #audio-correct' : function(e, t) {
        $(e.currentTarget).removeClass('dragover');
    },

    'change #audio-correct' : function(e, tmpl) {
        e.preventDefault();

        //var files = e.target.files || e.dataTransfer.files;
        //var fileList = e.dataTransfer.files;
        //console.log(files[0]);
        //alert(files[0].name);
        var quizId = this._id;
        //var quizId =  this.data._id;
        var file = e.target.files[0];
        var type = file.type;
        //console.log('Filtypen er: ' +  file.type);
        if(type === "audio/mp3"){
            var reader = new FileReader();
            reader.onload = function(e) {
                //console.log("id er: " + quizId + "  sti er: " + e.target.result);
                //Posts.update({_id: postID},{ $set:{logo:e.target.result}});
                Quizzes.update({_id: quizId},{ $set:{audiocorrect : e.target.result}})
                //return false;
            };
            reader.readAsDataURL(file);
        }
        else{
            alert('Du skal vælge en mp3 fil');
        }



    },
    'dragover #audio-wrong' : function(e, t) {
        e.preventDefault();
        $(e.currentTarget).addClass('dragover');
    },

    'dragleave #audio-wrong' : function(e, t) {
        $(e.currentTarget).removeClass('dragover');
    },

    'change #audio-wrong' : function(e, tmpl) {
        e.preventDefault();

        //var files = e.target.files || e.dataTransfer.files;
        //var fileList = e.dataTransfer.files;
        //console.log(files[0]);
        //alert(files[0].name);
        var quizId = this._id;
        //var quizId =  this.data._id;
        var file = e.target.files[0];
        var type = file.type;
        //console.log('Filtypen er: ' +  file.type);
        if(type === "audio/mp3"){
            var reader = new FileReader();
            reader.onload = function(e) {
                //console.log("id er: " + quizId + "  sti er: " + e.target.result);
                //Posts.update({_id: postID},{ $set:{logo:e.target.result}});
                Quizzes.update({_id: quizId},{ $set:{audiowrong : e.target.result}})
                //return false;
            };
            reader.readAsDataURL(file);
        }
        else{
            alert('Du skal vælge en mp3 fil');
        }



    },
    'dragover #audio-question' : function(e, t) {
    e.preventDefault();
    $(e.currentTarget).addClass('dragover');
},

'dragleave #audio-question' : function(e, t) {
    $(e.currentTarget).removeClass('dragover');
},

'change #audio-question' : function(e, tmpl) {
    e.preventDefault();

    //var files = e.target.files || e.dataTransfer.files;
    //var fileList = e.dataTransfer.files;
    //console.log(files[0]);
    //alert(files[0].name);
    var quizId = this._id;
    //var quizId =  this.data._id;
    var file = e.target.files[0];
    var type = file.type;
    //console.log('Filtypen er: ' +  file.type);
    if(type === "audio/mp3"){
        var reader = new FileReader();
        reader.onload = function(e) {
            //console.log("id er: " + quizId + "  sti er: " + e.target.result);
            //Posts.update({_id: postID},{ $set:{logo:e.target.result}});
            Quizzes.update({_id: quizId},{ $set:{audioquestion : e.target.result}})
            //return false;
        };
        reader.readAsDataURL(file);
    }
    else{
        alert('Du skal vælge en mp3 fil');
    }



},*/

    'click .deleteQuestionAudio':function() {
        if (confirm('Er du sikker på du vil slette?')) {
            var quizId = Session.get('qId');

            var data = Quizzes.findOne({_id:quizId});
            var url = data.audioquestion;
            //alert('virker det?  '+ quizId )
            Meteor.call('deleteFile', url, quizId);
            Quizzes.update({_id: quizId},{ $unset:{audioquestion : ""}})

        }
    },
    'click .deleteQuestionWrong':function() {
        if (confirm('Er du sikker på du vil slette?')) {
            var quizId = Session.get('qId');

            var data = Quizzes.findOne({_id:quizId});
            var url = data.audiowrong;
            //alert('virker det?  '+ url )
            Meteor.call('deleteFile', url, quizId);
            Quizzes.update({_id: quizId},{ $unset:{audiowrong : ""}})

        }
    },
    'click .deleteImage':function() {
        if (confirm('Er du sikker på du vil slette?')) {
            var quizId = Session.get('qId');

            var data = Quizzes.findOne({_id:quizId});
            var url = data.audiowrong;
            //alert('virker det?  '+ url )
            Meteor.call('deleteFile', url, quizId);
            Quizzes.update({_id: quizId},{ $unset:{logo : ""}})

        }
    }

});
