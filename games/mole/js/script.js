
let randomMole,interval,hitPosition,count=0,score=0;


let grid=document.querySelector(".grid");
let moles=document.querySelectorAll(".mole");

let No_of_Moles=document.querySelector(".no");
let Mole_Score=document.querySelector(".score");
let Mole_Timer=document.querySelector(".time");
let result=document.querySelector(".result-container");

let timeLeft=Mole_Timer.textContent;


//converting nodelists into an array
let moleArr=Array.prototype.slice.call(moles);


//audios

let hit_sound=new Audio();
let score_sound=new Audio();
let show_sound=new Audio();

hit_sound.src="audio/hit.mp3";
score_sound.src="audio/score.mp3";
show_sound.src="audio/show.mp3";

//displaying moles
function showMoles(){

moleArr.forEach(curr=>{
    
    curr.classList.remove('mole-active');
    
});

  
randomMole=Math.floor(Math.random()*moleArr.length);
    
    moleArr[randomMole].classList.add('mole-active');
    
    count++;
    
    No_of_Moles.textContent=count;
    
    hitPosition=moleArr[randomMole].id;
    
    show_sound.play();
}


//checking score


function checkScores(){
    
    moleArr.forEach(curr=>{
        
        curr.addEventListener("mouseup",function(){
            
            if(curr.id==hitPosition){
                
                hit_sound.play();
                
                setTimeout(()=>{
                    
                    score_sound.play();
                    
                },200);
                
                score++;
                
                Mole_Score.textContent=score;
                
                
            }
            
          
        })
    })
    
}


checkScores();


function renderTimer(){
    
    timeLeft--;
    
    Mole_Timer.textContent=timeLeft;
    
    if(timeLeft==0){
        
        clearInterval(interval);
        
        moleArr[randomMole].classList.remove("mole-active");
        
        result.textContent="GAME OVER!!! YOUR FINAL SCORE IS:"+score;
    }
    
}

function update(){
    
    setTimeout(()=>{

        showMoles();
        
    },1200);
    

renderTimer();    
    
}

document.querySelector("#start").addEventListener("click",startGame);
document.querySelector("#pause").addEventListener("click",pauseGame);
document.querySelector("#restart").addEventListener("click",restartGame);
document.querySelector("#quit").addEventListener("click",quitGame);

function startGame(){
    
    if(!interval){

        interval=setInterval(update,1000);
        
    }
    
}

function pauseGame(){
    
    clearInterval(interval);
    
    interval=false;
    
}

function restartGame(){
    
    count=0;
    score=0;
    
    No_of_Moles.textContent=count;
    Mole_Score.textContent=score;
    timeLeft=60;
    
    result.textContent="";
    
    pauseGame();
    startGame();
    
}

function quitGame(){
    
    window.location="../../games/../index.html";
    
}