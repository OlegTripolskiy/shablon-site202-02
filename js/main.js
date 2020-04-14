/* Эти два комментария позволяют JSLint убрать предупреждение о том, что $ и jQuery не определены до их использования
*  т.к. он в ЭТОМ скрипте не видит определения $ и jQuery до их использования.
*/
/*jslint browser: true*/
/*global $, window*/
// Если я хочу использовать имя jQuery, то я должен добавить , jQuery
$("document").ready(function () {
  "use strict"; // Директива ECMAScript 5, ставим в начале сценария или функции 
  
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

    