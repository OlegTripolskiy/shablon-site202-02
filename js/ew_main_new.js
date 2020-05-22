/*globals alert*/
// МОДУЛЬ 2020 АНГЛИЙСКИЙ СЛОВ (ТРАНСКРИПЦИЙ)
$(document).ready(function () {
    "use strict"; // Директива ECMAScript 5, ставим в начале сценария или функции
    //alert("OK");
    // 3. ==== МОДУЛЬ АНГЛИЙСКИХ СЛОВ =======================================================

    // 3.1. - СОЗДАЕМ JS-МАССИВ всех англ. слов, имеющих class = 'tr' - translation для передачи на сервер
    let engWords = [];// создаю массив ДЛЯ ВСЕХ английских слов находящихся на странице (класс .tr)
    $('.tr').each(function (indx, elem) { // Получаем ВСЕ слова с классом tr
        let word = $(elem).text().toLowerCase(); // Записываем английское слово в нижнем регистре в переменную
        word = $.trim(word);// ОЧИЩАЕМ: удаляем возможные пробелы слева и справа
        // Заполняем массив англ. словами, которых нет еще в массиве
        if (engWords.indexOf(word) === -1) { // Если в массиве нет этого слова (-1)
            engWords.push(word);// Tо добавляем в него новое слово
        }
    }); // Конец МОДУЛЬ англ. слов часть 1.

    //3.2. - ОТПРАВЛЯЕМ выбранные слова на сервер СТРОКОЙ вида: ,Lorem,Ipsum,Aldus,PageMaker,display
    let str = engWords.join(","); // Преобразовываю массив в строку вида: ,Lorem,Ipsum,Aldus,PageMaker,display
    $.ajax({
        type: "POST",
        url: "ew_transcription/ew_get.php", // Файл-обрабочик
        data: str, // Данные для отправки
        success: function (result) { // Действия при удачном полученнии данных
            console.log(result);
        }
    });
    //alert(data);

});