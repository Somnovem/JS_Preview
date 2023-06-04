'use strict'
var CharacterConfig = {
    MAX_LVL:15,
    MAX_HEALTH:15000,
    EXP_TABLE:[1000,2000,5000,10000,15000,20000,30000,50000,75000,100000,200000,275000,350000,500000,1000000]
}

CharacterConfig = Object.freeze(CharacterConfig) //делает обьект абсолютно неизменяемым
// CharacterConfig.MAX_HEALTH  = 1;//значение не поменяеться в любом случае, но при 'use strict' еще и будет вылетать ошибка
var Character = function(options){
    var _name = ''; //all privates
    var _health = 10;
    var _exp = 0;
    var _lvl = 0;
    var _mana = 0;
    var _stamina = 10;

    this.getName = function(){ //public getters
        return _name;
    }

    this.getHealth = function(){
        return _health;
    }

    this.getLvl = function(){
        return _lvl;
    }

    this.getExp = function(){
        return _exp;
    }

    this.getMana = function(){
        return _mana;
    }

    this.getStamina = function(){
        return _stamina;
    }

    this.setHealth = function(health = 0){
        if(typeof health !== 'number'){
            console.error('setHealth -> invalid data argument')
        }
        else _health = health;
    }

    this.setName = function(name = ''){
        if(name.name <= 3){
            console.error('setName -> invalid data argument')
        }
        else _name = name;
    }

    this.setMana = function(mana = 0){
        if(typeof mana !== 'number'){
            console.error('setMana -> invalid data argument')
        }
        else _mana = mana;
    }

    this.setStamina = function(stamina = 0){
        if(typeof stamina !== 'number'){
            console.error('setStamina -> invalid data argument')
        }
        else _stamina = stamina;
    }

    this.addExp = function(exp = 0){
        if(typeof exp !== 'number'){
            console.error('addExp -> invalid data argument')
        }
        else {
            _exp +=exp;
            lvlUp();
        }
    }

    var lvlUp = function(){
        while(_lvl < CharacterConfig.MAX_LVL && _exp >= CharacterConfig.EXP_TABLE[_lvl]){
            ++_lvl;
        }
    }

    this.setHealth(options.health); //иниц полей обьекта через внешние аргументы
    this.setMana(options.mana);
    this.setStamina(options.stamina);
    this.setName(options.name);
}

// var pers = new Character('bob',123,615,12362,51234,236,'q12') //wrong way

// var pers = new Character({name:'alex',mana:0,stamina:15,health:30}); //через анонимный обьект(и читабельно, и в любом порядке)

var Undead = function (options){
    Character.apply(this,arguments); //передать список всех аргументов(нужные он у себя в конструкторе заберет) - желательно писать в начале
    var _powerOfUndead = 0;
    this.getPowerOfUndead = function(){
        return _powerOfUndead;
    }

    this.setPowerOfUndead = function(powerOfUndead = 0){
        if(typeof powerOfUndead !== 'number'){
            console.error('powerOfUndead -> invalid argument type');
        }
        else _powerOfUndead = powerOfUndead;
    }
 
    Undead.prototype = Object.create(Character); //унаследование методов родителя - желательно писать в конце
}
var arthas = new Undead({health:5000,name:'arthas',mana:10000,stamina:5000});
console.log(arthas);
arthas.addExp(2000000);
console.log(arthas.getLvl());