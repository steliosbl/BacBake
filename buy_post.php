<?php
file_put_contents("post.log",print_r($_POST,true));
$first_name = $_POST['first_name']; // required
$last_name = $_POST['last_name']; // required
$email = $_POST['email']; // required
$telephone = $_POST['phone']; // not required
$num = $_POST['num']; // required

$email_from = 'form@bacbake.com';
$email_subject = "ΝΕΑ ΑΙΤΗΣΗ ΑΓΟΡΑΣ";
$email_body = "ΣΤΟΙΧΕΙΑ: \n ΟΝΟΜΑ: $first_name \n ΕΠΙΘΕΤΟ: $last_name \n EMAIL: $email \n ΤΗΛΕΦΩΝΟ: $telephone \n ΤΕΜΑΧΙΑ: $num";

$to = "orders@bacbake.com";
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $email \r\n";
$headers .= "Content-Type: text/html; charset=UTF-8";
mail($to,$email_subject,$email_body,$headers);

$email_from = 'orders@bacbake.com';
$email_subject = "ΝΕΑ ΑΙΤΗΣΗ ΑΓΟΡΑΣ";
$email_body = "$first_name $last_name, 

Η παραγγελία σας από το site bacbake.com έχει καταχωρηθεί επιτυχώς.

Ευχαριστούμε πολύ που επιλέξατε την εταιρεία μας.

Θα σας ενημερώσουμε σύντομα για την ακριβή ημερομηνία και διεύθυνση παραλαβής.

Θα χαρούμε πολύ να επικοινωνήσετε μαζί μας και στο μέλλον για να μοιραστείτε τις εμπειρίες σας από τη χρήση του BacBake.
                                      
                          Με εκτίμηση,
                      Η ομάδα της BacBake";

$to = $email;
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $email_from \r\n";
$headers .= "Content-Type: text/html; charset=UTF-8";
mail($to,$email_subject,$email_body,$headers);
?>