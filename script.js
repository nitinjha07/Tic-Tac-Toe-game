let boxes = document.querySelectorAll(".cell");
let gameInfo = document.querySelector("#indicator_text");
let newGameBtn = document.querySelector("#button");
let winningCelebration = document.querySelector(".win-container-outer");

let currentPlayer;
let gameGrid;

//leaderbord
let xScore = 0;
let OScore = 0;
let tie = 0;

const winningPositions = [
    [0,1,2],            //  0   1   2
    [3,4,5],            //  3   4   5
    [6,7,8],            //  6   7   8
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//function to initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    //removing X or O from display if present
    boxes.forEach(function(box, index){
        box.innerText = "";
    })

    //make cells clickable again
    boxes.forEach(function(box){
        box.style.pointerEvents = "auto";
    })

    //showing characters
    if(currentPlayer == 'X'){
        document.querySelector(".doraemon").style.display="";
        document.querySelector(".doraemon-text").style.display="";
        document.querySelector(".shinchan").style.display="none";
        document.querySelector(".shinchan-text").style.display="none";
    }


    //removing winning and game tied animations
    winningCelebration.style.display = "none";
}

initGame();

function swapTurn(){
    if(currentPlayer === 'X'){
        currentPlayer = 'O';
        gameInfo.innerText = `Current Player - ${currentPlayer}`;

        //show avatar of O
        document.querySelector(".doraemon").style.display="none";
        document.querySelector(".doraemon-text").style.display="none";
        document.querySelector(".shinchan").style.display="";
        document.querySelector(".shinchan-text").style.display="";
    }
    else{
        currentPlayer = 'X';
        gameInfo.innerText = `Current Player - ${currentPlayer}`;

        //show avatar of X
        document.querySelector(".doraemon").style.display="";
        document.querySelector(".doraemon-text").style.display="";
        document.querySelector(".shinchan").style.display="none";
        document.querySelector(".shinchan-text").style.display="none";
    }
}

function checkWinningStatus(){
    var winner = 'none';
    for(let i = 0; i<winningPositions.length; i++){
        if ((gameGrid[winningPositions[i][0]] == 'X' && gameGrid[winningPositions[i][1]] == 'X' && gameGrid[winningPositions[i][2]] == 'X') || (gameGrid[winningPositions[i][0]] == 'O' && gameGrid[winningPositions[i][1]] == 'O' && gameGrid[winningPositions[i][2]] == 'O')) {


            winner = gameGrid[winningPositions[i][0]];
            gameInfo.innerText = `Winner - ${winner}`;
            boxes.forEach(function(box){
                box.style.pointerEvents = "none";
            })

            //winning celebration
            winningCelebration.querySelector("h1").innerText= `${winner} wins this round`;
            winningCelebration.style.display= "block";


            //hide all the avatars
            document.querySelector(".doraemon").style.display="none";
            document.querySelector(".doraemon-text").style.display="none";
            document.querySelector(".shinchan").style.display="none";
            document.querySelector(".shinchan-text").style.display="none";

            //updates learderboard
            if(winner == 'X'){
                xScore = xScore + 1;
                document.querySelector(".x-score").innerText = xScore;
            }
            if(winner == 'O'){
                OScore = OScore + 1;
                document.querySelector(".o-score").innerText = OScore;
            }
        }
    }

    let fillCount = 0;
    gameGrid.forEach((ele) =>{
        if(ele !== ""){
            console.log(fillCount);
            fillCount++;
        }
    })

    if(fillCount == 9 && winner == 'none'){
        //ui update
        gameInfo.innerText = "Game Tied";

        //updating leaderboard
        tie = tie + 1;
        document.querySelector(".tie").innerText = tie;

        //hide all the avatars
        document.querySelector(".doraemon").style.display="none";
        document.querySelector(".doraemon-text").style.display="none";
        document.querySelector(".shinchan").style.display="none";
        document.querySelector(".shinchan-text").style.display="none";

        //Show animation on ui
        winningCelebration.querySelector("h1").innerText= `Game Tied`;
        // winningCelebration.querySelector("h1").style.cssText = "margin-left:80px; font-size:4.5rem ";
        winningCelebration.querySelector("#winner-meme").style.cssText = "left: 130px";
        let newSrc = "./images/bekar-hai-bhaiya.gif";
        winningCelebration.querySelector("#winner-meme").src = "./images/bekar-hai-bhaiya.gif";
        winningCelebration.style.display= "block";
        winningCelebration.querySelector("#win-effect").style.display= "none";
    }

}



