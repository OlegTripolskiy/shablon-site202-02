// === УПРАЖНЕНИЯ по АНГЛИЙСКОМУ ЯЗЫКУ ==========
$("document").ready(function () {
  // --- проба draggable --------------
    $( ".prep" ).draggable({
        containment:"#exercise-1", revert: true, revertDuration:0
    }); // --- Конец draggable

    // --- droppable
    $( ".drop" ).droppable({
        accept: ".prep",
        over: function(event, ui) {
            $(this).addClass("hover");
        },
        out: function(event, ui) {
            $(this).removeClass("hover");
        },
        drop: function(event, ui) {
            $(this).append(ui.draggable);
            $(this).removeClass("hover");
        }
    }); // --- Конец droppable

}); // Конец $("document").ready