let dice=document.querySelector(".dice");

let random,roundScore=0,activePlayer=0,scores=[0,0],isPlaying=true;

//rolling dice
document.querySelector(".roll").addEventListener("click",function(){
    
    if(isPlaying){
    
    random=Math.floor(Math.random()*6)+1;
    
    dice.src="images/dice-"+random+".png";
    dice.style.visibility="visible";
    

    
    if(random!=1){
        
    roundScore+=random;
        
    document.querySelector("#current-"+activePlayer).textContent=roundScore;
        
        
    }
    
    else{

        nextPlayer();
    }
    
    }
    
    
});

//holding scores;
document.querySelector(".hold").addEventListener("click",function(){
    
    let winningPoint,inputVal;  
    
    if(isPlaying){
    
    scores[activePlayer]+=roundScore;
    
    document.querySelector(".score-"+activePlayer).textContent=scores[activePlayer];
    
    inputVal=document.querySelector(".max").value;    
        
    if(inputVal){
        
        winningPoint=inputVal;
    }
        
    else{
        
        winningPoint=100;
    }    
        
    if(scores[activePlayer]>=winningPoint){
        
        document.querySelector("#player-"+activePlayer).textContent="Winner";
        document.querySelector(".player-"+activePlayer+"-pannel").classList.add("winner");
        
     
        isPlaying=false;
        
    }
        
        
        
    
    else{
     
        nextPlayer();
        
    }
        
    }
    
});

function nextPlayer(){
    

    document.querySelector(".player-"+activePlayer+"-pannel").classList.toggle("active");
        
    document.querySelector("#current-"+activePlayer).textContent=0;      
        
    activePlayer==0 ? activePlayer=1 : activePlayer=0;    
        
    roundScore=0;
  
    document.querySelector(".player-"+activePlayer+"-pannel").classList.toggle("active");    
            
    
}


//reset board
document.querySelector(".reset").addEventListener("click",function(){
    
    roundScore=0;
    activePlayer=0;
    scores=[0,0];
    isPlaying=true;
    
    
    
    document.querySelector("#current-0").textContent=0;   
    document.querySelector("#current-1").textContent=0;   
    
    document.querySelector(".score-0").textContent=0;
    document.querySelector(".score-1").textContent=0;
    
    document.querySelector(".player-0-pannel").classList.remove("winner");    
    document.querySelector(".player-1-pannel").classList.remove("winner");    
    document.querySelector(".player-0-pannel").classList.add("active");    
    document.querySelector(".player-1-pannel").classList.remove("active");    
      
    document.querySelector("#player-0").textContent="Player 1";    
    document.querySelector("#player-1").textContent="Player 2";    

    dice.style.visibility="hidden";
    
    document.querySelector(".max").value="";
    
});

document.querySelector(".quit").addEventListener("click",function(){
    
       
    window.location="../../games/../index.html"; 
    
});