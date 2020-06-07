// === УПРАЖНЕНИЯ по АНГЛИЙСКОМУ ЯЗЫКУ ==========
$("document").ready(function () {
    

  
    // ======= SORTABLE =========================
  
    // ---- SORTABLE СПИСКАМИ НОВОЕ -----
    $('#in-1, #in-2, #in-3').sortable({
      connectWith: ".sort",
      items: "li:not(.title)" // ГРУППИРУЕМЫЕ элементы
    }).disableSelection();
  
  
    // --- SORTABLE - СТРОКАМИ ТАБЛИЦЫ --------
    // Функция, которая не дает строке уменьшаться при переключении.
    let fixHelper = function(e, ui) {
        ui.children().each(function() {
            $(this).width($(this).width());
        });
        return ui;
    };

    $('.ex-type-1 tbody').sortable({
        connectWith:".connectedSortable",
        helper: fixHelper
    });



  
    // --- SORTABLE ДИВАМИ ------------
    $( "#sortable" ).sortable({
        axis: 'y',
        cancel:".disabled",
        items:"li:not(.disabled)"
    }).disableSelection();
    // disableSelection для отмены выделения текста на элементах;
    

    // ======= DRAGGABLE =========================
    //  --- Для сенсорных экранов ВЫДЕЛЯЕМ предлог зеленым кругом. ---
    // Добввяем класс при прикосновении
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