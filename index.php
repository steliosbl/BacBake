<?php
include 'MobileDetect.php';
$detect = new Mobile_Detect();

if ($detect->isMobile()) {
    header('Location: mobile.html');
    exit(0);
}
else{
        header('Location: desktop.html');
    exit(0);
}