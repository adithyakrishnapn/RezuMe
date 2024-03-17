var loader = document.getElementById("preloader");
var header = document.getElementById("header");

window.addEventListener("load", function () {
  setTimeout(function () {
    loader.style.display = "none";
    header.style.display = "block";
  }, 3000)
})