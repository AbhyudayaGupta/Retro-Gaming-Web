const cvs=document.querySelector("#canvas");
const ctx=cvs.getContext("2d");

ctx.lineWidth=5;


let lives=3;

let scores=0;

//images
const cover=new Image();
cover.src="images/cover.jpg";

const paddleImg=new Image();

paddleImg.src="images/paddle.png";


const heartImg=new Image();
heartImg.src="images/heart.jpg";

const brickImg=new Image();
brickImg.src="images/brick.png";

const scoreImg=new Image();
scoreImg.src="images/score.jpg";


//audios

let breakSound=new Audio();
let deadSound=new Audio();
let hitSound=new Audio();
let leftSound=new Audio();
let rightSound=new Audio();
let scoreSound=new Audio();
let wallSound=new Audio();
let winSound=new Audio();

breakSound.src="sounds/break.mp3";
deadSound.src="sounds/dead.mp3";
hitSound.src="sounds/hit.mp3";
leftSound.src="sounds/left.mp3";
rightSound.src="sounds/right.mp3";
scoreSound.src="sounds/score.mp3";
wallSound.src="sounds/wall.mp3";
winSound.src="sounds/win.mp3";

//paddle variables


const paddleWidth=150;
const paddleHeight=30;

let leftPressed=false;
let rightPressed=false;


const paddle={
    
    x:(cvs.width-paddleWidth)/2,
    y:cvs.height-paddleHeight,
    width:paddleWidth,
    height:paddleHeight,
    vx:5
}

//ball variables

const ballRadius=10;

const ball={
    
    x:cvs.width/2,
    y:(cvs.height-ballRadius)-paddle.height,
    radius:ballRadius,
    vx:4,
    vy:-4,
    speed:4
}


//bricks varibales


const bricks={
    
    row:6,
    cols:4,
    width:50,
    heigth:50,
    offsetLeft:15,
    offsetTop:38
    
}

let brick=[];

for(let i=0;i<bricks.row;i++){
    
    brick[i]=[];
    
    for(let j=0;j<bricks.cols;j++){
        
        brick[i][j]={
            
            x:0,
            y:0,
            status:1
        }
        
    }
}


///drawing paddles

function drawPaddle(img,x,y,width,height){
    
    ctx.beginPath();
    ctx.drawImage(img,x,y,width,height);
    
}

//drawing ball

