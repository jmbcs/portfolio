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

function toggleMenu() {
  var menu = document.getElementById("hamburger-menu");
  var mainContent = document.getElementById("main-content");
  if (menu.style.left === "-100%") {
    menu.style.left = "0";
    mainContent.classList.add("pushed");
    // Add event listener to close menu when clicking outside
    document.addEventListener("click", closeMenuOutside);
  } else {
    menu.style.left = "-100%";
    mainContent.classList.remove("pushed");
    // Remove event listener when menu is closed
    document.removeEventListener("click", closeMenuOutside);
  }
}

function closeMenu() {
  var menu = document.getElementById("hamburger-menu");
  var mainContent = document.getElementById("main-content");
  menu.style.left = "-100%";
  mainContent.classList.remove("pushed");
  // Remove event listener when menu is closed
  document.removeEventListener("click", closeMenuOutside);
}

function closeMenuOutside(event) {
  var menu = document.getElementById("hamburger-menu");
  var menuIcon = document.getElementById("menu-icon");
  if (!menu.contains(event.target) && event.target !== menuIcon) {
    closeMenu();
  }
}
