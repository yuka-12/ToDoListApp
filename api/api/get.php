<?php

require_once('ToDoList.class.php');
require_once('DatabaseConnect.class.php');

$databaseConnect = new DatabaseConnect();
$data = new ToDoList($databaseConnect);
echo $data->getData($_GET['user_id']);
