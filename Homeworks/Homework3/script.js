var CharacterConfig = {
    MAX_LVL:150,
    MAX_HEALTH:15000,
    MAX_MANA:10000,
    MAX_STAMINA:12500,
    LEVEL_STEP:100,
    EXP_MULTIPLICATOR:1.5
}
CharacterConfig = Object.freeze(CharacterConfig);

var Character = function(options){
    var _name = '';
    var _health = 10;
    var _exp = 0;
    var _lvl = 0;
    var _mana = 0;
    var _stamina = 10;

    this.getName = function(){
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
        if(typeof health !== 'number' || health > CharacterConfig.MAX_HEALTH || health < 0){
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
        if(typeof mana !== 'number' || mana > CharacterConfig.MAX_MANA || mana < 0){
            console.error('setMana -> invalid data argument')
        }
        else _mana = mana;
    }

    this.setStamina = function(stamina = 0){
        if(typeof stamina !== 'number' || stamina > CharacterConfig.MAX_STAMINA || stamina < 0){
            console.error('setStamina -> invalid data argument')
        }
        else _stamina = stamina;
    }

    this.addExp = function(exp = 0){
        if(typeof exp !== 'number' || exp < 0){
            console.error('addExp -> invalid data argument')
        }
        else {
            _exp +=exp;
            lvlUp();
        }
    }

    var lvlUp = function(){
        while(_lvl + 1 < CharacterConfig.MAX_LVL && _exp >= CharacterConfig.LEVEL_STEP * Math.pow(CharacterConfig.EXP_MULTIPLICATOR,_lvl)){
            ++_lvl;
            this.setHealth(this.getHealth()*1.03);
            this.setMana(this.getMana()*1.02);
            this.setStamina(this.getStamina()*1.02);
        }
    }

    this.setHealth(options.health);
    this.setMana(options.mana);
    this.setStamina(options.stamina);
    this.setName(options.name);
}

var Undead = function (options){
    Character.apply(this,arguments); 
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
    
    this.setPowerOfUndead(options.powerOfUndead);

    Undead.prototype = Object.create(Character);
}
var arthas = new Undead({health:5000,name:'arthas',mana:10000,stamina:5000,powerOfUndead:4});
arthas.addExp(260000);
console.log(arthas.getLvl());