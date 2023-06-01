// //функция без возвращаемого значения - процедура

// function sum(a = 0,b = 0){ //function declaration
//     if(!isNaN(a) && !isNaN(b)){
//         return a+b;
//     }
//     // return null;
//     console.error("Incorrect arguments value");
// }

// var result = sum(15,-256); //function call
// result = sum([],"Василий");
// result = sum(); //непереданные аргументы приходят undefined

// function sum(){
//     console.log(arguments); //псевдомассив аргументов текущей функции
//     let result = 0;
//     let tmp = null;
//     for (var i =0; i < arguments.length; i++) {
//         tmp = parseFloat(arguments[i]);
//         if(!isNaN(tmp)){
//             result +=tmp;
//         }
//     }
//     return result;
// }

// result = sum(15,45,"Alex",[],{},true,-15.6,NaN);
// console.log(result);

// var tmp = function (){ //function expression - анонимная функция(лучше и сейчас и дальше(пригодиться в обьектах))

// }

// if(typeof tmp === 'function'){
//     tmp();
// }

// (function(){ //самовызывающейся функция(аналог namespace, так как varом ограничена только телом функции в которой была определнна переменная)
//     var a = 0;
// })() 
// //пишете библиотеку - 
// //пишете полезный код - енкапсулируйте в IIFE


// //Замыкание - возможность тела одной функции поместить в другую
// var calculate = function(operation,a,b){
//     if(isNaN(a) || isNaN(b)){
//         console.error('calculate => Incorrect arguments');
//     }


//     var getDiv = function(a,b){return a/b;};
//     var getSub = function(a,b){return a-b;};
//     var getResult = null;
//     switch(operation) {
//         case '+':{
//             getResult = getSum;
//             break;
//         }
//         case '-':{
//             getResult = getSub;
//             break;
//         }
//         case '*':{
//             getResult = getMulti;
//             break;
//         }
//         case '/':{
//             getResult = getDiv;
//             break;
//         }
//     }

//     function getSum(a,b){return a+b;};
//     function getMulti(a,b){return a*b;};
//     //Разница между варами и  functions в том, что var должен быть определен до момента вызова, function - когда-угодно
//     return getResult(a,b);
// }


// result = calculate('/',156,2);
// console.log(`calculation = ${result}`);

// var A = function(v){
//     console.log(v);
//     A = function(){
//         console.log('вася');
//         return v * Math.PI; //оно запомнило где брать v даже при том что сама в параметрах v не имеет
//     }
// }   //это происходит потому что сборщик мусора еще не убрал ссылку на старый параметр функции высшего уровня

// A(456);
// console.log(A(456));
// console.log(A(456));
// console.log(A(456));

// let SuperPuperFunc = function(val){ //Функция высшего уровня - функция, которая возвращает функцию
//     var res = Math.pow(Math.sqrt(val)*Math.PI,0.1358413155);
//     return function(h){
//         return h* res;
//     }
// }

// result = SuperPuperFunc(0.15);
// console.log(result);
// if(typeof result == 'function'){
//    console.log( result(-356));
// }


// //callback function


// var triangulateSum = function(a=0,b=0,next){
//     if(isNaN(a) || isNaN(b)){
//         console.error('triangulation => Incorrect arguments');
//     }
//     if(typeof next !== 'function'){
//         console.error('triangulation => Next is not a callback function');
//     }
//     if(a == 0 && b == 0) next(0);
//     else if(a == 0) next(b);
//     else if(b == 0) next(a);
//     else next(a+b);
// }

// triangulateSum(156,654,function(result){
//     console.log(`Result of trinagulation: ${result}`);
// })

// var showResult = function(result){
//     console.log(`Result of trinagulation: ${result}`);
// }

// triangulateSum(12,-4897,showResult); //он сам ее вызывает когда ему нужно

// //recursion - stackoverflow generator - должно иметь условие выхода

// var show = function (a) {
//     console.log(a);
//     if(a == 11000) return;
//     show(a + 1);
// }

// show(0);

// //стрелочные функции

// var supFunc = () => {
//     console.log(this); //иногда обращаеться не к этому обьекту класса, а к window
// };

// var supFuncSum = (a,b) =>{return a+b};

// console.log(this);
// supFunc();