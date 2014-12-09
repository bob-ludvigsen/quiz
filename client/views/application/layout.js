/**
 * Created by bob on 09/12/14.
 */

UI.registerHelper("portrait", function() {

    window.addEventListener("resize", myFunction);


    function myFunction() {
        if(window.innerWidth > window.innerHeight){

            $(".container").removeClass('box_rotate box_transition');
            $(".container").addClass('box_rotate_back box_transition');

        }
        else if(window.innerWidth < window.innerHeight){
            //alert('portrait')
            $(".container").removeClass('box_rotate_back box_transition');
            $(".container").addClass('box_rotate box_transition');
        }
    }

});


