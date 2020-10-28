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
    $resultForFetch = [];
    $resultForFetch['item'] = $result;
    return json_encode($resultForFetch);
  }

  public function login($userName) {
    $sqlForGet = 'SELECT * FROM ' .$this->table. ' WHERE user_name =?';
    $values = [$userName];
    $stmtForGet = $this->executeStatement($sqlForGet, $values);
    $result = $stmtForGet->fetchAll(\PDO::FETCH_ASSOC);
    return ($result);
  }


    /**
     *
     * Insert new Todo
     *
     * @param    array  $parameters ['user_id', 'value']
     * 
     *
     */

  public function insertData($parameters) {
    $placeHolders = [];
    $strPlaceHolders = '';
    for ($i = 0; $i < count($this->columns); $i++) {
      $placeHolders[] = '?';
    }
    $strPlaceHolders = implode(',', $placeHolders);
    $sqlForInsert = 'INSERT INTO ' .$this->table. ' (' .implode(', ', $this->columns). ') VALUES (' .$strPlaceHolders. ')';
    $paramForInsert = [];
    foreach($parameters as $key => $value) {
      $paramForInsert[] = $value;
    }
    $stmtForInsert = $this->executeStatement($sqlForInsert, $paramForInsert);
  }
  
  /**
   *
   * Update Todo data
   *
   * @param    array  $parameters ['id' => , 'value' => ]
   * @return      array
   *
   */
  public function updateData($parameters) {
    $prmForUpdate = $parameters;
    $strPlaceHolders = '';
    $values = [];
    foreach($prmForUpdate as $key => $value) {
      if ($key !== 'id') {
        $strPlaceHolders .= $key. '=?, ';
        $values[] = $value;
      }
    }
    $values[] = $prmForUpdate['id'];
    $sqlForUpdate = 'UPDATE ' .$this->table. ' SET ' .$strPlaceHolders. 'updated_at = NOW() WHERE id=?';
    $stmtForInsert = $this->executeStatement($sqlForUpdate, $values);

  }

  public function deleteData($id) {
    $sqlForDelete = 'DELETE FROM ' .$this->table. ' WHERE id = ' .$id;
    $stmtForDelete = $this->executeStatement($sqlForDelete);
  }
  

}
