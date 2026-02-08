const area = document.getElementById("game-area");
const numCats = 5; // jumlah kucing
let score = 0;
let time = 30;

let highScore = 0;
localStorage.setItem("highScore", highScore);

// info skor
const info = document.createElement("div");
info.className = "info";
document.body.insertBefore(info, area);

function updateInfo() {
  info.innerText = `Skor: ${score} | ⏰ ${time}s | 🏆 High: ${highScore}`;
}

updateInfo();

// buat kucing
const cats = [];
for (let i = 0; i < numCats; i++) {
  const cat = document.createElement("div");
  cat.className = "cat";
  cat.innerText = "😺";
  area.appendChild(cat);
  cats.push(cat);

  cat.addEventListener("click", () => {
    if (time <= 0) return;
    score++;
    updateInfo();
    moveCat(cat);
  });
}

// gerakin satu kucing
function moveCat(cat) {
  const maxX = area.clientWidth - 40;
  const maxY = area.clientHeight - 40;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  cat.style.left = x + "px";
  cat.style.top = y + "px";

  cat.classList.add("jump");
  setTimeout(() => cat.classList.remove("jump"), 150);
}

// gerakin semua kucing
function randomPositions() {
  cats.forEach(cat => moveCat(cat));
}

// timer
const timer = setInterval(() => {
  time--;
  updateInfo();
  if (time <= 0) {
    clearInterval(timer);
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      info.innerText = `🎉 NEW HIGH SCORE: ${highScore}!`;
    } else {
      info.innerText = `⏰ Habis! Skor: ${score} | 🏆 ${highScore}`;
    }
  }
}, 1000);

// posisi awal
randomPositions();