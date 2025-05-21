let inputdir = { x: 0, y: 0 };

const foodsound = new Audio('/music/food.mp3');
const gameoversound = new Audio('/music/gameover.mp3');
const movesound = new Audio('/music/move.mp3');
const musicsound = new Audio('/music/music.mp3');

let speed = 5;
let lastpaintime = 0;
let score = 0;

let snakearr = [
    { x: 13, y: 15 }
]
let food = { x: 5, y: 9 }


//Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastpaintime) / 1000 < 1 / speed) {
        return;
    }
    lastpaintime = ctime;
    musicsound.play();

    GameEngine();
}

function iscolide(sarr) {

    // if you bump into yourdelf 
    for (let i = 1; i < snakearr.length; i++) {
        if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
            return true;
        }
    }
    // if you bump into wall 
    if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) {
        return true;
    }
    return false;
}

function GameEngine() {
    //Updating Snake Array and Food
    if (iscolide(snakearr)) {
        gameoversound.play();
        musicsound.pause();
        inputdir = { x: 0, y: 0 }
        alert("GameOver! Press any key to play Again");
        snakearr = [
            { x: 13, y: 15 }
        ]
        musicsound.play();
        score = 0;
        scr.innerHTML="Score: "+score;

    }

    //If snake have eaten the food we update the snake and food
    if (snakearr[0].y === food.y && snakearr[0].x == food.x) {
        score++;
        scr.innerHTML="Score: "+score;
        foodsound.play();
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //Moving Snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;




    //Display Snake Array and Food

    //Dispaly Snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snkEl = document.createElement("div");
        snkEl.style.gridRowStart = e.y;
        snkEl.style.gridColumnStart = e.x;
        if (index === 0) {
            snkEl.classList.add("head");
        } else {
            snkEl.classList.add("snk");
        }
        board.appendChild(snkEl);
    })

    // Display Food 
    foodEl = document.createElement("div");
    foodEl.style.gridRowStart = food.y;
    foodEl.style.gridColumnStart = food.x;
    foodEl.classList.add("food");
    board.appendChild(foodEl);

}



//Main Logic Of Game
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 }  //Start Game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case "ArrowLeft":
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        case "ArrowRight":
            inputdir.x = 1;
            inputdir.y = 0;
            break;

        default:
            break;
    }

})

// Mobile button controls
document.getElementById('up').addEventListener('click', () => {
    if (inputdir.y !== 1) {
        inputdir.x = 0;
        inputdir.y = -1;
        movesound.play();
    }
});
document.getElementById('down').addEventListener('click', () => {
    if (inputdir.y !== -1) {
        inputdir.x = 0;
        inputdir.y = 1;
        movesound.play();
    }
});
document.getElementById('left').addEventListener('click', () => {
    if (inputdir.x !== 1) {
        inputdir.x = -1;
        inputdir.y = 0;
        movesound.play();
    }
});
document.getElementById('right').addEventListener('click', () => {
    if (inputdir.x !== -1) {
        inputdir.x = 1;
        inputdir.y = 0;
        movesound.play();
    }
});