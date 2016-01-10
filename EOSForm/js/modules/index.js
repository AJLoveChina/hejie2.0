define(function (require, exports, module) {


    $(".component").draggable({
        revert : true
    });
    $("#container").droppable({
        drop : function (event, ui) {
            console.log("Something in my body");
            var from = ui.draggable;
            if (from.parents("#conponents").length !== 0) {
                $(this).append(from.clone().removeAttr("style"));
            }
        }
    });


    $("#container").sortable();

    $("#container, #gabbage").sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();
    $("#container").resizable();




});