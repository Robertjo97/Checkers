<?php 
session_start(); //start the session
session_unset(); //unset all session variables
session_destroy(); //destroy the session
header("Location: ./index.php"); //redirect to index.php
?>