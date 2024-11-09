const cvs=document.querySelector("#canvas");
const ctx=cvs.getContext("2d");

const basketImg=new Image();
const henImg=new Image();
const scoreImg=new Image();
const heartImg=new Image();
const dropImg=new Image();

basketImg.src="images/basket.png";
henImg.src="images/hen-right.png";
scoreImg.src="images/score.jpg";
heartImg.src="images/heart.jpg";
dropImg.src="images/bullseye1.png";


let random=Math.floor(Math.random()*3)+1;

let score=0;

let lives=5;


let leftPressed=false;
let rightPressed=false;

const basketWidth=100;
const basketHeight=100;

const henWidth=80;
const henHeight=80;

const basket={
    
    x:(cvs.width-basketWidth)/2,
    y:cvs.height-basketHeight,
    width:basketWidth,
    height:basketHeight,
    dx:6
    
}

const eggRadius=10;

const egg={
    
    x:60,
    y:125+eggRadius,
    radius:eggRadius,
    color:"#fff",
    vy:5
}


function drawImages(img,x,y,width,height){
    
    ctx.beginPath();
    ctx.drawImage(img,x,y,width,height);
    ctx.closePath();
    
}

function drawText(img,imgX,imgY,color,text,x,y){
    
  
    ctx.drawImage(img,imgX,imgY,28,28);
    ctx.font="25px fantasy";
    ctx.fillStyle=color;
    ctx.fillText(text,x,y);
    
}

function drawEgg(x,y,radius,color){
    
    ctx.beginPath();
    ctx.fillStyle=color;
    ctx.arc(x,y,radius,0,Math.PI*3,false);
    ctx.fill();
    ctx.closePath();
}



//moving basket

document.addEventListener("keydown",function(e){
    
    if(e.keyCode==37){
        
        leftPressed=true;
    }
    
    else if(e.keyCode==39){
        
        rightPressed=true;
    }
    
});


document.addEventListener("keyup",function(e){
    
    if(e.keyCode==37){
        
        leftPressed=false;
    }
    
    else if(e.keyCode==39){
        
        rightPressed=false;
    }
    
});

document.querySelector(".left").addEventListener("mouseenter",function(){

    
    leftPressed=true;
        

});


document.querySelector(".left").addEventListener("mouseout",function(){

    
    leftPressed=false;
        

});


document.querySelector(".right").addEventListener("mouseenter",function(){
   
    rightPressed=true;
        

    
});

document.querySelector(".right").addEventListener("mouseout",function(){

    
    rightPressed=false;
        

});


function movePaddle(){
    
    if(leftPressed && basket.x>0){
        
        basket.x-=basket.dx;
    
    }
    
    else if(rightPressed && basket.x+basket.width<cvs.width){
        
        basket.x+=basket.dx;
        
    }

}

function moveEgg(){
    
    egg.y+=egg.vy;
}

function checkCollision(){

    
    if(egg.x+egg.radius>basket.x && egg.x-egg.radius<basket.x+basket.width && egg.y-egg.radius>basket.y && egg.y+egg.radius<basket.y+basket.height && egg.vy<16){
       
        score++;
        
        basket.dx+=0.1;
        
        resetEgg_1();
        
   
       
     }
    
  
    else if(egg.x+egg.radius>basket.x && egg.x-egg.radius<basket.x+basket.width && egg.y-egg.radius>basket.y && egg.y+egg.radius<basket.y+basket.height && egg.vy>=16){
       
        
        score++;
        
        resetEgg_3();
        
        
    }
    
    else if(egg.y>cvs.height){

            lives--;
            
            resetEgg_2();
        
            basket.dx=6;
  
    }

    
}


function resetEgg_1(){
    
    random=Math.floor(Math.random()*3)+1;
    
    if(random==1){
    
     egg.x=60;
     egg.y=125+eggRadius;
            
     egg.vy+=0.5;
        
    }    
    
    
    else if(random==2){
        
                 
    egg.x=210;
    egg.y=125+eggRadius;
    egg.vy+=0.5
        
    }
    
    else if(random==3){
        
                 
    egg.x=340;
    egg.y=125+eggRadius;
    egg.vy+=0.5
        
    }
    
}

function resetEgg_2(){
    
    random=Math.floor(Math.random()*3)+1;
    
    if(random==1){
    
     egg.x=60;
     egg.y=125+eggRadius;
     egg.vy=5;
        
    }    
    
    
    else if(random==2){
        
                 
    egg.x=210;
    egg.y=125+eggRadius;
    egg.vy=5;
        
    }
    
    else if(random==3){
        
                 
    egg.x=340;
    egg.y=125+eggRadius;
    egg.vy=5;
        
    }
    
    
}



function resetEgg_3(){
    
    random=Math.floor(Math.random()*3)+1;
    
    if(random==1){
    
     egg.x=60;
     egg.y=125+eggRadius;
            
     egg.vy=12;
        
    }    
    
    
    else if(random==2){
        
                 
    egg.x=210;
    egg.y=125+eggRadius;
    egg.vy=12
        
    }
    
    else if(random==3){
        
                 
    egg.x=340;
    egg.y=125+eggRadius;
    egg.vy=12;
        
    }
    
}





function gameOver(){
    
    if(lives<=0){
        
        ctx.font="45px fantasy";
        ctx.fillStyle="red";
        ctx.fillText("GAME OVER",125,300);
        
        clearInterval(interval);
    }
    
}     



function draw(){
    
    drawImages(basketImg,basket.x,basket.y,basket.width,basket.height);
    
    drawImages(henImg,20,50,henWidth,henHeight);
    drawImages(henImg,170,50,henWidth,henHeight);
    drawImages(henImg,310,50,henWidth,henHeight);

    drawEgg(egg.x,egg.y,egg.radius,egg.color);

    drawText(scoreImg,10,10,"#fff",score,44,34);
    drawText(heartImg,340,10,"coral",lives,375,34);
    
   
}





function update(){
    
    movePaddle();
    moveEgg();
    gameOver();
    checkCollision();
    

}

function loop(){
    
    ctx.clearRect(0,0,cvs.width,cvs.height);
    
    draw();
    
    update();
    
}


let interval;


document.querySelector(".play").addEventListener("click",function(){
    
    if(!interval){
     
        interval=setInterval(loop,40);
        
    }
    
});


document.querySelector(".play").addEventListener("click",function(){
    
    if(!interval){
     
        interval=setInterval(loop,40);
        
    }
    
});


document.querySelector(".pause").addEventListener("click",function(){
        
    clearInterval(interval);
    
    interval=false;
    
});

document.querySelector(".reset").addEventListener("click",function(){
    
    location.reload();
    
});

document.querySelector(".quit").addEventListener("click",function(){

           
    window.location="../../games/../index.html";
 
});
