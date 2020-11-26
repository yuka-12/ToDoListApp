<?php

require_once('ToDoList.class.php');
require_once('DatabaseConnect.class.php');

if (empty(file_get_contents("php://input"))) die();

$postedValue = json_decode(file_get_contents("php://input"), true);
$_POST = $postedValue;

if ($_POST['id'] && $_POST['value']) {
    $param = $_POST;
    $databaseConnect = new DatabaseConnect();
    $data = new ToDoList($databaseConnect);
    $data->updateData($param);
    }


