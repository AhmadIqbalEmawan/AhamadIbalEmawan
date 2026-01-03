const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ukuran = 20;
let ular;
let arahX;
let arahY;
let makanan;
let skor;
let game;
let jalan = false;

// buat makanan aman (tidak di badan ular)
function buatMakanan() {
  let aman = false;
  let x, y;

  while (!aman) {
    x = Math.floor(Math.random() * 20) * ukuran;
    y = Math.floor(Math.random() * 20) * ukuran;
    aman = true;

    for (let i = 0; i < ular.length; i++) {
      if (ular[i].x === x && ular[i].y === y) {
        aman = false;
        break;
      }
    }
  }

  makanan = { x, y };
}

// gambar semua
function gambar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ular
  ctx.fillStyle = "lime";
  for (let i = 0; i < ular.length; i++) {
    ctx.fillRect(ular[i].x, ular[i].y, ukuran, ukuran);
  }

  // makanan
  ctx.fillStyle = "red";
  ctx.fillRect(makanan.x, makanan.y, ukuran, ukuran);

  document.getElementById("score").innerText = "Skor: " + skor;
}

// update game
function update() {
  if (!jalan) return;

  let kepalaBaru = {
    x: ular[0].x + arahX,
    y: ular[0].y + arahY
  };

  // nabrak tembok
  if (
    kepalaBaru.x < 0 ||
    kepalaBaru.y < 0 ||
    kepalaBaru.x >= canvas.width ||
    kepalaBaru.y >= canvas.height
  ) {
    selesai();
    return;
  }

  // nabrak badan sendiri
  for (let i = 0; i < ular.length; i++) {
    if (ular[i].x === kepalaBaru.x && ular[i].y === kepalaBaru.y) {
      selesai();
      return;
    }
  }

  // makan
  if (kepalaBaru.x === makanan.x && kepalaBaru.y === makanan.y) {
    skor++;
    buatMakanan();
  } else {
    ular.pop();
  }

  ular.unshift(kepalaBaru);
  gambar();
}

// game over
function selesai() {
  clearInterval(game);
  alert("Game Over! Skor: " + skor);
  mulai();
}

// kontrol
document.addEventListener("keydown", function (e) {
  jalan = true;

  if (e.key === "ArrowUp" && arahY === 0) {
    arahX = 0;
    arahY = -ukuran;
  }
  if (e.key === "ArrowDown" && arahY === 0) {
    arahX = 0;
    arahY = ukuran;
  }
  if (e.key === "ArrowLeft" && arahX === 0) {
    arahX = -ukuran;
    arahY = 0;
  }
  if (e.key === "ArrowRight" && arahX === 0) {
    arahX = ukuran;
    arahY = 0;
  }
});

// mulai / reset
function mulai() {
  clearInterval(game);

  ular = [{ x: 200, y: 200 }];
  arahX = ukuran;
  arahY = 0;
  skor = 0;
  jalan = false;

  buatMakanan();
  gambar();

  game = setInterval(update, 150);
}

mulai();
