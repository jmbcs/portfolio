// script.js

// Variables to store scroll position, scrolling timer, and DOM elements
let lastScrollPosition = 0;
let scrollingTimer;

const menuBar = document.getElementById("menu-bar");
const menuHamburger = document.getElementById("menu-hamburger");
const mainContent = document.getElementById("main-content");

// Event listeners for scroll and click events
window.addEventListener("scroll", handleScroll);
window.addEventListener("click", handleMenuClick);

// window.addEventListener("pushed", closeMenuOutside);
// Function to handle scroll events with a debounce effect
function handleScroll() {
  // Clear any previous scrolling timer
  clearTimeout(scrollingTimer);

  // Set a new scrolling timer to debounce the scroll event
  scrollingTimer = setTimeout(() => {
    // Get the current scroll position
    const currentScrollPosition = window.scrollY;

    // Determine the scroll direction
    const scrollingDown = currentScrollPosition > lastScrollPosition;

    // Toggle classes based on scroll direction for menu bar animation
    menuBar.classList.toggle("show", !scrollingDown);
    menuBar.classList.toggle("hide", scrollingDown);

    // Update the last scroll position
    lastScrollPosition = currentScrollPosition;
  });
}

// Function to handle click events on the document
function handleMenuClick() {
  // Set the inner HTML of the menu bar based on whether the main content is pushed
  menuBar.innerHTML = mainContent.classList.contains("pushed")
    ? "&#10006; Close"
    : "&#9776; Menu";
}

// Function to toggle the visibility of the hamburger menu
function toggleHamburgerMenu() {
  // Check if the menu is currently hidden
  const menuHidden = menuHamburger.style.left === "-100%";

  // Toggle the menu visibility and update the main content class
  menuHamburger.style.left = menuHidden ? "0" : "-100%";
  mainContent.classList.toggle("pushed", menuHidden);
  if (menuHidden) {
    document.addEventListener("click", closeMenuOutside);
  } else {
    document.removeEventListener("click", closeMenuOutside);
  }
}

// Function to close the hamburger menu
function closeHamburgerMenu() {
  // Hide the menu and remove the pushed class from the main content
  menuHamburger.style.left = "-100%";
  mainContent.classList.remove("pushed");
}

// Function to close the hamburger menu when clicking outside
function closeMenuOutside(event) {
  // Check if the click is outside the menu and not on the menu bar
  if (!menuHamburger.contains(event.target) && event.target !== menuBar) {
    // Close the hamburger menu
    closeHamburgerMenu();
  }
}
