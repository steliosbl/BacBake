"use strict";

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    window.location.replace("mobile.html"); 
}
else{
    window.location.replace("desktop.html");
}