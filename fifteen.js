var puzzle = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
];

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
document.getElementById("puzzle").innerHTML += t;

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
}

function randomizePuzz (){
    let puzzle1d = puzzle.reduce((a, b) => [...a, ...b], []);
    let currentIndex = puzzle1d.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [puzzle1d[currentIndex], puzzle1d[randomIndex]] = [puzzle1d[randomIndex], puzzle1d[currentIndex]];
    }

    puzzle = puzzle1d.reduce((acc, i) => {
        if(acc[acc.length-1].length >= 4) {
          acc.push([]);
        }
        acc[acc.length-1].push(i);
        return acc;
      }, [[]]);

      console.log(puzzle);
      updateCells();
}

document.addEventListener("DOMContentLoaded", () => {
    const bclicks = document.querySelectorAll("#puzzle button");
    const newGame = document.querySelector(".new-game");
    const simpGame = document.querySelector(".simp-game");
    console.log(bclicks);

    for (let bclick of bclicks) {
        bclick.addEventListener("click", log200);
    }

    newGame.addEventListener("click", randomizePuzz);
    
});

function log200 (){         //Test Function
    console.log(200);
}