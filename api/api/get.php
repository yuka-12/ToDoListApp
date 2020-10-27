<?php

require_once('ToDoList.class.php');

$data = new ToDoList();
echo $data->getData($_GET['user_id']);
