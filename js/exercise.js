// === УПРАЖНЕНИЯ по АНГЛИЙСКОМУ ЯЗЫКУ ==========
$("document").ready(function () {
    /*
    $(document).on("touchstart  mousedown", ".prep", function(event) {
            //если касание, то вычисляем через event.originalEvent.touches[0]:
            if (event.type == "touchstart") {
              alert("TouchSTART");
                //var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
                //var offset = (touch.clientX - $(event.target).offset().left);
            }
            else {
            //если нажата кнопка мышки:
              let = 
              console.log("Mouse DOWN");
              //alert("Mouse DOWN");
                //var offset = (event.offsetX || event.clientX - $(event.target).offset().left);
            }
            //console.log(offset);
            //отменяем "всплытие сообщений", чтобы не вызывался клик на тач-устройствах.
            event.stopPropagation();
            event.preventDefault();
});
*/  
    // --- проба события tachstart - РАБОТАЕТ.
    $(".preposiotions").on('click', '.prep', function(){
      $(this).addClass('circle');
    });
    //$(".prep").addEventListener("click", go());
    
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