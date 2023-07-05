console.log($)

$(document).ready(()=> {

});

$(() => {
    var currentPlayer = 1;
    var player1Score = 0;
    var player2Score = 0;
    var isPvp = window.confirm('Player vs Player?');
    var movesDone = 0;
    var gameOver = false;
    var combinations = [14,112,896,146,292,584,546,168];
    var $table =  $(".tictactoe");
    $table.css({
        'font-size':'26px',
        'border':'2px solid black',
        'border-radius':'15px',
        'padding':'15px'
        });
    var $cells = $table.find('td');
    var movesMax = $cells.length;
    function restartGame(){
        if(window.confirm('Restart?')){
            $cells.each((index,elem)=>{
                $(elem).removeClass('player-1').removeClass('player-2');
            });
            movesDone = 0;
            currentPlayer = 1;
            player1Score = 0;
            player2Score = 0;
            $('#gameState').text('Current player:cross');
        }
        else gameOver = true;
    }
    function checkWin(){
        var scoreToCheck = (currentPlayer == 1) ? player1Score : player2Score;
        for (var i = 0; i < combinations.length; ++i){
            if ((scoreToCheck & combinations[i]) == combinations[i]) {
                if (currentPlayer == 1) window.alert('Crosses won!');
                else window.alert('Circles won!');
                restartGame();
                return;
            }
        }
        if(movesDone == movesMax){
            window.alert('Tie');
            restartGame();
            return;
        }
        if(currentPlayer == 1){
            $('#gameState').text('Current player:circle');
            currentPlayer = 2;
        }
        else{
            $('#gameState').text('Current player:cross');
            currentPlayer = 1;
        }
        return;
    }
    $cells.each((index,elem) => {
    $(elem).css({
            'width':'50px',
            'height':'50px',
            'border':'1px solid black',
            'background-repeat':'no-repeat',
            'background-size':'contain'
        }).attr({
            'title':Math.pow(2,index+1)
        }).addClass('selected')
            .removeClass('cell')
            .toggleClass('oneCell')
            .on('click',(e)=>{
                if(!gameOver){
                    if($(elem).hasClass('player-1') || $(elem).hasClass('player-2'))return;
                    $(elem).addClass(`player-${currentPlayer}`)
                    ++movesDone;
                    if(currentPlayer == 1)player1Score += parseInt(elem.title);
                    else player2Score += parseInt(elem.title);
                    checkWin();
                    if(currentPlayer == 2 && !isPvp){
                        var randomCell = null;
                        while(true){
                            randomCell = $cells[Math.floor(Math.random()*9)];
                            if($(randomCell).hasClass('player-1') || $(randomCell).hasClass('player-2')){
                                continue;
                            }
                            break;
                        }
                        $(randomCell).addClass('player-2');
                        ++movesDone;
                        player2Score += parseInt(randomCell.title);
                        checkWin();
                    }
                }
            });
    });
})
