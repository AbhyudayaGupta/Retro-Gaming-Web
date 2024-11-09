const grid=document.querySelector(".top-container");
let score=document.querySelector(".score");
let result=document.querySelector(".result");

let timer=document.querySelector(".timer");

let timeLeft=timer.textContent;

let cardChoosenId=[];
let cardChoosenName=[];

let gameWin=[];

let isPlaying=true;

const boardArray=[
    
    {
        name:"cheeseburger",
        img:"images/cheeseburger.png"
    },
    
    {
        name:"cheeseburger",
        img:"images/cheeseburger.png"
    },
    
    
    {
        name:"fries",
        img:"images/fries.png"
        
    },
    
    {
        
        name:"fries",
        img:"images/fries.png"
    },
    
    {
        
        name:"hotdog",
        img:"images/hotdog.png"
    },
    
    {
        name:"hotdog",
        img:"images/hotdog.png"
    },
    
    {
        name:"ice-cream",
        img:"images/ice-cream.png"
    },
    
    {
        name:"ice-cream",
        img:"images/ice-cream.png"
    },
    
    {
        name:"milshake",
        img:"images/milkshake.png"
    },
    
       
    {
        name:"milshake",
        img:"images/milkshake.png"
    },
    
       
    {
        name:"pizza",
        img:"images/pizza.png"
    },
    
       
    {
        name:"pizza",
        img:"images/pizza.png"
    }
    
    
    
];

boardArray.sort(()=>0.5-Math.random());

function checkMatch(){
    
    let BlankImg=document.querySelectorAll('img');
    
    let arrayId_1=cardChoosenId[0];
    let arrayId_2=cardChoosenId[1];
    
    if((cardChoosenName[0]==cardChoosenName[1])){
        
        


        BlankImg[arrayId_1].style.visibility="hidden";
        BlankImg[arrayId_2].style.visibility="hidden";
        
        gameWin.push(cardChoosenName);
        
        
    }
    
    else{
        
       
        
        BlankImg[arrayId_1].setAttribute('src','images/blank.png');
        BlankImg[arrayId_2].setAttribute('src','images/blank.png');    

      
      
    
    }
    
    score.textContent="Score:"+gameWin.length;
    
    if(gameWin.length==boardArray.length/2){
        
        result.textContent="Congratulations!!! you have found all the matches";
        
        clearInterval(interval);
        
        isPlaying=false;
    }
    
    
    cardChoosenId=[];
    cardChoosenName=[];
    
}

function flipCards(e){
    
    if(isPlaying){

    let img=document.querySelectorAll('img');
        
        
    let currentId=e.target.getAttribute('id');

 
    cardChoosenId.push(currentId);
    cardChoosenName.push(boardArray[currentId].name);
    
    
        
    e.target.setAttribute('src',boardArray[currentId].img);
 
   
   
        
    if(cardChoosenName.length==2){
        
           
   
        
        setTimeout(()=>{
            
            checkMatch();
            
        },500);
    }
    
    }
}


function createBoard(){
    
    for(let i=0;i<boardArray.length;i++){
    
    let boardImg=document.createElement('img');
    
         boardImg.setAttribute('src','images/blank.png');
        
         boardImg.setAttribute('id',i);
        
         grid.appendChild(boardImg);
        
         boardImg.addEventListener('click',flipCards);
        

        
    }
    
}


function renderTimer(){
    
    if(isPlaying){
    
    timeLeft--;
    
    timer.textContent=timeLeft;
    
    if(timeLeft<=0){
        
        clearInterval(interval);
        
        result.textContent="Game over!!!";
        
        isPlaying=false;
        
        
    }
    
    }
}

let interval;

function update(){

interval=setInterval(renderTimer,1000);

createBoard();


}

document.querySelector(".start").addEventListener("click",function(){
    
    if(!interval){
    
        update();
    }
        
    
});

document.querySelector(".reset").addEventListener("click",function(){    
    
    location.reload();
    
    
});

document.querySelector(".quit").addEventListener("click",function(){
    
    
    window.location="../../games/../index.html";
})