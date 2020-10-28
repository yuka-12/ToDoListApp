<?php

require_once('Users.class.php');


// Define variables and initialize with empty values
$username = '';
$password = '';
$username_err = '';
$password_err = '';
 
$postedValue = json_decode(file_get_contents("php://input"), true);
$_POST = $postedValue;

// rocessing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Check if username is empty
    if (!$_POST['username']) {
        $username_err = "Please enter username.";
    } else {
        $username = $_POST['username'];
    }
    
    // Check if password is empty
    if (!$_POST['password']) {
        $password_err = "Please enter password.";
    } else {
        $password = $_POST['password'];
    }
    
    // Validate credentials
    if(empty($username_err) && empty($password_err)){

        $data = new Users();
        if ($data->login($username)) {
            $userData = $data->login($username);
            if (password_verify($password, $userData[0]['password'])) {
                // TODO: set up token more securely
                $loginData = ['user_id' => $userData[0]['id'], 'userName' => $username, 'token' => 'fakeToken'];
                echo json_encode($loginData);
            } else {
                $password_err = "The password you entered was not valid.";
                echo json_encode(['message' => $password_err]);

            }
            
        } else {
            $username_err = "No account found with that username.";
            echo json_encode(['message' => $username_err]);
        }
    } else {
        echo json_encode(['message' => 'This request is not valid.']);
    }

}
