document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const btnMobile = document.getElementById("btn-mobile"); // Button for mobile
  const header = document.getElementById("header"); // Header element
  const logo = document.getElementById("logo"); // Logo element
  const menu = document.getElementById("menu"); // Menu element
  const sections = document.querySelectorAll("section"); // All sections
  const hiddenElements = document.querySelectorAll('.hidden'); // Hidden elements

  //! Animation Hide/Show content
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show'); // Add 'show' class if element is intersecting
      } else {
        entry.target.classList.remove('show'); // Remove 'show' class if not intersecting
      }
    });
  });

  //! Update Header left text based on the current section or menu state
  function updateLogoText() {
    var isActive = nav.classList.contains('active') || header.classList.contains('active'); // Check if menu or header is active
    if (isActive && window.innerWidth < 1000) {
      logo.textContent = "Menu"; // Change logo text to "Menu" if menu or header is active and screen width is less than 1000px
    } else {
      if (window.scrollY === 0) {
        logo.textContent = "Welcome"; // Change logo text to "Welcome" if scrolled to top
      } else {
        sections.forEach(section => {
          const bounding = section.getBoundingClientRect();
          if (bounding.top <= 30 && bounding.bottom >= 0) {
            const sectionTitle = section.querySelector(".header-up");
            const sectionTitleValue = sectionTitle.dataset.value; // Accessing data-value attribute
            logo.textContent = sectionTitleValue; // Set logo text to section title value
          }
        });
      }
    }
  }

  //! Toggle/Untogle Menu & Update header text
  function menuInteraction(event) {
    if (event.type === 'touchstart') {
      event.preventDefault(); // Prevent default touchstart event
    }
    var isActive = nav.classList.contains('active') || header.classList.contains('active'); // Check if menu or header is active
    nav.classList.toggle('active', !isActive); // Toggle 'active' class for nav
    header.classList.toggle('active', !isActive); // Toggle 'active' class for header
    updateLogoText(); // Update logo text after interaction
  }

  // Event listeners
  btnMobile.addEventListener('click', menuInteraction); // Event listener for mobile button click
  menu.addEventListener('click', menuInteraction); // Event listener for menu click
  window.addEventListener("scroll", updateLogoText); // Event listener for window scroll

  // Observe hidden elements
  hiddenElements.forEach((el) => observer.observe(el)); // Observe hidden elements with Intersection Observer
});

//! TEXT GLITCH ANIMATION
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Letters for animation
let intervals = []; // Store intervals for each element

// Function to start the animation for a specific element
function startAnimationForElement(element, index) {
  let iteration = 0;
  clearInterval(intervals[index]);

  intervals[index] = setInterval(() => {
    element.innerText = element.innerText
      .split("")
      .map((letter, idx) => {
        if (idx < iteration) {
          return element.dataset.value[idx];
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= element.dataset.value.length) {
      clearInterval(intervals[index]);
    }
    iteration += 1 / 3;
  }, 40);
}

//! Function to handle intersection changes
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const animatedText = entry.target;
      const index = Array.from(document.querySelectorAll('.animated-text')).indexOf(animatedText); // Find the index of animated text among all .animated-text elements
      startAnimationForElement(animatedText, index); // Start animation for animated text
    }
  });
}

// Create Intersection Observer instance for text animation
const animationObserver = new IntersectionObserver(handleIntersection, { threshold: 0.10 });

// Observe each ".animated-text" element
document.querySelectorAll('.animated-text').forEach(animatedText => {
  animationObserver.observe(animatedText); // Observe each animated text element
});
