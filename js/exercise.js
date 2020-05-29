// === УПРАЖНЕНИЯ по АНГЛИЙСКОМУ ЯЗЫКУ ==========

// ======= SORTABLE =========================
$( "#sortable" ).sortable().disableSelection();
// disableSelection для отмены выделения текста на элементах;

// ======= DRAGGABLE =========================
//  --- Для сенсорных экранов ВЫДЕЛЯЕМ предлог зеленым кругом. ---
$("document").ready(function () {  // Добввяем класс при прикосновении
    $(document).on("touchstart", ".prep", function(event) {
        $(this).addClass('circle');
    });

    $(document).on("touchend", ".prep", function(event) {  // Удаляем класс при снятии пальца.
        $(this).removeClass('circle');
    });

  // --- проба draggable --------------
    $( ".prep" ).draggable({
        containment:"#exercise-1", revert: true, revertDuration: 0,
        //cursor: "move", // ПРОБЛЕМА: Курсор появляется на краткий миг.
        cursorAt: { top: 20, left: 20 } // Позиционироване элемент от курсора
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