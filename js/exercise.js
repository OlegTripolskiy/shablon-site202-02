// === УПРАЖНЕНИЯ по АНГЛИЙСКОМУ ЯЗЫКУ ==========
$("document").ready(function () {
  
    // --- проба события tachstart
    $("#exercise-1").on('click', '.prep', function(){
      $(this).addClass('circle');
    });
    //$(".prep").addEventListener("click", go());
    
  // --- проба draggable --------------
    $( ".prep" ).draggable({
        containment:"#exercise-1", revert: true, revertDuration: 0,
        //cursor: "move", // ПРОБЛЕМА: Курсор появляется на краткий миг.
        //cursorAt: { top: 20, left: 20 } // Позиционироване элемент от курсора
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