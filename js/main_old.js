$(document).ready(function() {
  
  // 2. ==== смена позиции sidebar с помощью JS. ==================================
  $('[name = sd-place]').click(function() {
    var a = $(this).attr('id');
    if (a == 'left') $('.main').css('flex-direction', 'row');
    else if (a == 'right') $('.main').css('flex-direction', 'row-reverse');
  });
  
  // ===== управление ГЛАВНЫМ МЕНЮ (ширина разделителя) ===============
  // Функция устанавливающая ширину разделителей (pipe) гл. меню.
  function set_pipe_width(){
    var width_mmenu = $("#m-menu").width(); // Получаем ширину главного меню
    var width_spans = 0; // Инициализируем счетчик суммы длин пунктов меню.
    
    // Получаем набор ВСЕХ элементов меню и суммируем их ширину.
    $('#m-menu > span.item').each(function(indx){
       width_spans += +$(this).width(); // Суммируем ширину ВСЕХ элементов гл.меню
    });
    
    // Сравниваем сумму с шириной гл.меню и показыаем или нет разделитель
    // К ширине меню доавляю 1, чтобы ЧЕТКО сравнивалось с суммой чисел (float)
    if(width_spans > width_mmenu + 1){  
       $('#m-menu > span.pipe').removeClass("pipe2"); // border-right-width: 2px;
       $('#m-menu > span.pipe').addClass("pipe0");    // border-right-width: 0px;
       //alert("сумма=" + width_spans + ", ширина="+width_mmenu + ", больше");
    }
    else {
       $('#m-menu > span.pipe').removeClass("pipe0");
       $('#m-menu > span.pipe').addClass("pipe2");
       //alert("сумма=" + width_spans + ", ширина="+width_mmenu + ", меньше");
    }
  }; // Конец set_pipe_width()
  
  set_pipe_width(); // Запускаем функцию при загрузке страницы
  
  // Запускаем функцию при измении ориентации.
  $(window).resize(function(){  
    set_pipe_width(); 
  }); 
  // --- Конец управления шириной разделителей гл. меню.
    
  // ---- управление ЦВЕТОМ главного меню ---------
  $('#m-menu > span').click(function (indx){
    $('#m-menu > span').removeClass("clicked");
    $(this).addClass("clicked");
  });  
  // === Конец управлением главного меню. ===========
  
  
  // !!!!! ВЗЯТО ИЗ D:\WEB_FILES_2020\shablon-site2012\index.html - ПРОВЕРИТЬ РАБОТУ
  // КУКИ ДОЛЖНЫ ЗАПИСЫВАТЬСЯ ПРИ УХОДЕ С САЙТА, а НЕ ПРИ КЛИКЕ НА цветной прямоугольник.
  function setCookie (name, value, expires, path, domain, secure) {
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
      }
  
  

      // 3. ==== МОДУЛЬ АНГЛИЙСКИХ СЛОВ =======================================================
      // 3.1. - создаем JS-МАССИВ всех англ. слов, имеющих class = 'tr' - translation для передачи на сервер

      var engWords = [];// создаю массив английских слов находящихся на странице
      var word; // Переменная для записи перебираемых в цикле английских слов
      $('.tr').each(function(indx, elem){ // Получаем ВСЕ слова с классом tp
        word = $(elem).text().toLowerCase() ; // записываем английское слово в нижнем регистре в переменную
        word =$.trim(word);//удаляем возможные пробелы слева и справа
        //alert('='+word+'-'); // Проверка работает ли функция.
        // заполняем массив англ. словами, которых нет еще в массиве
      if(engWords.indexOf(word) == -1) { // если в массиве нет этого слова
      engWords.push(word);// то добавляем в него новое слово
      }
      });// конец МОДУЛЬ англ. слов часть 1.
      /**/

      //  3.2. --- Передача массива слов на сервер (AJAX) и ПРИХОД слов уже с транскрипцией и переводом ----


      // 3.3 --- ЗАПИСЬ перевода в атрибут data-tr для показа всплывающих подсказок. ------------
      var addToDictionary = []; //создаем массив для добавления в словарь (слов не нашедших перевод)
      var word1;
      $('.tr').each(function(indx, elem){
        word1 = $.trim( $(elem).text().toLowerCase()); // Удаvяем пробелы, табы, переносы строк + в нижний регистр
        if(word1 in dictionary) {		// Переменная dictionary УЖЕ д.б. СОЗДАНА в <p id="for-script"><script>
          $(elem).attr('data-tr',dictionary[word1][0]+' - '+dictionary[word1][1]);
        } // ИНАЧЕ создаем массив отсутствующих переводов слов и отправляем их на сервер noWordTranslate(word);
        else {
          addToDictionary.push(word1);
        }
      });

      //	3.4. --- МЕНЯЕМ ПОЛОЖЕНИЕ ::after в зависимости от правого края окна
      $('.tr').hover(function(){
        el = $(this);
        // Вычисляем расстояние от левого края элемента до правого края окна браузера.
        // Лучше было бы до края article, но координаты слова либо от окна браузера, либо задавать position родителю, но тогда ломается Оглавление.
        var elemCoord = this.getBoundingClientRect(); // В объекте пишем координаты краев элемента
        var distance = $(".main").width() - elemCoord.left;
        if(distance < 201) el.addClass('tr-left'); //... сдвинаем влево ::after на 200px
        var distance = el.parent().width() - el.position().left;
      });

      //	3.5.  включение-отключение показа всплывающих подсказок
      $("#tir").click(function() {
        if($(this).prop('checked') == false) $('.tr').addClass('no-tr');
        else if($(this).prop('checked') == true)	$('.tr').removeClass('no-tr');
      });
      // ----- конец всплывающих подсказок	-----------------------------------------


  
}); // КОНЕЦ $(document).ready(function() {})