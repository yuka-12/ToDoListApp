<?php

require_once('ToDoList.class.php');

if (empty(file_get_contents("php://input"))) die();

$postedValue = json_decode(file_get_contents("php://input"), true);
$_POST = $postedValue;

if ($_POST['value'] && $_POST['id'] ) {
    $param = $_POST;
    $data = new ToDoList();
    $data->updateData($param);
    }


