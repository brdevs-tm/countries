const lightMode = document.querySelector(".light-mode");
const darkMode = document.querySelector(".dark-mode");

lightMode.addEventListener("click", () => {
  lightMode.classList.add("mode-hide");
  darkMode.classList.remove("mode-hide");
  document.body.classList.add("white");
});
darkMode.addEventListener("click", () => {
  darkMode.classList.add("mode-hide");
  lightMode.classList.remove("mode-hide");
  document.body.classList.remove("white");
});
