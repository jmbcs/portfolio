// script.js

// Navigation bar scroll animation
let lastScrollPosition = 0;
let scrollingTimer;

const topNav = document.getElementById("desktop-nav");

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

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
