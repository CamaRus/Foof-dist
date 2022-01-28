<?php
$_POST = json_decode(file_get_contents("php://input"), true); //для получения json данных
echo var_dump($_POST);
echo var_dump('Успешно!');