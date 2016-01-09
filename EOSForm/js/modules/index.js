define(function (require, exports, module) {


    $(".component").draggable();
    $("#container").droppable({
        drop : function (event, ui) {
            console.log("Something in my body");
            $(this).html(ui.draggable.clone().removeAttr("style"));
        }
    });

});