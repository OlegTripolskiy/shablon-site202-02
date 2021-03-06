/* globals dictionary */
// ==== МОДУЛЬ ТРАНСКРИПЦИЙ АНГЛИЙСКИХ СЛОВ - СТАРЫЙ. =====================
$(document).ready(function () {
    "use strict"; // Директива ECMAScript 5, ставим в начале сценария или функции

    // 3. ==== МОДУЛЬ АНГЛИЙСКИХ СЛОВ =======================================================
    // 3.1. - создаем JS-МАССИВ всех англ. слов, имеющих class = 'tr' - translation для передачи на сервер
    let engWords = [];// создаю массив ВСЕХ английских слов находящихся на странице (класс .tr)
    //let  addToDictionary; // Переменная для массива для добавления в словарь слов не получивших транскрипцию.

    // --- Создаем массив ВСЕХ англ. слов, находящихся на странице (имеющих класс .tr)
    $('.tr').each(function (indx, elem) { // Получаем ВСЕ слова с классом tr
        let word = $(elem).text().toLowerCase(); // записываем английское слово в нижнем регистре в переменную
        word = $.trim(word);// ОЧИЩАЕМ: удаляем возможные пробелы слева и справа
        //alert('='+word+'-'); // Проверка работает ли функция.
        // заполняем массив англ. словами, которых нет еще в массиве
        if (engWords.indexOf(word) === -1) { // если в массиве нет этого слова
            engWords.push(word);// то добавляем в него новое слово
        }
    });// конец МОДУЛЬ англ. слов часть 1.

    //  3.2. --- Передача массива слов на сервер (AJAX) и ПРИХОД слов уже с транскрипцией и переводом ----
    // ПОЛУЧЕННЫЙ перевод и тр-я ==> в переменную dictionery созданную скриптом в hrml <p id="for-script"><script>
    // ВЗЯТЬ ИЗ ВЕРСИИ ДЛЯ СЕРВЕРА.

    // 3.3 --- ЗАПИСЬ перевода в атрибут data-tr для показа всплывающих подсказок. ------------
    let addToDictionary = []; //создаем массив для добавления в словарь (слов не нашедших перевод)
    // --- Добавляем в массив слова, не нашедшие перевода на сервере. -----
    $('.tr').each(function (indx, elem) { // Получаем ВСЕ слова с классом tr.
        let word1 = $.trim($(elem).text().toLowerCase()); // Удаvяем пробелы, табы, переносы строк + в нижний регистр
        if (dictionary.hasOwnProperty(word1)) {
            $(elem).attr('data-tr', dictionary[word1][0] + ' - ' + dictionary[word1][1]);
        } else { // ИНАЧЕ создаем массив отсутствующих переводов слов и отправляем их на сервер noWordTranslate(word);
            addToDictionary.push(word1);
        }
    });
  /**/
    //	3.4. --- МЕНЯЕМ ПОЛОЖЕНИЕ ::after в зависимости от правого края окна
    $('.tr').hover(function () {
        let el = $(this); // Получаем кликнутый элемент или hover.
        // Вычисляем расстояние от левого края элемента до правого края окна браузера.
        // Лучше было бы до края article, но координаты слова либо от окна браузера,
        //  либо задавать position родителю, но тогда ломается Оглавление.
        let elemCoord = this.getBoundingClientRect(); // В объекте пишем координаты краев элемента
        let distance = $(".main").width() - elemCoord.left;
        if (distance < 201) {
//            console.log(" Считаем ");
            el.addClass('tr-left'); //... сдвинаем влево ::after на 200px
        }
        //distance = el.parent().width() - el.position().left; // ? Заново пересчитываем
    });

    // 3.6 === Показ транскрипций слов для SENSITIVE и DESKTOP.  ===
    
      // --- КОНТРОЛЬ СОБЫТИЙ (DESKTOP или SENSITIVE)
  /*
    $('.tr').on('touchend', function(event){ // Отслеживаем СРАЗУ ДВА события.
        //alert(" Сработало - " + event.type );
        //$('.tr').removeClass('show'); // Удаляем у всех ПОКАЗ псевдоклассов.
        //$(this).addClass("show");     // Показываем псевдоклассы только у текущего
    });
  */
    $('span.tr-ex').hover(function(event){
        $('span.tr-ex').not($(this)).removeClass('show'); // Удаляем у всех ПОКАЗ псевдоклассов.
        $(this).addClass("show");     // Показываем псевдоклассы только у текущего
    });
      // --- Убрать транскрипцию кликом на свободное место.
    $('body:not(.tr-ex)').on('click', function(event){
        $('.tr-ex').removeClass('show');
    });
  
    
   /* 
    $('.tr').on('touchend mouseover', function(event){ // Отслеживаем СРАЗУ ДВА события.
        if ($("#tir").prop('checked') == true) { // Если checkbox показа транскрипций включен
            if (event.type === 'touchend') { // Если СЕНСОРНОЕ событие
                return true;
                alert('touchend');
                //$('.tr').removeClass('show'); // Удаляем у всех ПОКАЗ псевдоклассов.
                $(this).addClass("show");     // Показываем псевдоклассы только у текущего
            } else if (event.type === 'mouseover') { // Если курсор 
                alert($(this).html()); //
                //$('.tr').removeClass('show'); // Удаляем у всех ПОКАЗ псевдоклассов.
                $(this).addClass("show"); // Показываем псевдоклассы только у текущего
            } // Конец внутренноего if
        } else {  // Если checkbox показа транскрипций выключен
            //$('.tr').removeClass('show');
        } // Конец внешнего if
    }); // Конец on 'touchend mouseover' 
  */
  
    // ----- конец всплывающих подсказок	-----------------------------------------
}); // КОНЕЦ $(document).ready(function() {})