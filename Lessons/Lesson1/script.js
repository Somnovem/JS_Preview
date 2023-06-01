// var age = 16;

/*
Типы данных
Number
String
undefined
NaN
boolean
*/


// console.log(age)
// console.log(NaN == NaN)

// let name = 'Roma';
// let surname = "Sherstyuk ";
// let patronimic = `Nicolaevich`;

// let cat;
// console.log(cat);
// cat += 15;
// console.log(cat);
// console.log(isNaN(cat))

// for (var i = 0; i< 10; i++){

// }

/*
Короткие записи
age++;
age--;
age+=1;
age-=1;
age*=1;
age/=1;
*/

// console.log(age % 2)

/*
Логические операции
>
<
>=
<=
==
!=
===
!==


&&
||
*/

// console.log(5 > 5)
// console.log('5' > 5)
// console.log(5 === 5)
// console.log(5 === '5')

// console.log(typeof(age))

// if(5 > 6) {
//     console.log(true);
// }
// else if(5 === 6){
//     console.log(false);
// }
// else {
//     console.log('sane');
// }

/*
Получить число в диапазоне
var randomNumber = min + Math.floor(Math.random() * (max-min))
*/

/* 57 <=> 168 */

// var a =  Math.floor(Math.random() * 400) - 200;
// var b = Math.floor(Math.random() * 400) - 200;
// console.log(`a = ${a}`);
// console.log(`b = ${b}`);

// if(a > 100 && b > 100){
//     console.log('first true')
// }

// if(a > 0 || b > 0){
//     console.log('second true')
// }

// if((a % 2 == 0 && b % 2 != 0) || (a % 2 != 0 && b % 2 == 0)){
//     console.log('third true')
// }






// var dayOfWeek = Math.floor(Math.random() * 7);
// switch (dayOfWeek){
//     case 0: {
//         console.log('Monday');
//         break;
//     }
//     case 1: {
//         console.log('Tuesday');
//         break;
//     }
//     default: {

//         break;
//     }
// } 

// var currentMonth = Math.floor(Math.random() * 12);
// console.log(`current Month: ${currentMonth}`);
// switch(currentMonth){
//     case 0:
//     case 1:
//     case 11:{
//         console.log('Winter');
//         break;
//     }
    
//     case 2:
//     case 3:
//     case 4:{
//         console.log('Spring');
//         break;
//     }

//     case 5:
//     case 6:
//     case 7:{
//         console.log('Summer');
//         break;
//     } 

//     case 8:
//     case 9:
//     case 10:{
//         console.log('Autumn');
//         break;
//     } 
// }



// window.alert('Hello');
// var quest = window.confirm('Do you drink?');
// console.log(typeof quest);
// console.log(quest);

// var quest = window.prompt('How old are you?');
// console.log(typeof quest);
// console.log(quest);
// var age = parseInt(quest);
// // Возвращает даже число в начале строки даже если дальше там не цифры
// console.log(typeof age);
// console.log(age);
// if(!isNaN(age)){
//     console.log("Magnificient!");
// }

// var arr = [];
// console.log(arr);
// console.dir(arr);
// arr[0] = 15;
// arr[1] = "Vasya";
// arr[2] = true;
// arr[46] = "Tom the cat";
// console.log(arr);

// // Область видимости переменной ограничен ТОЛЬКО телом функции
// if(true){
//     var q1535 = 456
// }

// console.log(q1535)

// var i =0;
// for (;i < 10;i++){
    
// }

// err = [];
// for(let i = 0;i < 10;i++){
//     arr[i] = Math.floor(Math.random() * 10);
// }

// // Переменная через var стала глобальной для всей функции, а при let - локальна
// console.log(arr)

// var delIndex = Math.floor(Math.random()*10);
// console.log(arr)
// console.log(`Deleting item at ${delIndex} - ${arr[delIndex]}`)
// var moves = arr.length - delIndex - 1;
// for(let i = delIndex; i < arr.length - 1; i++){
//     arr[i] = arr[i+1];
// }
// arr.length--;
// console.log(arr)


// var twoDArray = [];
// for (let t = 0; t < 10; t++) {
//     twoDArray[t] = [];
// }
// console.log(twoDArray);
// for(var r = 0; r < twoDArray.length; r++){
//     for(var c = 0; c <10; c++){
//         twoDArray[r][c] = Math.floor(Math.random()*10);
//     }
// }