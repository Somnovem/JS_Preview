(()=>{
    var canvas = document.querySelector('#myCanvas');
    if (canvas == null) return;

    class Packman {
        #_x = 50;
        #_y = 50;
        #_radius = 25;
        #_color = 'yellow';
        #_isOpening = false;
        #_kOpen = .2; //0-0.2
        #_ctx = null;
        #_isRotated = false;
        
        constructor(x,y,radius,color,ctx){
            this.#_x = x;
            this.#_y = y;
            this.#_radius = radius;
            this.#_color = color;
            this.#_ctx = ctx;
            this.draw();
        }

        draw = () => {
            setInterval(()=>{
                this.#_ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
                if(this._isOpening){
                    this.#_kOpen += 0.02;
                    if(this.#_kOpen >=0.2) this._isOpening = false;
                }
                else{
                    this.#_kOpen -= 0.02;
                    if(this.#_kOpen <=0) this._isOpening = true;
                }
                this.#_ctx.beginPath();
                if(this.#_isRotated){
                    this.#_ctx.arc(this.#_x, this.#_y, this.#_radius, (1.02 + this.#_kOpen) * Math.PI, (0.95-this.#_kOpen) * Math.PI);
                }
                else{
                    this.#_ctx.arc(this.#_x, this.#_y, this.#_radius, this.#_kOpen * Math.PI, (2-this.#_kOpen) * Math.PI);
                }
                this.#_ctx.lineTo(this.#_x, this.#_y);
                this.#_ctx.fillStyle = this.#_color;
                this.#_ctx.strokeStyle = this.#_color;
                this.#_ctx.stroke();
                this.#_ctx.fill();
                this.#_ctx.closePath();
    
                this.#_ctx.beginPath();
                if(this.#_isRotated){
                    this.#_ctx.arc(this.#_x-15,this.#_y-30, this.#_radius*0.12, 0, 2 * Math.PI);
                }
                else{
                    this.#_ctx.arc(this.#_x+15,this.#_y-30, this.#_radius*0.12, 0, 2 * Math.PI);
                }
                this.#_ctx.fillStyle = 'black';
                this.#_ctx.strokeStyle = 'black';
                this.#_ctx.stroke();
                this.#_ctx.fill();
                this.#_ctx.closePath();
            },1000 / 60)

        }

        move = (dir) => {
            switch(dir){
                case Dir.UP:{
                    this.#_y -= 10;
                    break;
                }
                case Dir.DOWN:{
                    this.#_y += 10;
                    break;
                }
                case Dir.LEFT:{
                    this.#_x -= 10;
                    if(!this.#_isRotated)this.#_isRotated = true;
                    break;
                }
                case Dir.RIGHT:{
                    this.#_x += 10;
                    if(this.#_isRotated) this.#_isRotated = false;
                    break;
                }
            }
            if(this.#_x >= 800){
                this.#_x -=800;
            }
            else if(this.#_x <= -20){
                this.#_x +=800;
            }
            else if(this.#_y >= 650){
                this.#_y -=650;
            }
            else if(this.#_y <= 0){
                this.#_y +=650;
            }
        }
    }

    var ctx = canvas.getContext('2d');

    var packman = new Packman(canvas.clientWidth/2,canvas.clientHeight/2,50,'yellow',ctx); 

    var Dir = {
        UP:0,
        RIGHT:1,
        DOWN:2,
        LEFT:3
    }

    window.addEventListener('keypress', (e) => {
        console.log(e.code)
        switch (e.code){
            case "KeyW":{
                packman.move(Dir.UP);
                break;
            }
            case "KeyS":{
                packman.move(Dir.DOWN);
                break;
            }
            case "KeyD":{
                packman.move(Dir.RIGHT);
                break;
            }
            case "KeyA":{
                packman.move(Dir.LEFT);
                break;
            }
        }
    });




    // ctx.beginPath();
    // ctx.lineTo(150,150);
    // ctx.lineTo(300,150);
    // ctx.lineTo(300,50);
    // ctx.lineTo(200,250);
    // ctx.fillStyle = 'red';
    // ctx.strokeStyle = 'blue';
    // ctx.stroke();
    // ctx.fill();
    // ctx.closePath();

    // ctx.beginPath();
    // //ctx.moveTo(canvas.clientWidth/2,canvas.clientHeight/2);
    // ctx.arc(canvas.clientWidth/2,canvas.clientHeight/2,150,Math.PI * 0.5, Math.PI * (-0.25));
    // ctx.stroke();
    // ctx.fill();
    // ctx.closePath();

    // ctx.beginPath();
    // ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
    // ctx.fillRect(50,50,250,50);
    // ctx.font = "28px 'Courier New'";
    // ctx.fillText('Hello,World!',400,300);
    // ctx.closePath();
})()