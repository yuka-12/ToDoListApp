<?php

require_once('ToDoList.class.php');

$data = new ToDoList();
$data->deleteData($_GET['id']);
