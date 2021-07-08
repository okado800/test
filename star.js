class Stars{
    constructor(){
        this.piece = Math.floor( Math.random() * (2000 + 1 - 1000) ) + 1000 ;
    }
    randomNumber(min,max){
        return Math.floor( Math.random() * (max + 1 - min) ) + min ;
    }
    make(){
        
        let night = document.getElementById("night")
        
        console.log(this.randomNumber(2000,1000));
        for(let i = 0; i < this.randomNumber(2000,1000); i++){
            let div = document.createElement('div');
            div.setAttribute("class","star");
            div.style.top = (Math.random() * 101).toFixed(1) + "%";
            div.style.left = (Math.random() * 101).toFixed(1) + "%";
            let scale = (Math.random() * 3).toFixed(1)+"px";
            div.style.width = scale;
            div.style.height = scale;
            let rgba = "rgba(" + this.randomNumber(255,200) +"," + this.randomNumber(255,200) + "," + this.randomNumber(255,200) + ((Math.random() * ( 0.9 - 0.6) ) + 0.6) + ")";
            div.style.backgroundColor = rgba;
            div.style.boxShadow = "0 0 5px " + rgba + ", 0 0 8px " + rgba +", 0 0 15px " + rgba;
            let boxShadow = "0 0 5px&nbsp" + rgba + ", 0 0 8px&nbsp" + rgba +", 0 0 15px&nbsp" + rgba;
            console.log(boxShadow); 

            night.appendChild(div);
       }
    }
    
    
}

let stars = new Stars();
stars.make();



