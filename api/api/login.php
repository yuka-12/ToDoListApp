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
    
    // $username = 'user';
    // $password = 'password';

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
                echo $password_err;
            }
            
        } else {
            $username_err = "No account found with that username.";
            echo $username_err;
        }
    } else {
        echo 'This request is not valid.';
    }


    //     // Prepare a select statement
    //     $sql = "SELECT id, username, password FROM users WHERE username = ?";
        
    //     if($stmt = mysqli_prepare($link, $sql)){
    //         // Bind variables to the prepared statement as parameters
    //         mysqli_stmt_bind_param($stmt, "s", $param_username);
            
    //         // Set parameters
    //         $param_username = $username;
            
    //         // Attempt to execute the prepared statement
    //         if(mysqli_stmt_execute($stmt)){
    //             // Store result
    //             mysqli_stmt_store_result($stmt);
                
    //             // Check if username exists, if yes then verify password
    //             if(mysqli_stmt_num_rows($stmt) == 1){                    
    //                 // Bind result variables
    //                 mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password);
    //                 if(mysqli_stmt_fetch($stmt)){
    //                     if(password_verify($password, $hashed_password)){
    //                         // Password is correct, so start a new session
    //                         session_start();
                            
    //                         // Store data in session variables
    //                         $_SESSION["loggedin"] = true;
    //                         $_SESSION["id"] = $id;
    //                         $_SESSION["username"] = $username;                            
                            
    //                         // Redirect user to welcome page
    //                         header("location: welcome.php");
    //                     } else{
    //                         // Display an error message if password is not valid
    //                         $password_err = "The password you entered was not valid.";
    //                     }
    //                 }
    //             } else{
    //                 // Display an error message if username doesn't exist
    //                 $username_err = "No account found with that username.";
    //             }
    //         } else{
    //             echo "Oops! Something went wrong. Please try again later.";
    //         }

    //         // Close statement
    //         mysqli_stmt_close($stmt);
    //     }
    // }
    
    // // Close connection
    // mysqli_close($link);
}
