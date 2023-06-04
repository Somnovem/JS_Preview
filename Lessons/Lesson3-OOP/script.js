var door = { //Создан пустой обьект класса и уже являеться экземпляром
    width:0,
    height:0,
    depth:0
}

door.height = 2000;
door.width = 900;
door.depth = 60;

console.log(door)

door.color = 'gray'; //динамически было добавлено свойства

console.log(door)

door.height = 'Вася, который ест мыло';

console.log(door)

// - нет инкапсуляции; обьект - уже один и единственный экземпляр класса(зачастую используеться для обмена данными между клиентом и сервером)

var door = function(w,h,d,c) {
    this.width = w; //модификаторов доступа нет, поэтому все это public
    this.height = h;
    this.depth = d;
    this.color = c;

    var manufacturer = ""; //приватная переменная(значит так можно делать и функции)

    this.getManufacturer = function(){return manufacturer;} //public getter(безопасность данных и инкапсуляция) - анонимная функция

    this.setManufacturer = function(manuf = ""){ //public setter(безопасность данных и их ввода в обьект(проверки инпута))
        if(manuf.length >=3){
            manufacturer = manuf;
        }
        else console.error("setManufacturer -> incorrect value data");
    }

    var getGold = function(){ //замыкание - private method

    }
}

door();


//создание обьекта на основании конструктора
var firstDoor = new door(900,2000,80,'pink'); //создан екземпляр обьекта

console.log(firstDoor.width + " " + firstDoor.height + " " + firstDoor.depth + " " + firstDoor.color);
firstDoor.creationDate = new Date();
console.log(firstDoor.creationDate); //без инкапсуляции мы имеем свободный доступ в хаосе к данным обьекта


var secondDoor = new door(700,200,80,'pink');
console.log(secondDoor.width + " " + secondDoor.height + " " + secondDoor.depth + " " + secondDoor.color);
console.log(secondDoor.creationDate); //undefined, так как для этого обьекта такого свойства не существует
secondDoor.manufacturer = "Вася с гаражей"; //свойство manufacturer(личный этого обьекта)
secondDoor.setManufacturer("Днепр Мебель"); //переменная класса
console.log(secondDoor.getManufacturer()); //соотвественно из-за разности доступа это 2 разные переменные(хоть и с одним именем)
console.log(secondDoor.manufacturer);
