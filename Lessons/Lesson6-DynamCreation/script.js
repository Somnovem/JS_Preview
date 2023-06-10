(()=>{
    window.addEventListener('load',()=>{
        var rootElement = document.querySelector('#root');
        var logo = document.createElement('img'); //пока только в памяти браузера
        logo.classList.add('logo');
        logo.setAttribute('alt','Logo'); //универсальный способ, хотя можно и напрямую
        logo.setAttribute('src','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.m1ar389tpEOAFN1NTurqvwHaHa%26pid%3DApi&f=1&ipt=5cb3df3d0eb1cf499e97a1e4f64a5ff9f6b9d42be0264fbb3d4f1b0e1cc1a0b7&ipo=images');
        rootElement.appendChild(logo);
        logo.addEventListener('click',(e)=>{
            e.target.parentNode.removeChild(e.target);
            logo = null; //чтобы удалить и из памяти(обьект же остался) - затираем ссылку, чтобы сборщик мусора освободил ресурсы
            console.log(logo);
        });
    });
})()