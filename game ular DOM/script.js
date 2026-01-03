// ambil elemen dari HTML
const papan = document.getElementById("board");
const skorText = document.getElementById("score");

// ukuran papan
const baris = 20;
const kolom = 20;

// variabel game
let kotak = [];
let ular = [];
let arahX = 1;
let arahY = 0;
let makananX = 0;
let makananY = 0;
let skor = 0;
let gameLoop;
let modeGame = "hard";

// buat papan
function buatPapan() {
  papan.innerHTML = "";
  kotak = [];

  for (let i = 0; i < baris; i++) {
    let barisKotak = [];
    for (let j = 0; j < kolom; j++) {
      let div = document.createElement("div");
      div.className = "cell";
      papan.appendChild(div);
      barisKotak.push(div);
    }
    kotak.push(barisKotak);
  }
}

// buat makanan random
function buatMakanan() {
  let aman = false;

  while (!aman) {
    makananX = Math.floor(Math.random() * baris);
    makananY = Math.floor(Math.random() * kolom);

    aman = true;

    // cek apakah kena badan ular
    for (let i = 0; i < ular.length; i++) {
      if (ular[i].x === makananX && ular[i].y === makananY) {
        aman = false;
        break;
      }
    }
  }
}

// gambar ular dan makanan
function gambar() {
  // reset papan
  for (let i = 0; i < baris; i++) {
    for (let j = 0; j < kolom; j++) {
      kotak[i][j].className = "cell";
    }
  }

  // gambar ular
  for (let i = 0; i < ular.length; i++) {
    let bagian = ular[i];
    kotak[bagian.x][bagian.y].classList.add("snake");
  }

  // gambar makanan
  kotak[makananX][makananY].classList.add("food");

  skorText.innerText = "Skor: " + skor;
}

// logika game
function jalanGame() {
  let kepala = ular[0];
  let kepalaBaru = {
    x: kepala.x + arahX,
    y: kepala.y + arahY
  };

  // mode mudah (tembus tembok)
  if (modeGame === "easy") {
    if (kepalaBaru.x < 0) kepalaBaru.x = baris - 1;
    if (kepalaBaru.y < 0) kepalaBaru.y = kolom - 1;
    if (kepalaBaru.x >= baris) kepalaBaru.x = 0;
    if (kepalaBaru.y >= kolom) kepalaBaru.y = 0;
  }

  // mode sulit (nabrak mati)
  if (modeGame === "hard") {
    if (
      kepalaBaru.x < 0 ||
      kepalaBaru.y < 0 ||
      kepalaBaru.x >= baris ||
      kepalaBaru.y >= kolom
    ) {
      selesai();
      return;
    }
  }

  // nabrak badan sendiri
  for (let i = 0; i < ular.length; i++) {
    if (ular[i].x === kepalaBaru.x && ular[i].y === kepalaBaru.y) {
      selesai();
      return;
    }
  }

  // tambah kepala
  ular.unshift(kepalaBaru);

  // cek makan
  if (kepalaBaru.x === makananX && kepalaBaru.y === makananY) {
    skor += 10;
    buatMakanan();
  } else {
    ular.pop();
  }

  gambar();
}

// game over
function selesai() {
  clearInterval(gameLoop);
  alert("Game Over! Skor kamu: " + skor);
}

// kontrol keyboard
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp" && arahTerakhir !== "down") {
    arahX = -1;
    arahY = 0;
    arahTerakhir = "up";
  }

  if (event.key === "ArrowDown" && arahTerakhir !== "up") {
    arahX = 1;
    arahY = 0;
    arahTerakhir = "down";
  }

  if (event.key === "ArrowLeft" && arahTerakhir !== "right") {
    arahX = 0;
    arahY = -1;
    arahTerakhir = "left";
  }

  if (event.key === "ArrowRight" && arahTerakhir !== "left") {
    arahX = 0;
    arahY = 1;
    arahTerakhir = "right";
  }
});


// mulai game
function start(mode) {
  arahTerakhir = "right";

  clearInterval(gameLoop);
  modeGame = mode;
  skor = 0;

  buatPapan();

  ular = [{ x: 10, y: 10 }];
  arahX = 0;
  arahY = 1;

  buatMakanan();
  gambar();

  gameLoop = setInterval(jalanGame, 200);
}
