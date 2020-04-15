/* Эти два комментария позволяют JSLint убрать предупреждение о том, что $ и jQuery не определены до их использования
*  т.к. он в ЭТОМ скрипте не видит определения $ и jQuery до их использования.
*/
/*jslint browser: true*/
/*global $, window*/
// Если я хочу использовать имя jQuery, то я должен добавить , jQuery
$("document").ready(function () {
  "use strict"; // Директива ECMAScript 5, ставим в начале сценария или функции 
  
    // 2. ==== смена позиции sidebar с помощью JS. ==================================
  $('[name = sd-place]').click(function () {
    var a = $(this).attr('id');
    if (a === 'left') {
      $('.main').css('flex-direction', 'row');
    } else if (a === 'right') {
      $('.main').css('flex-direction', 'row-reverse');
    }
  });
  
  // ===== управление ГЛАВНЫМ МЕНЮ (ширина разделителя) ===============
  // Функция устанавливающая ширину разделителей (pipe) гл. меню.
  function set_pipe_width() {
    var width_mmenu,
      width_spans;
    width_mmenu = $("#m-menu").width(); // Получаем ширину главного меню
    width_spans = 0; // Инициализируем счетчик суммы длин пунктов меню.
    
    // Получаем набор ВСЕХ элементов меню и суммируем их ширину.
    $('#m-menu > span.item').each(function (indx) {
      width_spans += +$(this).width(); // Суммируем ширину ВСЕХ элементов гл.меню
    });
    
    // Сравниваем сумму с шириной гл.меню и показыаем или нет разделитель
    // К ширине меню доавляю 1, чтобы ЧЕТКО сравнивалось с суммой чисел (float)
    if (width_spans > width_mmenu + 1) {
      $('#m-menu > span.pipe').removeClass("pipe2"); // border-right-width: 2px;
      $('#m-menu > span.pipe').addClass("pipe0");    // border-right-width: 0px;
       //alert("сумма=" + width_spans + ", ширина="+width_mmenu + ", больше");
    } else {
      $('#m-menu > span.pipe').removeClass("pipe0");
      $('#m-menu > span.pipe').addClass("pipe2");
       //alert("сумма=" + width_spans + ", ширина="+width_mmenu + ", меньше");
    }
  } // Конец set_pipe_width()
  
  set_pipe_width(); // Запускаем функцию при загрузке страницы
  
  // Запускаем функцию при измении ориентации.
  $(window).resize(function () {
    set_pipe_width();
  });
  // --- Конец управления шириной разделителей гл. меню.
    
  // ---- управление ЦВЕТОМ главного меню ---------
  $('#m-menu > span').click(function (indx) {
    $('#m-menu > span').removeClass("clicked");
    $(this).addClass("clicked");
  });
  // === Конец управлением главного меню. ===========
  
  // ==== КУКИ ==================
  // Сохраняет пару имя/значение в виде cookie, кодируя значение с помощью 
  // encodeURIComponent(), чтобы экранировать точки с запятой, запятые и пробелы. 
  // Если в параметре daysToLive передается число, атрибут max-age 
  // устанавливается так, что срок хранения cookie истекает через 
  // указанное число дней. Если передать значение 0, cookie будет удален
  function setCookie(name, value, daysToLive) {
    var cookie = name + "=" + encodeURIComponent(value);
    
    if (typeof daysToLive === "number") {
      cookie += "; max-age=" + (daysToLive * 60 * 60 * 24);
    } else {
      throw new Error('Параметр daysToLive должен быть числом.');
    }
    document.cookie = cookie;
//    alert("Cookie записана");
  }
  
  setCookie("file", "Oleg", 5);
  
  
  // ======= 2020  РАБОТА С ОГЛАВЛЕНИЕМ СТРАНИЦЫ =====
  // --- ПРИ ЗАГРУЗКЕ страницы показываем только МАЛЕНЬКОЕ оглавление страницы 
  $("#toc-main").removeClass("toc-show").addClass("toc-show-none");
  $("#toc-small").removeClass("toc-show-none").addClass("toc-show");
  
  // --- В ОГЛАВЛЕНИИ страницы выделяем цветом раздел, если в адресной строке есть якорь. ------------ 
  // Объявляем переменные 
  var hash, // Для якоря из адресной строки.
    toc_links; // Для массива элементов из оглавления страницы
  // Присваиваем переменным значения.
  hash = window.location.hash; // Получаем hash адресной строки (например, #toc_3) 
  toc_links = $("#toc-ol li a"); // 
  
  // Если в адресной строке первым элементом хэша будет знак # , то:
  if (hash.search(/#/) === 0) {
    toc_links.each(function () { // Выбираем ВСЕ ссылки в списке оглавления
      var el = $(this); // Получаем текущий элемент.
      if (hash === el.attr("href")) { // Если в массиве есть элемент с такой ссылкой
        el.addClass("selected"); // Выделяем элемент,  присваивая ему класс.
      }
    });
  } // --- Конец выделения цветом раздела, номер которого в хэше.
  
  // --- При клике на ссылке в списке ol li в оглавлении страницы ----
  toc_links.click(function () {
    toc_links.removeClass("selected"); // У ВСЕХ ссылок удаляем класс
    $(this).addClass("selected"); // Присваиваем класс кликнутой ссылке 
    // Управляем видимостью оглавлений
    $("#toc-main").removeClass("toc-show").addClass("toc-show-none");
    $("#toc-small").removeClass("toc-show-none").addClass("toc-show");
  });
  
  // --- При клике на h4 в  оглавлении страницы ----
  $("#toc-h4").click(function () {
    toc_links.removeClass("selected"); // Удаляем выделение 
    // Управляем видимостью оглавлений
    $("#toc-main").removeClass("toc-show").addClass("toc-show-none");
    $("#toc-small").removeClass("toc-show-none").addClass("toc-show");
  });
  
  // --- При клике на малом оглавлении
  $("#toc-small").click(function () {
    $(this).addClass("toc-show-none");
    // Управляем видимостью оглавлений
    $("#toc-small").removeClass("toc-show").addClass("toc-show-none");
    $("#toc-main").removeClass("toc-show-none").addClass("toc-show");
  });
// == Конец   

  
}); // -- Конец $("document").ready(function ()

