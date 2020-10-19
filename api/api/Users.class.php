<?php

require_once('Database.class.php');

class Users extends Database {

    protected $table = 'users';
    protected $columns = ['user', 'password'];

}