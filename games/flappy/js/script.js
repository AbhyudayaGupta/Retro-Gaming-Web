const cvs=document.querySelector("#canvas");
const ctx=cvs.getContext("2d");

const bg=new Image();
const bird=new Image();
const fg=new Image();
const pipeNorth=new Image();
const pipeSouth=new Image();

bg.src="images/bg.png";
bird.src="images/bird.png";
fg.src="images/fg.png";
pipeNorth.src="images/pipeNorth.png";
pipeSouth.src="images/pipeSouth.png";

//audios

let flySound=new Audio();
let scoreSound=new Audio();

flySound.src="audio/fly.mp3";
scoreSound.src="audio/score.mp3";


let gravity=1.5;

let gap=70;

let pipeGap=242+gap;


let score=0;

const birdElements={
    
    x:180,
    y:150,
    width:38,
    height:26
}



//drawing bird
function drawBird(x,y){
    
    ctx.drawImage(bird,x,y);
}

//drawing fg
function drawFg(){
    
    ctx.drawImage(fg,0,cvs.height-fg.height);
    
}


//drawing pipes

let pipes=[];

pipes.push({
    
    x:cvs.width,
    y:0
});


function drawPipes(){
    
    for(let i=0;i<pipes.length;i++){
        
        ctx.drawImage(pipeNorth,pipes[i].x,pipes[i].y);
        ctx.drawImage(pipeSouth,pipes[i].x,pipeGap+pipes[i].y);
    }
    
}

function drawScores(){
    
    ctx.fillStyle="#000";
    ctx.font="20px fantasy";
    ctx.fillText("Score:"+score,10,490);
    
}


function movePipe(){
    
     for(let i=0;i<pipes.length;i++){
        
        pipes[i].x--;
         
    if(pipes[i].x==125){
        
        pipes.push({
            
            x:cvs.width,
            y:Math.floor(Math.random()*242)-242
        });
    }
        
     
    }
    
   
}



//function to call all draw function
function draw(){
    
    drawBird(birdElements.x,birdElements.y);
    drawPipes();
    drawPipes();
    drawFg();
    drawScores();
    
}

//moving bird
document.addEventListener("keydown",function(e){
    
    if(e.keyCode==37){
        
        birdElements.x-=25;
        
        flySound.play();
    }
});

document.addEventListener("keydown",function(e){
    
    if(e.keyCode==38){
        
        birdElements.y-=30;
        
        flySound.play();
    }
});

document.addEventListener("keydown",function(e){
    
    if(e.keyCode==39){
        
        birdElements.x+=25;
        
        flySound.play();
    }
});

document.addEventListener("keydown",function(e){
    
    if(e.keyCode==40){
        
        birdElements.y+=30;
        
        flySound.play();
    }
});


document.querySelector(".up").addEventListener("click",function(){
    
    birdElements.y-=30;
    
    flySound.play();
})

document.querySelector(".left").addEventListener("click",function(){
    
    birdElements.x-=25;
    
    flySound.play();
})

document.querySelector(".right").addEventListener("click",function(){
    
    birdElements.x+=25;
    
    flySound.play();
})

document.querySelector(".down").addEventListener("click",function(){
    
    birdElements.y+=30;
    
    flySound.play();
})

//updating scores

function updateScore(){
    
    for(let i=0;i<pipes.length;i++){
        
        if(pipes[i].x==120){
            
            score++;
            
            scoreSound.play();
        }
    }
    
}

function checkCollison(){
    
    for(let i=0;i<pipes.length;i++){
      
        if((birdElements.x+birdElements.width>=pipes[i].x && birdElements.x<=pipes[i].x+pipeNorth.width) && (birdElements.y<=pipes[i].y+pipeNorth.height || birdElements.y+birdElements.height>=pipes[i].y+pipeGap || birdElements.y+birdElements.height>=cvs.height-fg.height)){
        
            location.reload();
        }
        
    }
    
}


function update(){
    
    birdElements.y+=gravity;
    movePipe();
    updateScore();
    checkCollison();
}

function loop(){
    
    ctx.clearRect(0,0,cvs.width,cvs.height);
    
    ctx.drawImage(bg,0,0);
    
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
 
      interval=setInterval(loop,40);   
    
  }
    
}

function pauseGame(){
    
    clearInterval(interval);
    
    interval=false;
}

function restartGame(){
    
    score=0;
    
    birdElements.x=180;
    birdElements.y=150;
    
    
    pipes=[];

    pipes.push({
    
    x:cvs.width,
    y:0
  
    });

    
    pauseGame();
    playGame();

}

function quitGame(){
    
    
    window.location="../../games/../index.html";
}