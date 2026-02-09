const area = document.getElementById("game-area");
const info = document.getElementById("info");
const restartBtn = document.getElementById("restart-btn");

let numCats = 6;
let score, time, highScore, cats, moveInterval, timer;

function initGame(){
  area.innerHTML = ""; // clear area
  score = 0;
  time = 30;
  highScore = localStorage.getItem("highScore") || 0;
  updateInfo();

  // create cats
  const catEmojis = ["😹","😻","😸","😺","😼","😽"];
  cats = [];
  for(let i=0;i<numCats;i++){
    const cat = document.createElement("div");
    cat.className = "cat";
    cat.innerText = catEmojis[i % catEmojis.length];
    area.appendChild(cat);
    cats.push(cat);

    cat.addEventListener("click", ()=>{
      if(time <= 0) return;
      score++;
      animateCat(cat);
      updateInfo();
      flashBackground();
    });
  }

  moveCatsRandomly();
  moveInterval = setInterval(()=>{ if(time > 0) moveCatsRandomly(); },1200);

  // timer
  timer = setInterval(()=>{
    time--;
    updateInfo();
    if(time <= 0){
      clearInterval(timer);
      clearInterval(moveInterval);
      endGame();
    }
  },1000);
}

function updateInfo(){
  info.innerText = `Score: ${score} | ⏰ ${time}s | 🏆 High: ${highScore}`;
}

// cat animation
function animateCat(cat){
  cat.classList.add("jump");
  setTimeout(()=>cat.classList.remove("jump"),200);
}

// flash background
function flashBackground(){
  document.body.style.background = "linear-gradient(135deg, #f6ff9e, #c1fff4, #ffb3c6)";
  setTimeout(()=>document.body.style.background = "linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb)",200);
}

// move cats randomly
function moveCatsRandomly(){
  cats.forEach(cat=>{
    const maxX = area.clientWidth - 50;
    const maxY = area.clientHeight - 50;
    const x = Math.random()*maxX;
    const y = Math.random()*maxY;
    cat.style.left = x+"px";
    cat.style.top = y+"px";
  });
}

// end game
function endGame(){
  if(score > highScore){
    highScore = score;
    localStorage.setItem("highScore", highScore);
    info.innerText = `🎉 NEW HIGH SCORE: ${highScore}!`;
  } else {
    info.innerText = `⏰ Time's up! Score: ${score} | 🏆 High: ${highScore}`;
  }
}

// restart button
restartBtn.addEventListener("click", ()=>{
  clearInterval(timer);
  clearInterval(moveInterval);
  initGame();
});

// start game
initGame();