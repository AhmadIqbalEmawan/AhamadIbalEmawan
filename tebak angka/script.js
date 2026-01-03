// buat angka random 1 - 10
let angkaRahasia = Math.floor(Math.random() * 10) + 1;
let percobaan = 0;

const inputAngka = document.getElementById("inputAngka");
const hasil = document.getElementById("hasil");
const btnTebak = document.getElementById("btnTebak");
const btnUlang = document.getElementById("btnUlang");

btnTebak.addEventListener("click", function () {
  let tebakan = inputAngka.value;
  percobaan++;

  if (tebakan == angkaRahasia) {
    hasil.innerText = "Benar! Kamu menebak " + percobaan + " kali.";
  } else if (tebakan > angkaRahasia) {
    hasil.innerText = "Terlalu besar!";
  } else {
    hasil.innerText = "Terlalu kecil!";
  }
});

btnUlang.addEventListener("click", function () {
  angkaRahasia = Math.floor(Math.random() * 10) + 1;
  percobaan = 0;
  hasil.innerText = "";
  inputAngka.value = "";
});
