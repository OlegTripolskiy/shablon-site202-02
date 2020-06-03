// === УПРАЖНЕНИЯ по АНГЛИЙСКОМУ ЯЗЫКУ ==========
$("document").ready(function () {
    
  // ===  Для SENSITIVE. Показ транскрипций слов в упражнениях с sortable. ===
    $('.tr-1').on('touchend mouseover', function(event){
      if (event.type == 'touchend') {
        $('.tr-1').removeClass('new');
        $(this).addClass("new");
      } else if (event.type == 'mouseover') {
        alert("mouseover");
        $('.tr-1').removeClass('new');
        $(this).addClass("new");
      } // Конец if
      
    }); // Конец функции
  
    // === Для DESKTOP ========
  /*
    $(document).on("mouseover", ".tr-1", function(){
      $(this).css("color", "red");
      console.log('PC');
      //$('.tr-1').removeClass('new');
      //$(this).addClass("new");
    });
  */
    // Убираем показанную транскрипцию после клика в любом другом месте
    //$('body').not('.tr-1').on('click', function(){
   //   $('.tr-1').removeClass('new');  //Удаляем псевдоэлемнты англ.слов в упраженениях
   // });
  
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