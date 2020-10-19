<?php

require_once('ToDoList.class.php');

if (empty(file_get_contents("php://input"))) die();

$postedValue = json_decode(file_get_contents("php://input"), true);
$_POST = $postedValue;

if ($_POST['user_id'] && $_POST['value']) {
    $param = [$_POST['user_id'], $_POST['value']];
    $data = new ToDoList();
    $data->insertData($param);
    }

