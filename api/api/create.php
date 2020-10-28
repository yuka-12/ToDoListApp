<?php

require_once('ToDoList.class.php');

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $postedValue = json_decode(file_get_contents("php://input"), true);
    $_POST = $postedValue;

    if (!$_POST['value']) {
        echo json_encode(['message' => 'Please enter ToDo.']);
    } else {
    if ($_POST['userId']) {
        $param = [$_POST['userId'], $_POST['value']];
        $data = new ToDoList();
        $data->insertData($param);
        } else {
            echo json_encode(['message' => 'No userId found.']);
        }
    }
} else {
    echo json_encode(['message' => 'This request is not valid.']);
}
