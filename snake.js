class SnakePart{
    constructor(x , y){
        this.x = x ;
        this.y = y ;
    }
}

const canvas = document.getElementById("gameboard");
const ctx = canvas.getContext('2d');
let speed = 5;
let tilesCount = 20;
let tileSize = canvas.width / tilesCount - 2;
let headX = 10;
let headY = 10;
let Yvelocity = 0;
let Xvelocity = 0;
let AppleX = 5;
let AppleY = 7;
let snakeParts = [] ;
let tailLength = 0 ;
let Score = 0 ;
let EatSound = new Audio('sounds/gulp.mp3');
let GameoverSound = new Audio('sounds/gameover.mp3');
let MoveSound = new Audio('sounds/move.mp3');
document.addEventListener("keydown", PressedKey);
// Game Engine 
function gameEngine() {
    let isgameover = isGameOver() ;
    if(isgameover){
        GameoverSound.play() ;
        return ;
    }
    if(Score == 3){
        speed = 7 ;
    }else if(Score == 5){
        speed = 8 ;
    }else if(Score == 8){
        speed = 9 ;
    }else if(Score > 15){
        speed = 11 ;
    }

    clearScreen();
    makeSnake();
    createApple();
    changeSnakePosition();
    appleCollition();
    createScore();
    setTimeout(gameEngine, 1000 / speed);
}

function PressedKey(e) {

    // Up Arrow Code 
    if (e.code == 'ArrowUp') {
        if (Yvelocity == 1) {
            return;
        }
        MoveSound.play() ;
        Yvelocity = -1;
        Xvelocity = 0;
        
    }

    // Down Arrow Code 
    if (e.code == 'ArrowDown') {
        if (Yvelocity == -1) {
            return;
        }
        MoveSound.play() ;
        Yvelocity = 1;
        Xvelocity = 0;
    }

    // Right Arrow Code 
    if (e.code == 'ArrowRight') {
        if (Xvelocity == -1) {
            return;
        }
        MoveSound.play() ;
        Yvelocity = 0;
        Xvelocity = 1;
    }

    // Left Arrow Code 
    if (e.code == 'ArrowLeft') {
        if (Xvelocity == 1) {
            return;
        }
        MoveSound.play() ;
        Yvelocity = 0;
        Xvelocity = -1;
    }

}

function isGameOver() {
    let gameover = false ;

    if(Xvelocity === 0 && Yvelocity === 0){
        return false ;
    }

    for(let i = 0 ; i < snakeParts.length ; i++){
        let part = snakeParts[i] ;
        if(part.x === headX && part.y === headY){
            gameover = true ;
            break ;
        }
    }


    if(headX < 0 || headY < 0 || headX === tilesCount || headY === tilesCount || gameover == true){
        ctx.fillStyle = 'white' ;
        ctx.font = "500 55px Verdana" ;
        let gradient = ctx.createLinearGradient(0 , 0 , canvas.width , 0);
        gradient.addColorStop("0", "magenta") ;
        gradient.addColorStop( "0.5" , "blue") ;
        gradient.addColorStop( "1.0" , "deeppink") ;
        ctx.fillStyle = gradient ;
        ctx.fillText("Game Over!", canvas.width / 11 , canvas.height / 2) ;
        gameover = true ;
    }


    return gameover ;
}

function changeSnakePosition() {
    headY = headY + Yvelocity;
    headX = headX + Xvelocity;
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

function makeSnake() {
    ctx.fillStyle = 'lime' ;
    for(let i = 0 ; i < snakeParts.length ; i++){
        let part = snakeParts[i] ;
        ctx.fillRect(part.x * tilesCount , part.y * tilesCount , tileSize , tileSize);
    }
    snakeParts.push(new SnakePart(headX , headY));
    if(snakeParts.length > tailLength){
        snakeParts.shift();
    }

    ctx.fillStyle = '#ffb618';
    ctx.fillRect(headX * tilesCount, headY * tilesCount, tileSize, tileSize);
}

function createScore(){
    document.querySelectorAll(".scorenum")[0].innerHTML = Score ;
}

function createApple() {
    ctx.fillStyle = "deeppink";
    ctx.fillRect(AppleX * tilesCount, AppleY * tilesCount, tileSize, tileSize);
}

function appleCollition() {
    if(headX === AppleX && headY === AppleY ){
        EatSound.play() ;
        AppleX = Math.floor(Math.random() * tilesCount);
        AppleY = Math.floor(Math.random() * tilesCount);
        console.log(tailLength) ;
        Score++ ;
        tailLength++ ;

    }
    
}
gameEngine();
