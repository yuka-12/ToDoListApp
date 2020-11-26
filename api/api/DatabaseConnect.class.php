<?php

class DatabaseConnect {

    private $servername;
    private $dbname;
    private $username;
    private $password;
    public $dbh = null;

    public function __construct() {
        
        $this->servername = getenv('DB_SERVER_NAME');
        $this->dbname = getenv('DB_NAME');
        $this->username = getenv('DB_USER_NAME');
        $this->password = getenv('DB_PASSWORD');
    
        try {
        $this->dbh = new PDO("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password);
        $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
        throw new Exception($e->getMessage());
        }
    }
    
}