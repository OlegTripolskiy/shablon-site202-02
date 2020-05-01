/*global $, window*/
// Если я хочу использовать имя jQuery, то я должен добавить , jQuery
$("document").ready(function () {
    "use strict"; // Директива ECMAScript 5, ставим в начале сценария или функции

    // ==== КУКИ ==================
    // --- ЗАПИСЬ КУКИ. Функци, записывающая куки -------------------
    function setCookie(name, value, daysToLive) {
        // Сохраняет пару имя/значение в виде cookie, кодируя значение с помощью
        // encodeURIComponent(), чтобы экранировать точки с запятой, запятые и пробелы.
        let cookie = name + "=" + encodeURIComponent(value);
        // Если в параметре daysToLive передается число, атрибут max-age
        // устанавливается так, что срок хранения cookie истекает через
        // указанное число дней. Если передать значение 0, cookie будет удален
        if (typeof daysToLive === "number") {
            cookie += "; max-age=" + (daysToLive * 60 * 60 * 24);
        } else {
            throw new Error('Параметр daysToLive должен быть числом.');
        }
        document.cookie = cookie;
    } // --- Конец запись куки

    // Функция ЧТЕНИЯ  куки с конкретным именем.
    // Источник: https://msiter.ru/tutorials/javascript/js_cookies
    function getCookie(cname) {
        let name = cname + "="; // Будем искать имя_куки=
        let decodedCookie = decodeURIComponent(document.cookie); // Декодируем, чтобы обработать спец. символы
        let ca = decodedCookie.split(';'); // Записываем в массив части (разделенные ;) декодированной строки
        for ( let i = 0; i < ca.length; i += 1) { // JSLint не любит инкременты и деккременты, поэтому i += 1
            let c = ca[i];
            // Этот кусок мне ПОКА не понятен. ЕСЛИ его убрать ничего не меняется.
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }// --- Конец while непонятому
            if (c.indexOf(name) === 0) { // Если имя куки начинается с самого начала
                return c.substring(name.length, c.length); // получаем значение куки.
            }
        } // --- Конец чтения куки
    } // === Конец ВСЕГО КУКИ ========================

    // ==== СМЕНА ЦВЕТОВ САЙТА ===============
    $(".color_scheme tr td").click(function () {
        let idAttr = $(this).attr("id");
        let colorFileNname = "css/" + idAttr + ".css"; // Создаем путь к файлу стилей цветов.
        $("#link_chcolor").attr("href", colorFileNname); // Записываем в тэг новый путь к файлу стилей цветов
        setCookie("file_of_color", colorFileNname, 5); // Записываем cookie с expire 5 days
    }); // === КОНЕЦ смена цветов сайта.

    // 2. ==== смена позиции sidebar с помощью JS. ==================================
    // ---- Смена позиции sidebar при КЛИКЕ
    $('[name = sd-place]').click(function () {
        let a = $(this).attr('id');
        if (a === 'left') {
            $('.main').css('flex-direction', 'row');
        } else if (a === 'right') {
            $('.main').css('flex-direction', 'row-reverse');
        }
        setCookie("s_menu", a, 5); // Записываем cookie с expire 5 days
    });

    // ---- УСТАНОВКА позиции sidebar от КУКИ
    function smenu() {
        let a = getCookie("s_menu"); // Получаем значение из КУКИ s_main
        if (a === "left") {
            $("#left").attr("checked", "checked"); // Кликаем левый импут
        } else if (a === "right") {
            $("#right").attr("checked", "checked"); // Кликаем правый импут
        }
    } // --- Конец функций САЙДБАРА.

    // ===== управление ГЛАВНЫМ МЕНЮ (ширина разделителя) ===============
    // Функция устанавливающая ширину разделителей (pipe) гл. меню.
    function setPipeWidth() {
        let widthMmenu = $("#m-menu").width(); // Получаем ширину главного меню
        let widthSpans = 0; // Инициализируем счетчик суммы длин пунктов меню.
        // Получаем набор ВСЕХ элементов меню и суммируем их ширину.
        $('#m-menu > span.item').each(function (indx) {
            widthSpans += Number($(this).width()); // Суммируем ширину ВСЕХ элементов гл.меню
        });
        // Сравниваем сумму с шириной гл.меню и показыаем или нет разделитель
        // К ширине меню доавляю 1, чтобы ЧЕТКО сравнивалось с суммой чисел (float)
        if (widthSpans > widthMmenu + 1) {
            $('#m-menu > span.pipe').removeClass("pipe2"); // border-right-width: 2px;
            $('#m-menu > span.pipe').addClass("pipe0");    // border-right-width: 0px;
             //alert("сумма=" + widthSpans + ", ширина="+widthMmenu + ", больше");
        } else {
            $('#m-menu > span.pipe').removeClass("pipe0");
            $('#m-menu > span.pipe').addClass("pipe2");
             //alert("сумма=" + widthSpans + ", ширина="+widthMmenu + ", меньше");
        }
    } // --- Конец setPipeWidth()

    // === Функции ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
    setPipeWidth(); // Запускаем функцию при ЗАГРУЗКЕ страницы
    // Читаем куки ПРИ ЗАГРУЗКЕ СТРАНИЦЫ.
    $("#link_chcolor").attr("href", getCookie("file_of_color"));  // Устанавливаем ЦВЕТ сайта.
    smenu(); // Установки куки sidebar при ПЕРЕЗАГРУЗКЕ

    // Запускаем функцию при измении ориентации.
    $(window).resize(function () {
        setPipeWidth();
    });
    // --- Конец управления шириной разделителей гл. меню.

    // ---- управление ЦВЕТОМ главного меню ---------
    $('#m-menu > span').click(function (indx) {
        $('#m-menu > span').removeClass("clicked"); // У ВСЕХ элементов меню удаляем класс clicked
        $(this).addClass("clicked"); // Ставим класс clicked кликнутому.
    });
    // === Конец управлением главного меню. ===========

    // ======= 2020  РАБОТА С ОГЛАВЛЕНИЕМ СТРАНИЦЫ =====
    // --- ПРИ ЗАГРУЗКЕ страницы показываем только МАЛЕНЬКОЕ оглавление страницы
    $("#toc-main").removeClass("toc-show").addClass("toc-show-none");
    $("#toc-small").removeClass("toc-show-none").addClass("toc-show");

    // --- В ОГЛАВЛЕНИИ страницы выделяем цветом раздел, если в адресной строке есть якорь. ---------
    // Присваиваем переменным значения.
    let hash = window.location.hash; // Получаем hash адресной строки (например, #toc_3)
    let tocLinks = $("#toc-ol li a"); // Для массива элементов из оглавления страницы

    // Если в адресной строке первым элементом хэша будет знак # , то:
    if (hash.search(/#/) === 0) {
        tocLinks.each(function () { // Выбираем ВСЕ ссылки в списке оглавления
            let el = $(this); // Получаем текущий элемент.
            if (hash === el.attr("href")) { // Если в массиве есть элемент с такой ссылкой
                el.addClass("selected"); // Выделяем элемент,  присваивая ему класс.
            }
        });
    } // --- Конец выделения цветом раздела, номер которого в хэше.

    // --- При клике на ссылке в списке ol li в оглавлении страницы ----
    tocLinks.click(function () {
        tocLinks.removeClass("selected"); // У ВСЕХ ссылок удаляем класс
        $(this).addClass("selected"); // Присваиваем класс кликнутой ссылке
        // Управляем видимостью оглавлений
        $("#toc-main").removeClass("toc-show").addClass("toc-show-none");
        $("#toc-small").removeClass("toc-show-none").addClass("toc-show");
    });

    // --- При клике на h4 в  оглавлении страницы ----
    $("#toc-h4").click(function () {
        tocLinks.removeClass("selected"); // Удаляем выделение
        // Управляем видимостью оглавлений
        $("#toc-main").removeClass("toc-show").addClass("toc-show-none");
        $("#toc-small").removeClass("toc-show-none").addClass("toc-show");
    }); // --- Конец click

    // --- При клике на малом оглавлении
    $("#toc-small").click(function () {
        $(this).addClass("toc-show-none");
        // Управляем видимостью оглавлений
        $("#toc-small").removeClass("toc-show").addClass("toc-show-none");
        $("#toc-main").removeClass("toc-show-none").addClass("toc-show");
    });
    // == Конец работы с ОГЛАВЛЕНИЕМ СТРАНИЦЫ ======


}); // -- Конец $("document").ready(function ()

