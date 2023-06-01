var questionsArr = [];
var prizeSums = [100,200,300,500,1000,2000,4000,8000,16000,32000,64000,125000,250000,500000,1000000]

function fillQuestions(){

  questionsArr.push([
    " In the UK, the abbreviation NHS stands for National what Service?",
    ["Humanity", "Health", "Honour", "Household"],
    1,
  ]);
  questionsArr.push([
    "Which Disney character famously leaves a glass slipper behind at a royal ball?",
    ["Pocahontas", "Sleeping Beauty", "Cinderella", "Elsa"],
    2,
  ]);
  questionsArr.push([
    "What name is given to the revolving belt machinery in an airport that delivers checked luggage from the plane to baggage reclaim?",
    ["Hangar", "Terminal", "Concourse", "Carousel"],
    3,
  ]);
  questionsArr.push([
    "Which of these brands was chiefly associated with the manufacture of household locks?",
    ["Phillips", "Flymo", "Chubb", "Ronseal"],
    2,
  ]);
  questionsArr.push([
    " The hammer and sickle is one of the most recognisable symbols of which political ideology?",
    ["Republicanism", "Communism", "Conservatism", "Liberalism"],
    1,
  ]);
  questionsArr.push([
    "Which toys have been marketed with the phrase “robots in disguise”?",
    ["Bratz Dolls", "Sylvanian Families", "Hatchimals", "Transformers"],
    3,
  ]);
  questionsArr.push([
    "What does the word loquacious mean?",
    ["Angry", "Chatty", "Beautiful", "Shy"],
    1,
  ]);
  questionsArr.push([
    " Obstetrics is a branch of medicine particularly concerned with what?",
    ["Childbirth", "Broken bones", "Heart conditions", "Old age"],
    0,
  ]);
  questionsArr.push([
    "In Doctor Who, what was the signature look of the fourth Doctor, as portrayed by Tom Baker?",
    ["Bow-tie, braces and tweed jacket", "Wide-brimmed hat and extra long scarf", "Pinstripe suit and trainers", "Cape, velvet jacket and frilly shirt",],
    1,
  ]);
  questionsArr.push([
    "Which of these religious observances lasts for the shortest period of time during the calendar year?",
    ["Ramadan", "Diwali", "Lent", " Hanukkah"],
    1,
  ]);
  questionsArr.push([
    "At the closest point, which island group is only 50 miles south-east of the coast of Florida?",
    ["Bahamas", "US Virgin Islands", "Turks and Caicos Islands", " Bermuda"],
    0,
  ]);
  questionsArr.push([
    "Construction of which of these famous landmarks was completed first?",
    ["Empire State Building"," Royal Albert Hall","Eiffel Tower","Big Ben Clock Tower",],
    3,
  ]);
  questionsArr.push([
    "Which of these cetaceans is classified as a “toothed whale”?",
    ["Gray whale", "Minke whale", "Sperm whale", "Humpback whale"],
    2,
  ]);
  questionsArr.push([
    "Who is the only British politician to have held all four “Great Offices of State” at some point during their career?",
    ["David Lloyd George", "Harold Wilson", "James Callaghan", "John Major"],
    2,
  ]);
  questionsArr.push([
    "In 1718, which pirate died in battle off the coast of what is now North Carolina?",
    ["Calico Jack", "Blackbeard", "Bartholomew Roberts", "Captain Kidd"],
    1,
  ]);
}

var winnerPrize = 0;
var nonBurnablePoint = 5;
fillQuestions();
window.alert('To choose an answer, simply type in its number');
for(var i = 0; i < questionsArr.length; ++i){
    var questionPrompt = `(${prizeSums[i]}) ${questionsArr[i][0]}`;
    for(var j = 0; j < questionsArr[i][1].length; ++j){
        questionPrompt += `\n${j+1}. ${questionsArr[i][1][j]}`;
    }
    var answer = parseInt(window.prompt(questionPrompt));
    if(isNaN(answer) || answer < 1 || answer > 4){
        var reinputQuestion = window.confirm('No such answer option. Retry?');
        if(reinputQuestion){
            --i;
            continue;
        }
        else break;
    }

    if(answer - 1 != questionsArr[i][2]){
      window.alert('Unfortunately, this is an incorrect answer! Goodbye!');
      break;
    }
    if(i+1 == questionsArr.length) winnerPrize = prizeSums[i];
    else{
        var wantToContinue = window.confirm("Congratulations, this is the correct answer!\nDo you want to take the money or will you go on?");
        if(!wantToContinue){
            winnerPrize = prizeSums[i];
            break;
        }
        if(i != 0 && ((i + 1) % nonBurnablePoint) == 0) winnerPrize= prizeSums[i];
    }
}
window.alert(`And the game ends here!\nThe contestant won ${winnerPrize}$!`);