'use strict'
class CardInitializer {
    static #values = ['6','7','8','9','10','V','Q','K','A']; //созданные через # - private
    static suits = ['♠','♥','♦','♣'];
    static #powers = [6,7,8,9,10,11,12,13,14]

    static getCountCards = () =>{
        return this.#values.length * this.suits.length;
    }

    static checkIndex = (index) =>{
        return index >= 0 && index < this.getCountCards();
    }

    static getOneCard = (index) => {

        if(!this.checkIndex(index)) console.error('Incorrect Card index');

        return{
            value:this.#values[index % this.#values.length],
            suit:this.suits[index % this.suits.length],
            power:this.#powers[index % this.#powers.length]
        }
    }
}

// var ci = new CardInitializer();
// for (let i = 0; i  < ci.getCountCards(); ++i){
//     console.dir(ci.getOneCard(i));
// }

var CardState = {
    INDECK:'indeck',
    ONHAND:'onhand',
    FOLDED:'folded',
    INGAME:'ingame'
}
CardState = Object.freeze(CardState);

class Card {
    #value = null;
    #suit = null;
    #power = null;
    #state = CardState.INDECK;
    #isTrump = false;
    constructor(cardobj) {
        this.#value = cardobj.value;
        this.#suit = cardobj.suit;
        this.#power = cardobj.power;
    }

    getSuit = () => {return this.#suit};
    getValue = () => {return this.#value};
    getPower= () => {return this.#power};
    getTrump = () => {return this.#isTrump};
    getState = () => {return this.#state};

    changeState = (newState) => {
        if((this.#state == CardState.ONHAND && newState == CardState.INGAME) ||
           (this.#state == CardState.INDECK && newState == CardState.ONHAND) ||
           (this.#state == CardState.INGAME && newState == CardState.FOLDED) ||
           (this.#state == CardState.INGAME && newState == CardState.ONHAND)){
            this.#state = newState;
        }
        
    }

    changeTrump = (newTrump = false) =>{
        if(this.#state == CardState.INDECK && !this.#isTrump && newTrump){
            this.#isTrump = true;
            this.#power +=100;
        }
        else if(this.#state == CardState.INDECK && this.#isTrump && !newTrump){
            this.#isTrump = false;
            this.#power -=100;
        }
    }

    ToString = () => {
        return `Value: ${this.#value}; Suit: ${this.#suit}; Power: ${this.#power}; Trump: ${this.#isTrump}`;
    }
}

class CardDeck {
    #cards = [];
    constructor(){
        this.init();
    }

    init = () => {
        this.#cards = [];
        for(let i = 0;i < CardInitializer.getCountCards(); ++i){
            this.#cards.push(new Card(CardInitializer.getOneCard(i)));
        }
    }

    getCard = (index) => {
        if(!CardInitializer.checkIndex(index))console.error('Incorrect card index');
        return this.#cards[index];
    }

    shuffle = () => {
        for(let i = 0; i < this.#cards.length - 1;++i){
            let j = Math.floor(Math.random() * i);
            let temp = this.#cards[i];
            this.#cards[i] = this.#cards[j];
            this.#cards[j] = temp;
        }
    }

    pickTrump = () => { 
        for(let i = 0; i < this.#cards.length - 1;++i){
            this.#cards[i].changeTrump(false);
        }
        let newTrump = CardInitializer.suits[Math.floor(Math.random() * CardInitializer.suits.length)];
        for(let i = 0; i < this.#cards.length - 1;++i){
            if(this.#cards[i].getSuit() == newTrump){
                this.#cards[i].changeTrump(true);
            }
        }
        return newTrump;
    }
}

// var cd = new CardDeck();
// console.log('Original deck:')
// for(let i = 0;i < CardInitializer.getCountCards(); ++i){
//     console.log(cd.getCard(i));
// }
// console.log('----------------------------------------------------------------')
// cd.shuffle();
// let newTrump = cd.pickTrump();
// console.log(`Shuffled deck with trump picked(${newTrump}):`)
// for(let i = 0;i < CardInitializer.getCountCards(); ++i){
//     console.log(cd.getCard(i));
// }

var cd = new CardDeck();
var listOriginalDeck = document.getElementById("listOriginalDeck");
var listShuffledDeck = document.getElementById("listShuffledDeck");
for(let i = 0;i < CardInitializer.getCountCards(); ++i){
    var listItem = document.createElement("p");
    listItem.textContent = cd.getCard(i).ToString();
    listOriginalDeck.appendChild(listItem);
}

cd.shuffle();
cd.pickTrump();

for(let i = 0;i < CardInitializer.getCountCards(); ++i){
    var listItem = document.createElement("p");
    listItem.textContent = cd.getCard(i).ToString();
    listShuffledDeck.appendChild(listItem);
}