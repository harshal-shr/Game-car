const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

let gameRunning = false;
let score = 0;
let roadOffset = 0;

const player = {
    x: 170,
    y: 560,
    width: 60,
    height: 100,
    speed: 8
};

const keys = {};

document.addEventListener("keydown", (e)=>{
    keys[e.key]=true;
});

document.addEventListener("keyup", (e)=>{
    keys[e.key]=false;
});

function drawRoad(){

    ctx.fillStyle="#444";
    ctx.fillRect(0,0,400,700);

    ctx.strokeStyle="white";
    ctx.lineWidth=6;

    for(let i=-40;i<700;i+=60){
        ctx.beginPath();
        ctx.moveTo(200,i+roadOffset);
        ctx.lineTo(200,i+30+roadOffset);
        ctx.stroke();
    }

    roadOffset+=8;

    if(roadOffset>=60)
        roadOffset=0;
}

function drawPlayer(){

    ctx.fillStyle="red";
    ctx.fillRect(player.x,player.y,player.width,player.height);

    ctx.fillStyle="black";
    ctx.fillRect(player.x+10,player.y+10,40,25);

}

function update(){

    if(keys["ArrowLeft"] && player.x>20)
        player.x-=player.speed;

    if(keys["ArrowRight"] && player.x<320)
        player.x+=player.speed;

    score++;

    scoreText.innerText=score;
}

function gameLoop(){

    if(!gameRunning) return;

    ctx.clearRect(0,0,400,700);

    drawRoad();

    update();

    drawPlayer();

    requestAnimationFrame(gameLoop);

}

startBtn.onclick=()=>{

    if(gameRunning) return;

    gameRunning=true;

    score=0;

    gameLoop();

};

restartBtn.onclick=()=>{

    player.x=170;

    score=0;

};
