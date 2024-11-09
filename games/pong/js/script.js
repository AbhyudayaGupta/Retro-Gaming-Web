const cvs=document.querySelector("#canvas");
const ctx=cvs.getContext("2d");


//audios

const comSound=new Audio();
const userSound=new Audio();
const hit=new Audio();
const wall=new Audio();


comSound.src="sounds/comScore.mp3";
userSound.src="sounds/userScore.mp3";
hit.src="sounds/hit.mp3";
wall.src="sounds/wall.mp3";

//paddle variables

let topPressed=false;
let bottomPressed=false;

const paddleHeight=100;
const paddleWidth=10;


const user={
    
    x:0,
    y:(cvs.height-paddleHeight)/2,
    width:paddleWidth,
    height:paddleHeight,
    vy:10,
    color:"#fff"
    
}


const com={
    
    x:cvs.width-paddleWidth,
    y:(cvs.height-paddleHeight)/2,
    width:paddleWidth,
    height:paddleHeight,
    color:"#fff"
    
}

//ball variables

const ball={
    
    x:cvs.width/2,
    y:cvs.height/2,
    radius:10,
    vx:5,
    vy:5,
    speed:7,
    color:"#fff"
}

//net variables

const netWidth=5;
const netHeight=10;

const net={
    
    x:(cvs.width-netWidth)/2,
    y:0,
    width:netWidth,
    height:netHeight,
    color:"#fff"
    
}


//score variables

let comScore=0;
let userScore=0;



//drawing  paddles

function drawPaddle(x,y,width,height,color){
    
    ctx.beginPath();
    ctx.fillStyle=color;
    ctx.fillRect(x,y,width,height);
    ctx.fill();
    ctx.closePath();
}

//drawing ball

function drawBall(x,y,radius,color){
    
    ctx.beginPath();
    ctx.fillStyle=color;
    ctx.arc(x,y,radius,0,Math.PI*2,false);
    ctx.fill();
    ctx.closePath();
}

//drawing net

function drawNet(x,y,width,height,color){
    
    for(let i=0;i<cvs.height;i+=15){
        
        ctx.beginPath();
        ctx.fillStyle=color;
        ctx.fillRect(x,y+i,width,height);
        ctx.fill();
        ctx.closePath();
    }
}

//drawing text

function drawText(text,x,y,color){
    
    ctx.font="40px fantasy";
    ctx.fillStyle=color;
    ctx.fillText(text,x,y);
    
}

function draw(){
    
    drawPaddle(user.x,user.y,user.width,user.height,user.color);
    drawPaddle(com.x,com.y,com.width,com.height,com.color);
    drawBall(ball.x,ball.y,ball.radius,ball.color);
    drawNet(net.x,net.y,net.width,net.height,net.color);
    
    drawText(userScore,60,100,"#fff");
    drawText(comScore,340,100,"#fff");
}


//moving user paddle

document.addEventListener("keydown",function(e){
   
    if(e.keyCode==38){
        
        topPressed=true;
    }
    
    else if(e.keyCode==40){
        
        bottomPressed=true;
    }
    
});


document.addEventListener("keyup",function(e){
   
    if(e.keyCode==38){
        
        topPressed=false;
    }
    
    else if(e.keyCode==40){
        
        bottomPressed=false;
    }
    
});

document.querySelector(".leftBtn").addEventListener("mouseenter",function(){
    
    topPressed=true;
});

document.querySelector(".leftBtn").addEventListener("mouseout",function(){
    
    topPressed=false;
});

document.querySelector(".rightBtn").addEventListener("mouseenter",function(){
    
    bottomPressed=true;
});

document.querySelector(".rightBtn").addEventListener("mouseout",function(){
    
    bottomPressed=false;
});

//moving ball

function moveBall(){
    
    ball.x+=ball.vx;
    ball.y+=ball.vy;
}

//ball collision with wall

function ballWallCollision(){
    
    if(ball.y+ball.radius>cvs.height || ball.y-ball.radius<0){
        
        ball.vy=-ball.vy;
        
        wall.play();
    }
    
}

function checkCollision(p,b){
    
    p.top=p.y;
    p.bottom=p.y+p.height;
    p.left=p.x;
    p.right=p.x+p.width;
    
    b.left=b.x-b.radius;
    b.right=b.x+b.radius;
    b.top=b.y-b.radius;
    b.bottom=b.y+b.radius;
    
    
    
    return b.right > p.left && b.left < p.right && b.bottom > p.top && b.top < p.bottom;
    
    
}

function ballPaddleCollison(){
    
    com.y+=((ball.y-(com.y+com.height/2)))*0.1
    
    let player=(ball.x<cvs.width/2) ?user:com
    
    if(checkCollision(player,ball)){
        
        hit.play();
        
        let collidedPoint=ball.y-(player.y+player.height/2);
        collidedPoint=collidedPoint/(player.height/2);
        
        let angle=collidedPoint*(Math.PI/3);
        
        let direction=(ball.x<cvs.width/2) ? 1 : -1
        
        ball.vx=direction*ball.speed*Math.cos(angle);
        ball.vy=ball.speed*Math.sin(angle);
        
        ball.speed+=0.1;
    }
    
    
}


//updating scores

function updateScores(){
    
    if(ball.x+ball.radius>cvs.width){
        
        userScore++;
        
        resetBall();
        
        userSound.play();
    }
    
    else if(ball.x-ball.radius<0){
        
        comScore++;
        
        resetBall();
        
        comSound.play();
    }
    
    
    
}


function resetBall(){
    
    
    ball.x=cvs.width/2;
    ball.y=cvs.height/2;
    ball.vx=5;
    ball.vy=-5
    ball.speed=7;
    
    
}

function update(){
    

    if(topPressed && user.y>0){
        
        user.y-=user.vy;
    }
    
    else if(bottomPressed && user.y+user.height<cvs.height){
        
        user.y+=user.vy;
    }

    moveBall();
    ballWallCollision();
    ballPaddleCollison();
    
    updateScores();
    
}

function loop(){
    
    ctx.clearRect(0,0,cvs.width,cvs.height);
   
    
    draw();
    update();
}

let interval;


document.querySelector("#play").addEventListener("click",playGame);
document.querySelector("#pause").addEventListener("click",pauseGame);
document.querySelector("#restart").addEventListener("click",restartGame);
document.querySelector("#quit").addEventListener("click",quitGame);


function playGame(){
    
    if(!interval){
        
        interval=setInterval(loop,50);
    }
}

function pauseGame(){
    
    clearInterval(interval);
    
    interval=false;
}

function restartGame(){
    
    comScore=0;
    userScore=0;
    resetBall();
    
    pauseGame();
    playGame();
}

function quitGame(){
    
    window.location="../../games/../index.html";
}