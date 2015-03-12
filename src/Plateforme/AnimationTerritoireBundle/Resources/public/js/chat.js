$(document).ready(function(){
    $(".chat-open").click(function(){
        $(".chat").toggle(1000);
        $(".map-open").toggle(1000);
    });
    $(".map-open").click(function(){
        $("iframe").toggle(1000);
        $(".chat-open").toggle(1000);
    });


});