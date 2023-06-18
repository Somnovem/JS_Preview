'use strict'

class Validator{

    #_validateStr = '';
    #_errors = [];
    #_etalonSimple = '01234556789_qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    #_etalonExt = '01234556789_@.()$#qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

    GetError = (index = 0) => {
        return this.#_errors[index];
    }

    GetErrors = () => {
        return this.#_errors;
    }

    constructor(validateStr) {
        this.Validate(validateStr);
    }

    Validate = (validateStr) => {
        this.#_validateStr = validateStr;
        this.#_errors = [];
        return this;
    }

    MaxLength = (maxCountLetters = 32) => {
        if(this.#_validateStr.length > maxCountLetters){
            this.#_errors.push('Max length surpassed');
        }
        return this;
    }

    MinLength = (minCountLetters = 3) => {
        if(this.#_validateStr.length < minCountLetters){
            this.#_errors.push('Min length surpassed');
        }
        return this;
    }

    ContainsInvalidSimpleLetters = () =>{
        for(var i = 0; i < this.#_validateStr.length; ++i){
            if(!this.#_etalonSimple.includes(this.#_validateStr[i])){
                this.#_errors.push(`Invalid symbol found: ${this.#_validateStr[i]}`);
            }
        }
        return this;
    }

    ContainsInvalidExtLetters = () =>{
        for(var i = 0; i < this.#_validateStr.length; ++i){
            if(!this.#_etalonExt.includes(this.#_validateStr[i])){
                this.#_errors.push(`Invalid symbol found: ${this.#_validateStr[i]}`);
            }
        }
        return this;
    }

    CheckPasswordComplexity = () => {
        var anUpper = /[A-Z]/;
        var anLower = /[a-z]/;
        var aDigit = /\d/;
        var aSpecial = /[@|#|$|-|_]/;

        var uppersMet = 0;
        var lowersMet = 0;
        var digitsMet = 0;
        var specialsMet = 0;
        for(var i = 0; i < this.#_validateStr.length; ++i){
            if(anUpper.test(this.#_validateStr[i])) ++uppersMet;
            else if(anLower.test(this.#_validateStr[i])) ++lowersMet;
            else if(aDigit.test(this.#_validateStr[i])) ++digitsMet;
            else if(aSpecial.test(this.#_validateStr[i])) ++specialsMet;
        }

        if(uppersMet < 2 || lowersMet < 2 || digitsMet < 2 || specialsMet < 2){
            this.#_errors.push('Password not complex');
        }
        return this;
    }

    IsEmail = () => {
        const emailRegPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if(!emailRegPattern.test(this.#_validateStr)){
            this.#_errors.push('Incorrect email format');
        }
        return this;
    }

    IsValidPhoneNumber = () => {
        const phoneRegPattern = /^(?:\+?\d{1,3}[ -])?\(?(\d{3})\)?[ -]?\d{3}[ -]?\d{4}$/;
        if(!phoneRegPattern.test(this.#_validateStr)){
            this.#_errors.push('Incorrect phone number format');
        }
        return this;
    }
}