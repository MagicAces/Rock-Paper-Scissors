const choices = ["scissors", "paper", "rock"];


var storage = window.localStorage;
$(".score p").html(storage.getItem('score'));

$(".rules").click((event) => {
    $(".dialog-back").css("display", "block");
});

$("dialog img").click((event) => {
    $(".dialog-back").css("display", "none");
});

$(".game-1 .piece img").click(event => {
    let score = Number(storage.getItem('score'));

    let userPlayed = event.target.alt;
    let randomNumber = Math.floor(Math.random() * 3);
    let computerPlayed = choices[randomNumber];

    $(".game-1").delay(500).fadeOut(500);
    $(".game-2").delay(1500).queue(function() {
        $(this).css("display", "flex");
        $(this).dequeue();
    });
    
    $(".game-2 .you .piece-border").attr("class" , "piece-border " + userPlayed);
    $(".game-2 .you .piece-border img").attr("src", get_image(userPlayed));
    $(".game-2 .house .piece-border").delay(1500).fadeIn(100).queue(function() {
        $(this).attr("class", "piece-border " + computerPlayed)
        $(".game-2 .house .piece-border img").attr("src", get_image(computerPlayed));
        $(this).dequeue();
    });
    
    if((userPlayed === "paper" && computerPlayed == "rock") || 
        (userPlayed === "rock" && computerPlayed == "scissors") ||
        (userPlayed === "scissors" && computerPlayed == "paper") )
    {
        score += 1;
        $(".game-2 .message").delay(1500).queue(function() { 
            $(".game-2 .message h2").text("YOU WIN");
            $(".game-2 .you .celeb-1").removeClass("change-color");
            $(".game-2 .you .celeb-2").removeClass("change-color");
            $(".score p").text(score);
            $(this).dequeue();
        }).show();
            
    } else if ((computerPlayed === "paper" && userPlayed == "rock") ||
                (computerPlayed === "rock" && userPlayed == "scissors") ||
                (computerPlayed === "scissors" && userPlayed == "paper"))
    {
        if(score > 0)
            score -= 1;

        $(".game-2 .message").delay(1500).queue(function () {
            $(".game-2 .message h2").text("YOU LOSE");
            $(".game-2 .house .celeb-1").removeClass("change-color");
            $(".game-2 .house .celeb-2").removeClass("change-color");
            $(".score p").text(score);
            $(this).dequeue();
        }).show();
    } else {
        $(".game-2 .message").delay(1500).queue(function () {
            $(".game-2 .message h2").text("DRAW");
            $(this).dequeue();
        }).show();
    }
    storage.setItem('score', score);
    reset();
});

$(".game-2 .message button").click(event => {
    $(".game-2").delay(1000).fadeOut(500);
    $(".game-1").delay(1500).fadeIn(1000);
});

function get_image(played) {
    return "images" + "\\" + "icon-" + played + ".svg"
}

function reset() {
    $(".game-2 .you .celeb-1").addClass("change-color");
    $(".game-2 .you .celeb-2").addClass("change-color");
    $(".game-2 .house .celeb-1").addClass("change-color");
    $(".game-2 .house .celeb-2").addClass("change-color");
}