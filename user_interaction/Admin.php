<?php
session_start();
if(isset($_SESSION['Admin'])){
   	 	header('Location: Adminpage.php');
   }
include_once '../classes/Admin.php';
include_once '../Database/database.php';
include_once '../Database/adminQuery.php';
include_once 'includes/header.inc.php';
$admin = new Admin();
$query = new Admin_Queries();
$pageTitle = 'Admin Login';
if(isset($_POST['login'])){
	$var = True;
 $username = $_POST['username'];
 $password = $_POST['password'];
 $admin->set_adminName($username);
 $admin->set_adminPassword($password);
 if($admin->login()){?>
  <style>
 	.alert{width:300px;margin: 10px auto;}
 </style>
  <div class="alert alert-success" role="alert">
  <strong>Login Success!</strong><a href="Adminpage.php" class="alert-link">Click Here</a>.
</div>
 <?php
 }else { 
 ?>
 <style>
 	.alert{width:300px;margin: 10px auto;}
 </style>
 	<div class="alert alert-danger alert-dismissible" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  <strong>Sorry</strong> Login Fail !
  </div>
  <?php
 }
}
?>
<!DOCTYPE html>
<html>
<title>Admni Login</title>
<form class="login" action="admin.php" method="POST">
    <h2> Admin Login </h2>
     <input class="form-control" type="text" name="username" placeholder="userName..." />
     <input class="form-control" type="password" name="password" placeholder="password..." />
     <input class="btn btn-primary btn-block" type="submit" value="login" name="login"/>
    </form>
</html>

<?php include 'includes/footer.inc.php';?>

<style>
  
.login{
  width: 400px;
  margin : 50px auto;
}
 .h2{
  color:black;
 }
.login input{
margin-bottom: 10px;
}
.login .form-control{
 background-color: #EAEAEA;
}
</style>