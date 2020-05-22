$("document").ready(function () {
    "use strict";
    // === Работа по ручному выбору в массив английских слов на странице ================
    // 1. Добавляем стили таблице с англ. словами + дополнение в JS, чтобы не делать этого в html, css коде.
    $("#table-ew").css({ // Сама таблица
        "fontSize": "10px",
        "borderCollapse": "collapse",
        "color": "green",
        "backgroundColor": "white"
    });
    $("#table-ew tr td").css("border", "1px solid blue"); // все ячейки.
    $("#table-ew tr td:nth-child(1)").css("width", "40%");

    //  === ПОДГОТОВКА к оборачиванию англ. слов в <span class="tr" data-tr=""> =====
    // 2. Собираем слов в массив, который потом строкой отправим на сервер.
    let newWords = []; // Массив в котором будем собирать слова со страницы.

    // Источник кода расположенного ниже: https://learn.javascript.ru/selection-range
    document.onselectionchange = function () { // Событие срабабатывает, когда выделенный текст меняется
        document.onmouseup = function () { // Выделение ТОЛЬКО при mouseUp, иначе много срабатываний.
            let selection = document.getSelection().toString().trim(); // Получаем выделенный текст в виде объекта.
            if (!newWords.includes(selection)) { // При двойном клике выделенный текст НЕ совпадает ни с кем в массиве.
                newWords.push(selection); // Добавляем в массив НОВОЕ слово.
                let lastWord = newWords[newWords.length - 1]; // Получаем добавленный элемент
                $("#table-ew").append("<tr><td>" + lastWord + "</td></tr>"); // Добавляем новое слово в табицу.
            } // Конец if
        }; // Конец onmousup
    }; // --- Конец document.onselectionchange

    // 3. Отправка данных на сервер.
    $("#send-ew").click(function () {
        // Эти операции происходят ДО отправки данных на сервер.
        let data = newWords.join(","); // Преобразовываю массив в строку вида: ,Lorem,Ipsum,Aldus,PageMaker,display
        $("#proba").val(data); // Записываю строку в imput
        // Затем произойдет отправка т.к. нажата кнопка в форме
    });
});