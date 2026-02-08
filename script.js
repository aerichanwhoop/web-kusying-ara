const area = document.getElementById("game-area");
const info = document.getElementById("info");
const numCats = 6; // lebih banyak cats untuk lucu
let score = 0;
let time = 30;

let highScore = localStorage.getItem("highScore") || 0;

function updateInfo() {
  info.innerText = `Score: ${score} | ⏰ ${time}s | 🏆 High: ${highScore}`;
}

updateInfo();

// create cats
const catEmojis = ["😹","😻","😸","😺","😼","😽"];
const cats = [];

for(let i=0;i<numCats;i++){
  const cat = document.createElement("div");
  cat.className = "cat";
  cat.innerText = catEmojis[i % catEmojis.length];
  area.appendChild(cat);
  cats.push(cat);

  cat.addEventListener("click", ()=>{
    if(time <= 0) return;
    score++;
    moveCat(cat);
    updateInfo();
  });
}

// move cat
function moveCat(cat){
  const maxX = area.clientWidth - 50;
  const maxY = area.clientHeight - 50;
  const x = Math.random()*maxX;
  const y = Math.random()*maxY;
  cat.style.left = x+"px";
  cat.style.top = y+"px";
  cat.classList.add("jump");
  setTimeout(()=>cat.classList.remove("jump"), 150);
}

// initial positions
cats.forEach(cat=>moveCat(cat));

// timer
const timer = setInterval(()=>{
  time--;
  updateInfo();
  if(time <= 0){
    clearInterval(timer);
    if(score > highScore){
      highScore = score;
      localStorage.setItem("highScore", highScore);
      info.innerText = `🎉 NEW HIGH SCORE: ${highScore}!`;
    } else {
      info.innerText = `⏰ Time's up! Score: ${score} | 🏆 High: ${highScore}`;
    }
  }
},1000);