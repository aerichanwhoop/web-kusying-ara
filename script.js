const cat = document.getElementById("cat");

// bikin elemen skor
const scoreText = document.createElement("div");
scoreText.className = "score";
scoreText.innerText = "Skor: 0";
document.body.insertBefore(scoreText, document.querySelector(".area"));

let score = 0;

const emojis = ["😺", "😹", "😻", "🙀", "😼"];

function randomPos() {
  const area = document.querySelector(".area");
  const maxX = area.clientWidth - 50;
  const maxY = area.clientHeight - 50;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  cat.style.left = x + "px";
  cat.style.top = y + "px";

  // emoji random
  cat.innerText = emojis[Math.floor(Math.random() * emojis.length)];

  // animasi lompat
  cat.classList.add("jump");
  setTimeout(() => cat.classList.remove("jump"), 300);
}

// KHUSUS HP: pake touchstart
cat.addEventListener("touchstart", (e) => {
  e.preventDefault(); // penting
  score++;
  scoreText.innerText = "Skor: " + score;
  randomPos();
});

// BIAR MASIH BISA DI LAPTOP
cat.addEventListener("click", () => {
  score++;
  scoreText.innerText = "Skor: " + score;
  randomPos();
});