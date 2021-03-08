<?php

if ($_POST['soulgem'] !== '')
{
	echo "error";
	exit();
}

$name = $_POST["first"] . " " . $_POST["last"];

$msg = "Name: " . $name . "\n";
$msg .= "Email: " . $_POST["email"] . "\n";
$msg .= "Phone: " . $_POST["phone"] . "\n";
$msg .= "Venue: " . $_POST["venue"] . "\n";
$msg .= "Dates: " . $_POST["dates"] . "\n\n";
$msg .= $_POST["message"] . "\n";

// use wordwrap() if lines are longer than 70 characters
//$msg = wordwrap($msg,70);

// $fromEmail = test_input($_POST["email"]);
// if (filter_var($fromEmail, FILTER_VALIDATE_EMAIL))
// {
// 	$fromEmail = 'From: "' . $name . '" <' . $_POST["email"] . '>';
// }
// else
// {
// 	$fromEmail = 'From: "Exit 85" <no-reply@exiteightyfive.com>';
// }

// send email
if(!mail("jack@exiteightyfive.com", "Exit 85 Website Contact", $msg, 'From: "Exit 85" <no-reply@exiteightyfive.com>'))
{
	mail("jacksutherl@gmail.com", "Exit 85 Website Failed to Send Contact", $msg, 'From: "Exit 85" <jack@exiteightyfive.com>');
}
//mail("jack@jacksutherland.com", "Band Contact", $msg, 'From: "Exit 85" <booking@exiteightyfive.com>');
//mail("exit85160@gmail.com", "Band Contact", $msg, 'From: "Exit 85" <booking@exiteightyfive.com>');
//mail("maxer28@yahoo.com", "Band Contact", $msg, 'From: "Exit 85" <no-reply@exiteightyfive.com>');

echo "success";

exit();

?>