function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;

        //swap turn
        swapTurn();

        //check if anybody has won or not
        checkWinningStatus();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

newGameBtn.addEventListener("click", function(){
    // Reseting leaderboard
    xScore = 0;
    OScore = 0;
    tie = 0;
    document.querySelector(".x-score").innerText = 0;
    document.querySelector(".o-score").innerText = 0;
    document.querySelector(".tie").innerText = 0;

    initGame();
})

document.querySelector(".button-container").addEventListener("click", function(){
    // Reseting leaderboard
    xScore = 0;
    OScore = 0;
    tie = 0;
    document.querySelector(".x-score").innerText = 0;
    document.querySelector(".o-score").innerText = 0;
    document.querySelector(".tie").innerText = 0;
    initGame();
})

//Next button click function

document.getElementById("next-circle").addEventListener("click", function(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    const radius = this.clientWidth / 2;
    const distance = Math.sqrt((x - radius) ** 2 + (y - radius) ** 2);

    if (distance <= radius) {
        initGame();
    }
});





//-------------------------------------------------------------------------------------

// GARBAGE FUNCTIONS


let debug = document.getElementById("debug");
debug.addEventListener("click", function(){
    //hide all the avatars
    document.querySelector(".doraemon").style.display="none";
    document.querySelector(".doraemon-text").style.display="none";
    document.querySelector(".shinchan").style.display="none";
    document.querySelector(".shinchan-text").style.display="none";
    //winning code

})

let wins = document.getElementById("game-win");
wins.addEventListener("click", function(){


    winner = gameGrid[winningPositions[1][0]];
    gameInfo.innerText = `Winner - ${winner}`;
    boxes.forEach(function(box){
        box.style.pointerEvents = "none";
    })

    //winning celebration
    winningCelebration.querySelector("h1").innerText= `X wins this round`;
    winningCelebration.style.display= "block";


    //hide all the avatars
    document.querySelector(".doraemon").style.display="none";
    document.querySelector(".doraemon-text").style.display="none";
    document.querySelector(".shinchan").style.display="none";
    document.querySelector(".shinchan-text").style.display="none";

    //updates learderboard
    if(winner == 'X'){
        document.querySelector(".x-score").innerText = xScore + 1;
    }
    if(winner == 'O'){
        document.querySelector(".o-score").innerText = OScore + 1;
    }
})


let gameTied = document.getElementById("game-tied");
gameTied.addEventListener("click", function(){
    if(true){
        //ui update
        gameInfo.innerText = "Game Tied";

        //updating leaderboard
        document.querySelector(".tie").innerText = tie + 1;

        //hide all the avatars
        document.querySelector(".doraemon").style.display="none";
        document.querySelector(".doraemon-text").style.display="none";
        document.querySelector(".shinchan").style.display="none";
        document.querySelector(".shinchan-text").style.display="none";

        //Show animation on ui
        winningCelebration.querySelector("h1").innerText= `Game Tied`;
        // winningCelebration.querySelector("h1").style.cssText = "margin-left:80px; font-size:4.5rem ";
        winningCelebration.querySelector("#winner-meme").style.cssText = "left: 130px";
        let newSrc = "./images/bekar-hai-bhaiya.gif";
        winningCelebration.querySelector("#winner-meme").src = "./images/bekar-hai-bhaiya.gif";
        winningCelebration.style.display= "block";
        winningCelebration.querySelector("#win-effect").style.display= "none";
    }
})

