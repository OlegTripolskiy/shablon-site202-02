<?php
  $ew = $_POST['name']; // Получаю строку вида: ,Lorem,Ipsum,Aldus,PageMaker,display
  echo "<br>";

  $my_array = explode(',', $ew); // Преобразую строку в массив php.

// --- НАЧАЛО страницы -------  
echo <<<PAGE
<!DOCTYPE html>
<html lang="ru">
<!-- SHABLON СТРАНИЦЫ.  Page Insight 99 / 100
ФАЙЛ ОПИСАНИЯ D:\w10 КОНСПЕКТЫ_w7\ВЕРСТКА mobile шаблона КОНСПЕКТЫ
-->
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name=viewport content="width=device-width, initial-scale=1">
<!--  <link rel="stylesheet" type="text/css" href="css/main.css" /> -->
<!--  <link id="link_chcolor" rel="stylesheet" type="text/css" href="css/color_grey.css" /> -->
  <title> EW - для подготовки</title>
  <style>
    #table-ew {
      font-size: 14px;
      border-collapse: collapse;
      color: green;
    }
    .table-td {
      text-align: center;
      border: 1px solid blue;
    }
    #table-ew tr td:nth-child(1) {width: 200px;}
    #table-ew tr td:nth-child(2) {width: 400px; text-align: left;}
  </style>
</head>
<body>
  <h3> Здесь будет таблица с полученными словами для замены в коде</h3>
  <!--   Таблица для английских слов и добавки тэга с атрибутами   -->
  <!--   Записываю стили прямо здесь, чтобы не париться отдельно в файле css  -->
  <table id="table-ew">
    <tr>
      <td class="table-td"> Английское слово </td>
      <td class="table-td"> Слово с оберткой  большой длины  </td>
    </tr>
PAGE;

// Цикл выводящий полученные слова
for ($i = 0; $i < count($my_array); $i++) { // Перебираю массив в цикле.
echo <<<TABLE_LOOP
  <tr>
    <td class='table-td'>$my_array[$i]</td>
    <td class='table-td'>&lt;span class=&quot;tr&quot; data-tr=&quot;&quot;&gt;$my_array[$i]&lt;/span&gt;</td>
  </tr>
TABLE_LOOP;
}
  
// --- Конец страницы -------  
echo <<<TABLE_END
  </table>
</body>
</html>
TABLE_END;
?>