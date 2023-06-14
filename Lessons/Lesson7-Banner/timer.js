var Timer = class {
    #expireDate = null;
    #timerId = null;
    #elapsedTime = {
        day:null,
        hour:null,
        minute:null,
        second:null
    }


    constructor(expireDate){
        this.#expireDate = expireDate;
    }

    render = () =>{
        const container = document.createElement('div');
        container.style.color = 'white';
        container.style.fontSize = '36px';
        container.style.fontFamily = 'SEGOE UI';

        const dayElement = document.createElement('span');
        dayElement.innerHTML = this.#elapsedTime.day;
        container.appendChild(dayElement);
    
        const colon1 = document.createElement('span');
        colon1.style.margin = '0 5px';
        colon1.innerHTML = ':';
        container.appendChild(colon1);
    
        const hourElement = document.createElement('span');
        hourElement.innerHTML = this.#elapsedTime.hour.toString().padStart(2,'0');
        container.appendChild(hourElement);
    
        const colon2 = document.createElement('span');
        colon2.style.margin = '0 5px';
        colon2.innerHTML = ':';
        container.appendChild(colon2);
    
        const minuteElement = document.createElement('span');
        minuteElement.innerHTML = this.#elapsedTime.minute.toString().padStart(2,'0');
        container.appendChild(minuteElement);
    
        const colon3 = document.createElement('span');
        colon3.style.margin = '0 5px';
        colon3.innerHTML = ':';
        container.appendChild(colon3);
    
        const secondElement = document.createElement('span');
        secondElement.innerHTML = this.#elapsedTime.second.toString().padStart(2,'0');
        container.appendChild(secondElement);
    
        return container;
    }

    start = () =>{
        if(this.#timerId == null){
            this.#setElapsedTime();
            this.#tick();
        }
    }

    stop = () =>{
        if(this.#timerId != null){
            clearInterval(this.#timerId);
            this.#timerId = null;
        }
    }

    #tick = () =>{
        this.#timerId = setInterval(()=>{
            this.#setElapsedTime();
        },1000);
    }

    #setElapsedTime = () => {
        this.#elapsedTime.second = Math.floor((this.#expireDate - new Date()) / 1000);
        this.#elapsedTime.day = Math.floor(this.#elapsedTime.second / 86400);
        this.#elapsedTime.second -=this.#elapsedTime.day * 86400;
        this.#elapsedTime.hour = Math.floor(this.#elapsedTime.second / 3600);
        this.#elapsedTime.second -=this.#elapsedTime.hour * 3600;
        this.#elapsedTime.minute = Math.floor(this.#elapsedTime.second / 60);
        this.#elapsedTime.second -=this.#elapsedTime.minute * 60;
    }
}