function drawBall(x,y,radius){
    
    ctx.beginPath();
    ctx.fillStyle="red";
    ctx.arc(x,y,radius,0,Math.PI*2,false);
    ctx.strokeStyle="#000";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

//drawing bricks

function drawBricks(){
    
    for(let i=0;i<bricks.row;i++){
        
        for(j=0;j<bricks.cols;j++){
            
            if(brick[i][j].status==1){
            
            let brickX=((i*(bricks.width+bricks.offsetLeft))+bricks.offsetLeft);
            let brickY=((j*(bricks.heigth+bricks.offsetTop))+bricks.offsetTop);
            
            brick[i][j].x=brickX;
            brick[i][j].y=brickY;
            
            
            
            ctx.drawImage(brickImg,brickX,brickY,bricks.width,bricks.heigth);
            
            }
        }
    }
}

//drawing lives

function drawLives(){
    
    ctx.drawImage(heartImg,350,10,25,25);
    ctx.font="25px fantasy";
    ctx.fillStyle="lime";
    ctx.fillText(lives,380,32);
}


//drawing scores
function drawScores(){
    
    ctx.drawImage(scoreImg,20,10,25,25);
    ctx.font="25px fantasy";
    ctx.fillStyle="limegreen";
    ctx.fillText(scores,55,32);
}



//moving paddles

document.addEventListener("keydown",function(e){
    
    if(e.keyCode==37){
        
        leftPressed=true;
        
        leftSound.play();
    }
    
    else if(e.keyCode==39){
        
        rightPressed=true;
        
        rightSound.play();
    }
    
});

document.querySelector(".leftBtn").addEventListener("mouseenter",function(){
    
    leftPressed=true;
    
});

document.querySelector(".leftBtn").addEventListener("mouseout",function(){
    
    leftPressed=false;
    
});

document.querySelector(".rightBtn").addEventListener("mouseenter",function(){
    
    rightPressed=true;
    
});

document.querySelector(".rightBtn").addEventListener("mouseout",function(){
    
    rightPressed=false;
    
});




document.addEventListener("keyup",function(e){
    
    if(e.keyCode==37){
        
        leftPressed=false;
    }
    
    else if(e.keyCode==39){
        
        rightPressed=false;
    }
    
});


//moving ball

function moveBall(){
    
    ball.x+=ball.vx;
    ball.y+=ball.vy;
    
   
}

function ballWallCollision(){
    
     if(ball.x+ball.radius>cvs.width || ball.x-ball.radius<0){
        
        ball.vx=-ball.vx;
         
         wallSound.play();
    }
    
    else if(ball.y-ball.radius<0){
        
        ball.vy=-ball.vy;
        
        wallSound.play();
    }
    
    else if(ball.y+ball.radius>cvs.height){
        
        hitSound.play();
        
        lives--;
        
        resetBall();
    }
    
    
}

function ballBrickCollision(){
    
    for(let i=0;i<bricks.row;i++){
        
        for(let j=0;j<bricks.cols;j++){
            
            let b=brick[i][j];
            
            if(b.status==1){
                
                if(ball.x > b.x && ball.x<b.x+bricks.width && ball.y > b.y && ball.y < b.y+bricks.heigth){
                   
                     breakSound.play();
                    
                    ball.vy=-ball.vy;
                    
                    b.status=0;
                    
                    ball.speed+=0.3;
                    
                     
                    setTimeout(()=>{
                        
                        scoreSound.play();
                        
                    },200);
                    
                    scores++;
                    
                   
                   
                }
            }
            
            
        }
    }
    
}

function resetBall(){
    
    ball.x=(cvs.width-ballRadius)/2;
    ball.y=(cvs.height-ballRadius)-paddle.height;
    ball.vx=4;
    ball.vy=-4;
    ball.speed=3;
}


function ballPaddleCollision(){
    
    if(ball.x+ball.radius>paddle.x && ball.x-ball.radius<paddle.x+paddle.width && ball.y+ball.radius>paddle.y && ball.y-ball.radius<paddle.y+paddle.height){
    
        let collidedPoint=ball.x-(paddle.x+paddle.width/2);
        
        collidedPoint=collidedPoint/(paddle.width/2);
        
        let angle=collidedPoint*Math.PI/3;
        
        ball.vx=ball.speed*Math.sin(angle);
        ball.vy=-ball.speed*Math.cos(angle);
    
    }

    
}

function gameOver(){
    
    if(scores==bricks.row*bricks.cols){
        
        winSound.play();
        
        ctx.font="50px fantasy";
        ctx.fillStyle="lime";
        ctx.fillText("YOU WIN",110,300);
        
        clearInterval(interval);
        
    }
    
    else if(lives<=0){
        
        deadSound.play();
        
        ctx.font="50px fantasy";
        ctx.fillStyle="red";
        ctx.fillText("GAME OVER",100,300);
        
        clearInterval(interval);
        
    }
    
}

//function to call all the draw functions
function draw(){
    
    drawPaddle(paddleImg,paddle.x,paddle.y,paddle.width,paddle.height);
    
    drawBall(ball.x,ball.y,ball.radius);
    
    drawBricks();
    
    drawLives();
    
    drawScores();
    
    gameOver();
    
    
}




//function to call all update functions

function update(){
    
    if(leftPressed && paddle.x > 0){
        
        paddle.x-=paddle.vx;
        
    }
    
    else if(rightPressed && paddle.x+paddle.width<cvs.width){
        
        paddle.x+=paddle.vx;
    }
    
    
    
    moveBall();
    
    ballWallCollision();
    
    ballPaddleCollision();
    
    ballBrickCollision();
}



function loop(){
    
    ctx.clearRect(0,0,cvs.width,cvs.height);
    
    ctx.drawImage(cover,0,0);
    
    draw();
    
    update();
}

let interval;

document.querySelector("#play").addEventListener("click",startGame);

document.querySelector("#pause").addEventListener("click",pauseGame);

document.querySelector("#restart").addEventListener("click",restartGame);

document.querySelector("#quit").addEventListener("click",quitGame);


function startGame(){
 
   if(!interval){
       
    interval=setInterval(loop,30);    
        
    }
        
    
}


function pauseGame(){
    
    
    clearInterval(interval);
    
    interval=false;
}


function restartGame(){

    location.reload();
    

}

function quitGame(){
    
       
    window.location="../../games/../index.html";
}