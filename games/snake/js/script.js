const cvs=document.querySelector("#canvas");

const ctx=cvs.getContext("2d");

let snakeWidth=15;
let snakeHeight=15;
let score=0;


//audios

let left_sound=new Audio();
let right_sound=new Audio();
let up_sound=new Audio();
let down_sound=new Audio();
let eat_sound=new Audio();

left_sound.src="audio/left.mp3";
right_sound.src="audio/right.mp3";
up_sound.src="audio/up.mp3";
down_sound.src="audio/down.mp3";
eat_sound.src="audio/eat.mp3";


function drawSnake(x,y){
    
    ctx.beginPath();
    ctx.fillStyle="lightgreen";
    ctx.fillRect(x*snakeWidth,y*snakeHeight,snakeWidth,snakeHeight);
    ctx.strokeStyle="#000";
    ctx.strokeRect (x*snakeWidth,y*snakeHeight,snakeWidth,snakeHeight);
    ctx.fill();
    ctx.closePath();
    
}

let len=4;

let snake=[];

let dir="right";

for(let i=len-1;i>=0;i--){
    
    snake.push({
        
        x:i,
        y:0
    });
}

document.addEventListener("keydown",controls);

function controls(e){
    
    if(e.keyCode==37 && dir!="left"){
        
        dir="left";
        
        left_sound.play();
        
    }
    
    else if(e.keyCode==38 && dir!="down"){
        
        dir="up";

        up_sound.play();    
    }
    
    else if(e.keyCode==39 && dir!="left"){
        
        dir="right";
        
        left_sound.play();
    }
    
    else if(e.keyCode==40 && dir!="up"){
        
        dir="down";
        
        up_sound.play();
    }
}


document.querySelector(".top").addEventListener("click",function(){
    
    if(dir!="down"){
        
        dir="up";
        
        up_sound.play();
    }
});


document.querySelector(".down").addEventListener("click",function(){
    
    if(dir!="up"){
        
        dir="down";
        
        down_sound.play();
    }
});

document.querySelector(".left").addEventListener("click",function(){
    
    if(dir!="right"){
        
        dir="left";
        
        left_sound.play();
    }
});


document.querySelector(".right").addEventListener("click",function(){
    
    if(dir!="left"){
        
        dir="right";
        
        right_sound.play();
    }
});


function drawFood(x,y){
    
    ctx.beginPath();
    ctx.fillStyle="red";
    ctx.fillRect(x*snakeWidth,y*snakeHeight,snakeWidth,snakeHeight);
    ctx.strokeStyle="#000";
    ctx.strokeRect (x*snakeWidth,y*snakeHeight,snakeWidth,snakeHeight);
    ctx.fill();
    ctx.closePath();
    
}

let food={
    
    x:Math.floor(Math.random()*cvs.width/snakeWidth),
    y:Math.floor(Math.random()*cvs.height/snakeWidth)
}



function checkCollision(x,y,array){
    
    for(let i=0;i<array.length;i++){
        
        if(x==array[i].x && y==array[i].y){
            
            return true;
        }
    }
    
    return false;
}

function drawScore(score){
    
    ctx.font="20px fantasy";
    ctx.fillStyle="#fff";
    ctx.fillText("Score:"+score,10,20);
}

function draw(){
    
    ctx.clearRect(0,0,cvs.width,cvs.height);
    
    for(let i=0;i<snake.length;i++){
        
        let x=snake[i].x;
        let y=snake[i].y;
        
        drawSnake(x,y);
    }
    
    drawFood(food.x,food.y);

    let snakeX=snake[0].x;
    let snakeY=snake[0].y;
    
    if(dir=="left"){
        
        snakeX--;
        
   
    }
    
    else if(dir=="right"){
        
        snakeX++;
        
        
    }
    
    else if(dir=="up"){
        
        snakeY--;
        
    }
    
    else if(dir=="down"){
        
        snakeY++;
        
        
    }

   if(snakeX<0 || snakeY<0 || snakeX>=cvs.width/snakeWidth || snakeY>=cvs.height/snakeHeight||checkCollision(snakeX,snakeY,snake)){
        
        location.reload();
    }    
    
   if(food.x==snakeX && food.y==snakeY){
        
       eat_sound.play();
       
    newHead={
        
        x:snakeX,
        y:snakeY
    }
        
      
      
      
    snake.unshift(newHead);    
    
    food={
    
    x:Math.floor(Math.random()*cvs.width/snakeWidth),
    y:Math.floor(Math.random()*cvs.height/snakeWidth)

       }
    
    score+=10;   
      
    }
    
    else{
     
                
    newHead={
        
        x:snakeX,
        y:snakeY
    }
       
        
    snake.pop();    
        
    snake.unshift(newHead);    
        
        
    }


    drawScore(score);

}

let interval;

document.querySelector("#play").addEventListener("click",playGame);
document.querySelector("#pause").addEventListener("click",pauseGame);
document.querySelector("#restart").addEventListener("click",restartGame);
document.querySelector("#quit").addEventListener("click",quitGame);


function playGame(){
    
    if(!interval){

     interval=setInterval(draw,70);
        
    }
}

function pauseGame(){
    
    clearInterval(interval);
    
    interval=false;
}


function restartGame(){
    
    score=0;
    len=4;
    snake=[];
    
    dir="right";

for(let i=len-1;i>=0;i--){
    
    snake.push({
        
        x:i,
        y:0
    });
}
    
    pauseGame();
    playGame();
    
}

function quitGame(){
    
    window.location="../../games/../index.html";
}
