const playBoard = document.querySelector(".play-Brod");
const scoreElement =document.querySelector(".score");
const highScoreElement =document.querySelector(".hight-score");
const controls = document.querySelectorAll("control i");
let foodSound = new Audio('eat.mp3');
let gameEnd = new Audio('gameEnd.mp3');
let gameOver = false;
let foodX,foodY;
let snakeX = 20 , snakeY = 10 ;
let snakeBody=[];
let velocityX = 0 ,velocityY = 0;
let setIntervalId;
let score=0;


let highScore = localStorage.getItem("hight-score") || 0;
highScoreElement.innerText=`hight score : ${highScore}`;

const changeFoodPosition = () => {

    //Change position of the food

    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () =>{
    clearInterval(setIntervalId);
    
    alert("Game Over ! Press ok replay game");
    location.reload();
}


const ChangeDirection = (e) =>{
    if(e.key == "ArrowUp"){
    velocityX= -1;
    velocityY= 0;
    }
    else if(e.key == "ArrowDown"){
        velocityX= 1;
        velocityY= 0;
    }
    else if(e.key == "ArrowLeft"){
        velocityX= 0;
        velocityY= -1;
    }
    else if(e.key == "ArrowRight" ){
        velocityX= 0;
        velocityY= 1;
    }
}

// controls.forEach(key=> {
// key.addEventListener("click",() =>ChangeDirection({key :data-key.key}));
// });

const initGame = (e) =>{
    if(gameOver)return handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area : ${foodX}/${foodY}"></div>`;

    if(snakeX == foodX  && snakeY == foodY ){
        changeFoodPosition();
        foodSound.play();
        snakeBody.push([foodX ,foodY]);
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem('hight-score', highScore);
        scoreElement.innerText =`Score :${score}`;
        highScoreElement.innerText=`hight-score : ${highScore}`;

    }
    for(let i=snakeBody.length - 1; i > 0 ; i-- ){
        snakeBody[i]=snakeBody[i - 1];
        htmlMarkup += `<div class="snakeBody" style="grid-area :${snakeBody[i][0]}/${snakeBody[i][1]}"></div>`;
    }

    snakeBody[0] =[snakeX,snakeY];

    // Setting first element of the body  ton the current snake position
// updating  the snake Head position base on the current position

    snakeX += velocityX;
    snakeY += velocityY;

    // if the snake out of the wall

    if(snakeX <=0 || snakeX >30 ||snakeY <=0|| snakeY > 30){
        gameOver = true;
        gameEnd.play();
    }

    for(let i =0 ; i<snakeBody.length; i++ )
        {
            htmlMarkup += `<div class="head" style="grid-area :${snakeBody[i][0]}/${snakeBody[i][1]}"></div>`;
            if(i !== 0 && snakeBody[0][0] == snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1] ){
                gameEnd.play();
                gameOver = true;

            }
            //Adding Div for each part of body of the snake
        }
    playBoard.innerHTML=htmlMarkup;
}
changeFoodPosition();
setIntervalId =setInterval(initGame, 125);
document.addEventListener("keydown", ChangeDirection);
