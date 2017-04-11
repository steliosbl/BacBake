var d = 5000;

$(document).ready(function() {
    all();
    setInterval(all, 5 * d);
});

function all() {
    setTimeout(one, d);
    setTimeout(two, 2 * d);
    setTimeout(three, 3 * d);
    setTimeout(four, 4 * d);
    setTimeout(five, 5 * d);
}

function one() {
    $("#link1").click();
}

function two() {
    $("#link2").click();
}

function three() {
    $("#link3").click();
}

function four() {
    $("#link4").click();
}

function five() {
    $("#link5").click();
}

function six() {
    $("#link6").click();
}
