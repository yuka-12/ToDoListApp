<?php

require_once('Users.class.php');


// Define variables and initialize with empty values
$username = '';
$password = '';
$usernameErr = '';
$passwordErr = '';
 
$postedValue = json_decode(file_get_contents("php://input"), true);
$_POST = $postedValue;

// rocessing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Check if username is empty
    if (!$_POST['username']) {
        $usernameErr = "Please enter username.";
    } else {
        $username = $_POST['username'];
    }
    
    // Check if password is empty
    if (!$_POST['password']) {
        $passwordErr = "Please enter password.";
    } else {
        $password = $_POST['password'];
    }

    // Validate credentials
    if(empty($usernameErr) && empty($passwordErr)){
        $data = new Users();
        if ($data->login($username)) {
            echo json_encode(['message' => 'This username is already used.']);
        } else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $data->insertData([$username, $hashedPassword]);
        }
    } else {
        echo json_encode(['message' => 'This request is not valid.']);
    }
}
