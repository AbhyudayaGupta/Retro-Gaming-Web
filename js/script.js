
//filtering elements on search
document.querySelector(".search").addEventListener("keyup",function(){
    
    
    let searchVal=document.querySelector(".search").value.toUpperCase();
    
    let games=document.querySelectorAll(".filterDiv");
    
    
    
    for(let i=0;i<games.length;i++){
    
        
        let gamesClassName=games[i].className.toUpperCase();
        let gamesNames=games[i].innerHTML.toUpperCase() || games[i].textContent.toUpperCase();
        
        if(gamesClassName.indexOf(searchVal)>-1 || searchVal=='ALL' || gamesNames.indexOf(searchVal)>-1){
    
            
            games[i].style.display="";
        }
        
        else{
            
            games[i].style.display="none";
        }
        
    }
    
});


//filtering elements on click

filterSearch('all');

function filterSearch(val){
    
    if(val=='all'){
        
        val='';
    }
    
    let filterDiv=document.querySelectorAll(".filterDiv");
    
    for(let i=0;i<filterDiv.length;i++){
    
        
        removeClass(filterDiv[i],"show");
        
        if(filterDiv[i].className.indexOf(val)>-1){
            
            addClass(filterDiv[i],"show")
        }
    }
    
}


function addClass(element,name){
    
    let arr1=element.className.split(" ");
    let arr2=name.split(" ");
    
    for(let i=0;i<arr2.length;i++){
        
        if(arr1.indexOf(arr2[i]==-1)){
            
            element.className+=" "+arr2[i];
            
        
        }
    }
    
}


function removeClass(element,name){
    
       
    let arr1=element.className.split(" ");
    let arr2=name.split(" ");
    
    
    for(let i=0;i<arr2.length;i++){
        
        while(arr1.indexOf(arr2[i])>-1){
            
            arr1.splice(arr1.indexOf(arr2),1);
        }
    }
    

    element.className=arr1.join(" ");
   
}

let btn=document.querySelectorAll(".btn");

for(let i=0;i<btn.length;i++){
    
    btn[i].addEventListener("click",function(e){
        
        let current_active=document.querySelector(".active");
        
        current_active.className=current_active.className.replace(" active","");
        
        e.target.className+=" active";
       
        
    });
    
    
}