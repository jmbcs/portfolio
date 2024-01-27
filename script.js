// script.js

// Navigation bar scroll animation
let lastScrollPosition = 0;
let scrollingTimer;

const topNav = document.getElementById("menu-icon");

window.addEventListener("scroll", () => {
  clearTimeout(scrollingTimer);

  scrollingTimer = setTimeout(() => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > lastScrollPosition) {
      // Scrolling down
      topNav.classList.remove("show");
      topNav.classList.add("hide");
    } else {
      // Scrolling up
      topNav.classList.remove("hide");
      topNav.classList.add("show");
    }

    lastScrollPosition = currentScrollPosition;
  });
});

// function toggleMenu() {
//   const menu = document.querySelector(".menu-links");
//   const icon = document.querySelector(".hamburger-icon");
//   menu.classList.toggle("open");
//   icon.classList.toggle("open");
// }
function toggleHamburgerMenu() {
  var menuHamburger = document.getElementById("hamburger-menu");
  var mainContent = document.getElementById("main-content");
  var menuBar = document.getElementById("menu-icon");

  if (menuHamburger.style.left === "-100%") {
    menuHamburger.style.left = "0";
    mainContent.classList.add("pushed");
    menuBar.innerHTML = "&#10006; Close";

    // Add event listener to close menu when clicking outside
    document.addEventListener("click", closeMenuOutside);
  } else {
    menuHamburger.style.left = "-100%";
    mainContent.classList.remove("pushed");
    // Remove event listener when menu is closed
    document.removeEventListener("click", closeMenuOutside);
    menuBar.innerHTML = "&#9776; Menu";
  }
}

function closeHamburgerMenu() {
  var menuHamburger = document.getElementById("hamburger-menu");
  var mainContent = document.getElementById("main-content");
  menuHamburger.style.left = "-100%";
  mainContent.classList.remove("pushed");
  // Remove event listener when menu is closed
  document.removeEventListener("click", closeMenuOutside);
}

function closeMenuOutside(event) {
  var menuHamburger = document.getElementById("hamburger-menu");
  var menuIcon = document.getElementById("menu-bar");
  if (!menuHamburger.contains(event.target) && event.target !== menuIcon) {
    closeMenu();
  }
}
