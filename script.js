const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

let gameRunning = false;
let score = 0;
let highScore = 0;
let roadOffset = 0;

const player = {
    x: 170,
    y: 560,
    width: 60,
    height: 100,
    speed: 7
};

const keys = {};

const enemies = [];

function createEnemy() {
    const lanes = [35, 135, 235, 335];
    enemies.push({
        x: lanes[Math.floor(Math.random() * lanes.length)],
        y: -120,
        width: 60,
        height: 100,
        speed: 5
    });
}

document.addEventListener("keydown", e => {
    keys[e.key] = true;
});

document.addEventListener("keyup", e => {
    keys[e.key] = false;
});

leftBtn.addEventListener("touchstart", () => {
    keys["ArrowLeft"] = true;
});

leftBtn.addEventListener("touchend", () => {
    keys["ArrowLeft"] = false;
});

rightBtn.addEventListener("touchstart", () => {
    keys["ArrowRight"] = true;
});

rightBtn.addEventListener("touchend", () => {
    keys["ArrowRight"] = false;
});

leftBtn.addEventListener("mousedown", () => {
    keys["ArrowLeft"] = true;
});

leftBtn.addEventListener("mouseup", () => {
    keys["ArrowLeft"] = false;
});

rightBtn.addEventListener("mousedown", () => {
    keys["ArrowRight"] = true;
});

rightBtn.addEventListener("mouseup", () => {
    keys["ArrowRight"] = false;
});

function drawRoad() {

    ctx.fillStyle = "#444";
    ctx.fillRect(0, 0, 400, 700);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 6;

    for (let i = -60; i < 700; i += 70) {
        ctx.beginPath();
        ctx.moveTo(200, i + roadOffset);
        ctx.lineTo(200, i + 40 + roadOffset);
        ctx.stroke();
    }

    roadOffset += 8;

    if (roadOffset >= 70)
        roadOffset = 0;
}

function drawPlayer() {

    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);

}

function drawEnemies() {

    ctx.fillStyle = "yellow";

    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        enemy.y += enemy.speed;
    });

}

function update() {

    if (keys["ArrowLeft"] && player.x > 10)
        player.x -= player.speed;

    if (keys["ArrowRight"] && player.x < 330)
        player.x += player.speed;

    if (Math.random() < 0.02)
        createEnemy();

    score++;
    scoreText.innerText = score;

    if (score > highScore) {
        highScore = score;
        highScoreText.innerText = highScore;
    }
}

function checkCollision() {
    for (let enemy of enemies) {
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            gameRunning = false;
            alert("💥 Game Over!\nScore: " + score);
        }
    }
}

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRoad();
    update();
    drawEnemies();
    drawPlayer();
    checkCollision();

    requestAnimationFrame(gameLoop);
}

startBtn.onclick = () => {
    if (gameRunning) return;

    gameRunning = true;
    score = 0;
    enemies.length = 0;

    gameLoop();
};

restartBtn.onclick = () => {
    gameRunning = false;

    player.x = 170;
    player.y = 560;

    score = 0;
    enemies.length = 0;

    scoreText.innerText = "0";
};
