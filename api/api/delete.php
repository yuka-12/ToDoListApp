<?php

require_once('ToDoList.class.php');
require_once('DatabaseConnect.class.php');

$databaseConnect = new DatabaseConnect();
$data = new ToDoList($databaseConnect);
$data->deleteData($_GET['id']);
