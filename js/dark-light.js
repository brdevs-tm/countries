const lightMode = document.querySelector(".light-mode");
const darkMode = document.querySelector(".dark-mode");

const returnPageBtn = document.querySelector(".return-link img");

lightMode.addEventListener("click", () => {
  lightMode.classList.add("mode-hide");
  darkMode.classList.remove("mode-hide");
  document.body.classList.add("white");
  returnPageBtn.src = "../assets/dark-back.svg";
});
darkMode.addEventListener("click", () => {
  darkMode.classList.add("mode-hide");
  lightMode.classList.remove("mode-hide");
  document.body.classList.remove("white");
  returnPageBtn.src = "../assets/back.svg";
});
