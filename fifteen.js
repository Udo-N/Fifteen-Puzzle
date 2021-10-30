// This function updates the puzzle array being displayed in the web browser by altering the HTML document
function updateCells() {
    var t = "";
    for (var i = 0; i < 4; i++){
        var cells = "<div class='row-" + (i+1) + "'>";
        cells += "<button class='cell-"+ i +"-0'>" + puzzle[i][0] + "</button>";
        cells += "<button class='cell-"+ i +"-1'>" + puzzle[i][1] + "</button>";
        cells += "<button class='cell-"+ i +"-2'>" + puzzle[i][2] + "</button>";
        cells += "<button class='cell-"+ i +"-3'>" + puzzle[i][3] + "</button>";
        cells += "</div>";
        t += cells;
    }
    document.getElementById("puzzle").innerHTML = t;

    bclicks = document.querySelectorAll("#puzzle button");
    for (let bclick of bclicks) {
        bclick.addEventListener("click", () => {
            var v = bclick.textContent;
            moveCell(v);   
        });
    }

}

// This function randomizes the puzzle's tiles
function randomizePuzz (){
    let puzzle1d = puzzle.reduce((a, b) => [...a, ...b], []);       //convert to 1D array
    let currentIndex = puzzle1d.length, randomIndex;

    while (currentIndex != 0) {                                     //shuffle 1D array
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [puzzle1d[currentIndex], puzzle1d[randomIndex]] = [puzzle1d[randomIndex], puzzle1d[currentIndex]];
    }

    puzzle = puzzle1d.reduce((acc, i) => {                          //Change 1D array back to 2D array
        if(acc[acc.length-1].length >= 4) {
          acc.push([]);
        }
        acc[acc.length-1].push(i);
        return acc;
    }, [[]]);

    noOfMoves = 0;                                                  
    document.getElementById("counter").innerHTML = "<div id='counter'>Number of moves: 0</div>"
    updateCells();

    secondsLabel.innerHTML = "00";                                  //Restart timer
    minutesLabel.innerHTML = "00";
    totalSeconds = 0;    
    clearInterval(timer);                                   
    timer = setInterval(setTime, 1000);
}

// This function randomly chooses between the only two puzzles that require one move to be completed
// and displays the puzzle
function simplifyPuzz (){
    var arr1 = [                        
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, ".", 15],
    ];

    var arr2 = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, "."],
        [13, 14, 15, 12],
    ];

    puzzle = Math.random() < 0.5 ? arr1 : arr2;
    noOfMoves = 0;
    document.getElementById("counter").innerHTML = "<div id='counter'>Number of moves: 0</div>"
    updateCells();

    secondsLabel.innerHTML = "00";
    minutesLabel.innerHTML = "00";
    totalSeconds = 0;    
    clearInterval(timer);
    timer = setInterval(setTime, 1000);
}

function moveCell (cellValue){
    var row = 0;
    var col = 0;
    var Erow = 0;
    var Ecol = 0;

    if (cellValue != "."){ 
        for (var i = 0; i < puzzle.length; i++){
            for (var j = 0; j < puzzle[0].length; j++){
                if (puzzle[i][j] == cellValue){
                    row = i;
                    col = j;
                    i = puzzle.length; j = puzzle[0].length;
                }
            }
        }

        for (var i = 0; i < puzzle.length; i++){
            for (var j = 0; j < puzzle[0].length; j++){
                if (puzzle[i][j] == "."){
                    Erow = i;
                    Ecol = j;
                    i = puzzle.length; j = puzzle[0].length;
                }
            }
        }

        if (((Erow-row == 1) && (Ecol == col)) || ((row-Erow == 1) && (Ecol == col)) || 
        ((Erow == row) && (Ecol-col == 1)) || ((Erow == row) && (col-Ecol == 1))){
            [puzzle[Erow][Ecol], puzzle[row][col]] = [puzzle[row][col], puzzle[Erow][Ecol]];
            updateCells();
            noOfMoves++;
            document.getElementById("counter").innerHTML = "<div id='counter'>Number of moves: " + noOfMoves + "</div>";
        }
        
        checkForWin();
    }

}

function checkForWin (){
    if (JSON.stringify(puzzle) == JSON.stringify(goal)){
        console.log("you win");
        var a = "<div class = 'victory'> YOU HAVE SOLVED THE PUZZLE </div>";
        document.getElementById("puzzle").innerHTML = a;
        clearInterval(timer);
    }

}

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}


var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var timer = setInterval(setTime, 1000);

var puzzle = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, "."],
];
randomizePuzz();
var goal = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, "."],
];
var noOfMoves = 0;

var t = "";
for (var i = 0; i < puzzle.length; i++){
    var cells = "<div class='row-" + (i+1) + "'>";
    cells += "<button class='cell-"+ i +"-0'>" + puzzle[i][0] + "</button>";
    cells += "<button class='cell-"+ i +"-1'>" + puzzle[i][1] + "</button>";
    cells += "<button class='cell-"+ i +"-2'>" + puzzle[i][2] + "</button>";
    cells += "<button class='cell-"+ i +"-3'>" + puzzle[i][3] + "</button>";
    cells += "</div>";
    t += cells;
}
document.getElementById("puzzle").innerHTML = t;

document.addEventListener("DOMContentLoaded", () => {
    const newGame = document.querySelector(".new-game");
    const simpGame = document.querySelector(".simp-game");
    var bclicks = document.querySelectorAll("#puzzle button");
    
    

    for (let bclick of bclicks) {
        bclick.addEventListener("click", () => {
            var v = bclick.textContent;
            moveCell(v);
        });
    }    
    
    newGame.addEventListener("click", randomizePuzz);

    simpGame.addEventListener("click", simplifyPuzz);
    
});
