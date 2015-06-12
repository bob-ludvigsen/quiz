/**
 * Created by bob on 04/03/15.
 */
Meteor.startup(function() {
    Uploader.finished = function(index, file) {
     //alert()
     //console.log(file.url)
     Uploads.insert(file);
     }
});