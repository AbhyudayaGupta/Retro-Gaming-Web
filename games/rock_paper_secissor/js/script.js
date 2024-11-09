const currentPlayer=document.querySelectorAll(".c_player");

let player=document.querySelector("#player");
let computer=document.querySelector("#computer");

let userWin=document.querySelector(".user_win");
let tieWin=document.querySelector(".tie_win");
let comWin=document.querySelector(".com_win");
let current=document.querySelector(".current");
let result=document.querySelector(".result");
let timer=document.querySelector(".timer");



let user,com,random,userScore=0,comScore=0,tieScore=0,interval;

let isPlaying=false;

let timeLeft=timer.textContent;

document.querySelector(".play").addEventListener("click",function(){


    isPlaying=true;
    
    if(!interval){

        
    interval=setInterval(renderTimer,1000);
    
    document.querySelector(".reset").disabled=true;    
        
    }
    
});

function renderGame(){


for(let i=0;i<currentPlayer.length;i++){
    
    currentPlayer[i].addEventListener("click",function(){
        
        if(isPlaying){        
        user=currentPlayer[i].id;
        
        random=Math.floor(Math.random()*9)+1;
        
        if(random<=3){
    
          com="rock";

        }

       else if(random<=6){
    
           com="paper";


       }


         else if(random<=9){
    
          com="secissor";

         }

        
    
         showPlayers(user,com);   
     
         
         result.textContent=checkWin(user,com);
        
         checkScores();
        
    }
        
    });
}
        
}

renderGame();


function showPlayers(user,com){
    
        player.src="images/"+user+".png";
        computer.src="images/"+com+".png";
    
            
        player.style.visibility="visible";
        computer.style.visibility="visible";
    
}

function checkWin(user,com){
    
    if(user==com){
        
        return "Its a tie";
    }

    else if(user=="rock" && com=="secissor"){
        
        return "you win";
    }
    
    else if(user=="paper" && com=="rock"){
        
        return "you win";
    }
    
    else if(user=="secissor" && com=="paper"){
        
        return "you win";
    }
    
    else{
        
        return "you loose";
    }
    
 
    
}

function checkScores(){
    
    if(checkWin(user,com)=="you win"){
        
        userScore++;
        
        userWin.textContent=userScore;
    }
    
    else if(checkWin(user,com)=="you loose"){
        
        comScore++;
        
        comWin.textContent=comScore;
    }
    
    else if(checkWin(user,com)=="Its a tie"){
        
        tieScore++;
        
        tieWin.textContent=tieScore;
    }
}

function renderTimer(){
    
    timeLeft--;
    
    timer.textContent=timeLeft;
    
    if(timeLeft<=0){
        
        if((userScore>tieScore && userScore>comScore) || (userScore==tieScore && userScore>comScore) || (userScore<tieScore && userScore>comScore)){
            
            result.textContent="Player won by "+parseInt(userScore-comScore)+" points";
        }
        
        else if((comScore>tieScore && comScore>userScore) || (comScore==tieScore && comScore>userScore) || (comScore<tieScore && comScore>userScore)){
            
            result.textContent="Computer won by "+parseInt(comScore-userScore)+" points";
        }
        
        else if(comScore==userScore){
            
            result.textContent="Opps!!! its a tie";
        }
        
        clearInterval(interval);
        isPlaying=false;
        
        document.querySelector(".reset").disabled=false;
        document.querySelector(".play").disabled=true;
        
    }
}



document.querySelector(".reset").addEventListener("click",function(){
    
    comScore=0;
    tieScore=0;
    userScore=0;
    
    userWin.textContent=0;
    comWin.textContent=0;
    tieWin.textContent=0;
    
    result.textContent="";
    
    isPlaying=false;
    

    
    timer.textContent=15;

    timeLeft=15;
    
    interval=false;
    
    player.style.visibility="hidden";
    computer.style.visibility="hidden";
    
    document.querySelector(".play").disabled=false;
})


document.querySelector(".quit").addEventListener("click",function(){
    
     window.location="../../games/../index.html";
})

