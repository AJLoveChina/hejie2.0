define(function (require, exports, module) {


    $(".component").draggable({
        revert : true
    });
    $("#container").droppable({
        drop : function (event, ui) {
            console.log("Something in my body");
            $(this).append(ui.draggable.clone().removeAttr("style"));
        }
    });

});