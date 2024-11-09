let btn=document.querySelectorAll("button");

let pos1=document.getElementById("1");
let pos2=document.getElementById("2");
let pos3=document.getElementById("3");
let pos4=document.getElementById("4");
let pos5=document.getElementById("5");
let pos6=document.getElementById("6");
let pos7=document.getElementById("7");
let pos8=document.getElementById("8");
let pos9=document.getElementById("9");

let state=document.querySelector(".state");

let activePlayer=0;

btn.forEach(curr=>{
    
    curr.addEventListener("click",function(){

        
        if(activePlayer==0){
            
            curr.textContent="O";
            
            curr.disabled=true;
            
            state.textContent="X Turn";
            
            
            activePlayer=1;
            
            
        }
        
        else if(activePlayer==1){
            
            curr.textContent="X";
            
            curr.disabled=true;
         
            state.textContent="O Turn";
            
            activePlayer=0;
        }
     
        
        
        if(checkWinner()){
            
            for(let i=0;i<btn.length;i++){
                
                btn[i].disabled=true;
                
                state.textContent=checkWinner();
                
                
                state.style.fontSize="1.8rem";
                state.style.color="green";
            }
            
            
        }  
        
    });
});



function checkWinner(){
    
   
  if((pos1.textContent=='O' && pos2.textContent=='O' && pos3.textContent=='O') || (pos4.textContent=='O' && pos5.textContent=='O' && pos6.textContent=='O')|| (pos7.textContent=='O' && pos8.textContent=='O' && pos9.textContent=='O') || (pos1.textContent=='O' && pos4.textContent=='O' && pos7.textContent=='O') || (pos2.textContent=='O' && pos5.textContent=='O' && pos8.textContent=='O') || (pos3.textContent=='O' && pos6.textContent=='O' && pos9.textContent=='O') || (pos1.textContent=='O' && pos5.textContent=='O' && pos9.textContent=='O') || (pos3.textContent=='O' && pos5.textContent=='O' && pos7.textContent=='O')){
   
       return "O wins"
       
   }
    
   else if((pos1.textContent=='X' && pos2.textContent=='X' && pos3.textContent=='X') || (pos4.textContent=='X' && pos5.textContent=='X' && pos6.textContent=='X')|| (pos7.textContent=='X' && pos8.textContent=='X' && pos9.textContent=='X') || (pos1.textContent=='X' && pos4.textContent=='X' && pos7.textContent=='X') || (pos2.textContent=='X' && pos5.textContent=='X' && pos8.textContent=='X') || (pos3.textContent=='X' && pos6.textContent=='X' && pos9.textContent=='X') || (pos1.textContent=='X' && pos5.textContent=='X' && pos9.textContent=='X') || (pos3.textContent=='X' && pos5.textContent=='X' && pos7.textContent=='X')){
         
      return "X wins";
       
   }
    

   else{
       
     
       if(pos1.textContent!=""&&pos2.textContent!=""&&pos3.textContent!=""&&pos4.textContent!=""&&pos5.textContent!=""&&pos6.textContent!=""&&pos7.textContent!=""&&pos8.textContent!=""&&pos9.textContent!=""){
           
        return "It's a draw";   
           
       }
     
    
   }       
    
}


document.querySelector("#reset").addEventListener("click",function(){
    
    for(let i=0;i<btn.length;i++){
        
        btn[i].textContent="";
        
        btn[i].disabled=false;
        
    }

        
    state.textContent="";
    
     state.style.fontSize="1.4rem";
     state.style.color="#707070";
    
})

document.querySelector("#quit").addEventListener("click",function(){
     
    window.location="../../games/../index.html";
});