// === УПРАЖНЕНИЯ по АНГЛИЙСКОМУ ЯЗЫКУ ==========
$("document").ready(function () {
    //Удаляем псевдоэлемнты англ.слов в упраженениях
//    $('.tr-1').css("background", "red");
    //$('.tr-1').each(function(){ //!!!! РАБОТАЕТ
    //  $(this).addClass("new");
    //});
    $('.tr-1').on('touchend', function(){
      $('.tr-1').removeClass('new');
      $(this).addClass("new");
    });
  
    // Проверка клика на английском слове в sortable
    //$('.tr-1').click(function(){
    //  alert("Click!");
    //});
    
    // ======= SORTABLE =========================
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