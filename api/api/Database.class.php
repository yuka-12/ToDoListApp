<?php


class Database {

  protected $dbh = null;
  protected $table;
  protected $columns;

  public function __construct($servername = "ToDoList_mysql", $username = "dbuser", $password = "password") {
    try {
      $this->dbh = new PDO("mysql:host=$servername;dbname=ToDoList", $username, $password);
      $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
      throw new Exception($e->getMessage());
    }
  }

  private function executeStatement( $statement = "" , $parameters = [] ){
    try{
        $stmt = $this->dbh->prepare($statement);
        $stmt->execute($parameters);
        return $stmt;

    }catch(Exception $e){
        throw new Exception($e->getMessage());   
    }		
  }  

  public function getData($userId) {
    $sqlForGet = 'SELECT * FROM ' .$this->table. ' WHERE user_id = ' . $userId;
    $stmtForGet = $this->executeStatement($sqlForGet);
    $result = $stmtForGet->fetchAll(\PDO::FETCH_ASSOC);
    return json_encode($result);
  }

  public function insertData($parameters) {
    $placeHolders = [];
    $strPlaceHolders = '';
    for ($i = 0; $i < count($this->columns); $i++) {
      $placeHolders[] = '?';
    }
    $strPlaceHolders = implode(',', $placeHolders);
    $sqlForInsert = 'INSERT INTO ' .$this->table. ' (' .implode(', ', $this->columns). ') VALUES (' .$strPlaceHolders. ')';
    $paramArray = json_decode($parameters, TRUE);
    $paramForInsert = [];
    foreach($paramArray as $key => $value) {
      $paramForInsert[] = $value;
    }
    $stmtForInsert = $this->executeStatement($sqlForInsert, $paramForInsert);
  }

  public function updateData($parameters) {
    $prmForUpdate = json_decode($parameters, TRUE);
    $strPlaceHolders = '';
    $values = [];
    foreach($prmForUpdate as $key => $value) {
      if ($key !== 'id') {
        $strPlaceHolders .= $key. '=?, ';
      }
      $values[] = $value;
    }
    $sqlForUpdate = 'UPDATE ' .$this->table. ' SET ' .$strPlaceHolders. 'updated_at = NOW() WHERE id=?';
    $stmtForInsert = $this->executeStatement($sqlForUpdate, $values);

  }

  public function deleteData($id) {
    $sqlForDelete = 'DELETE FROM ' .$this->table. ' WHERE id = ' .$id;
    $stmtForDelete = $this->executeStatement($sqlForDelete);
  }
  

}
