let gameseq = [];
let userseq = [];
let btns = ["yellow", "blue", "green", "red"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game has started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("gameflash");
    setTimeout(function () {
        btn.classList.remove("gameflash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    level++;
    userseq = []; 
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randcolor = btns[randIdx];
    gameseq.push(randcolor);

    console.log("Game sequence: ", gameseq);
    playSequence();
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        if (i >= gameseq.length) {
            clearInterval(interval);
            return;
        }
        let color = gameseq[i];
        let btn = document.querySelector(`.${color}`);
        gameFlash(btn);
        i++;
    }, 250);
}

function btnPress() {
    let color = this.classList[1];
    userFlash(this);
    userseq.push(color);

    if (userseq.length === gameseq.length) {
        if (userseq.join() === gameseq.join()) {
            setTimeout(levelUp, 250);
        } else {
            alert("Game Over! Press any key to restart.");
            resetGame();
        }
    }
}

function resetGame() {
    started = false;
    level = 0;
    gameseq = [];
    h2.innerText = `Press any key to start`;
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
