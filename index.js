const tab = ['scissors','paper','rock','lizard','spock'];
let compChoice 
let playerChoice
let score = 0

let isStarted = false;
$('.scoreNumber').text(score)

function computerPick(){
    let randomNumber = Math.floor(Math.random() * 5)
    return tab[randomNumber]
}
function checkWindowSize(){
    if($(window).width() > 768){
        $("choice2").css("margin-left", "10rem")
    }
    else{
        $("choice2").css("margin-left", "0")
    }
}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3")
    audio.play()
}

function nextRound(e){
    compChoice = computerPick()
    playerChoice =  e.target.closest("button").classList[0]
    $(".gameChoices" ).css("display", "none")
    $("#picks").css("display", "flex")
    $(".choice1 div:first").addClass(playerChoice)
    $(".choice1 img").attr("src", `./images/icon-${playerChoice}.svg`)
    
    const winner = calculateWinner(compChoice, playerChoice)
    
    let result
    if(playerChoice == compChoice){
        result= "it's a tie"
        setTimeout(()=> {
            playSound("tie")
        },1000)
    }
    else if(typeof winner != undefined && winner != playerChoice){
        result= "you lose"
        score--
        setTimeout(()=> {
            playSound("lost")
        },1000)
        
    }
    else if(typeof winner != undefined && winner == playerChoice){
        result='you win'
        score++
        setTimeout(()=> {
            playSound("won")
        },1000)
        
    }
        

    setTimeout(() => {
        $(".choice2 div:last").removeClass('emptyChoice')
        $(".choice2 div:last").addClass('gameImg shadow-top')
        $(".choice2 div:first").addClass(compChoice)
        $(".choice2 img").css("display", "flex")
        $(".choice2 img").attr("src", `./images/icon-${compChoice}.svg`)
    }, 500);

    setTimeout(() => {
        $(".choice2").css('margin-left', "0")
        $('#results').css("display", "flex")
        $('#results p').text(result)
        $('.scoreNumber').text(score)
    },1000)
    
}

function calculateWinner(compChoice, playerChoice){
    switch(playerChoice){
        case 'scissors':
            if(compChoice == 'rock' || compChoice == 'spock')
                return compChoice
            else if(compChoice == 'lizard' || compChoice == 'paper')
                return playerChoice
            break;

        case 'paper':
            if(compChoice == 'scissors' || compChoice == 'lizard')
                return compChoice
            else if(compChoice == 'rock' || compChoice == 'spock')
                return playerChoice
            break;

        case 'rock':
            if(compChoice == 'paper' || compChoice == 'spock')
                return compChoice
            else if(compChoice == 'lizard' || compChoice == 'scissors')
                return playerChoice
            break;

        case 'lizard':
            if(compChoice == 'rock' || compChoice == 'scissors')
                return compChoice
            else if(compChoice == 'spock' || compChoice == 'paper')
                return playerChoice
            break;

        case 'spock':
            if(compChoice == 'paper' || compChoice == 'lizard')
                return compChoice
            else if(compChoice == 'rock' || compChoice == 'scissors')
                return playerChoice
            break;

        default:
            break;
    }
}

//Start the next round
$(".gameChoices button").click( (e) => {
        nextRound(e) 
})

// Reset for next round
$("#results button").click(() => {
    $(".gameChoices" ).css("display", "flex")
    $("#picks").css("display", "none")
    $(".choice1 div:first").removeClass(playerChoice)
    $(".choice2 div:last").addClass('emptyChoice')
    $(".choice2 div:last").removeClass('gameImg shadow-top')
    $(".choice2 div:first").removeClass(compChoice)
    $(".choice2 img").css("display", "none")
    $('#results').css("display", "none")
    if($(window).width() > 768){
        $(".choice2").css('margin-left', "10rem")
    }
    
})

//Display rules panel
$("#rulesBtn").click(e =>{
    $("#rulesContainer").css("display","flex")
})

// Close rules panel
$(".rulesHeading img").click(e =>{
    $("#rulesContainer").css("display","none")
})
