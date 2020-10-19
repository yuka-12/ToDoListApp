<?php

require_once('Database.class.php');

class ToDoList extends Database {

    protected $table = 'todolist';
    protected $columns = ['user_id', 'value'];
    
}