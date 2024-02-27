// Execute when DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const mobileButton = document.getElementById("btn-mobile");
  const header = document.getElementById("header");
  const logo = document.getElementById("logo");
  const menu = document.getElementById("menu");
  const sections = document.querySelectorAll("section");
  const hiddenElements = document.querySelectorAll('.hidden');
  // Intersection observer to show/hide elements
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('show', entry.isIntersecting));
  });

  // Function to update logo text based on current section or menu state
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


  function toggleMenu(event) {
    if (event.type === 'touchstart') {
      event.preventDefault(); // Prevent default touchstart event
    }

    const isMenuActive = nav.classList.contains('active');
    const isHeaderActive = header.classList.contains('active');

    const shouldActivate = !(isMenuActive || isHeaderActive);

    nav.classList.toggle('active', shouldActivate);
    header.classList.toggle('active', shouldActivate);

    updateLogoText();
  }


  // Event listeners
  mobileButton.addEventListener('click', toggleMenu);
  menu.addEventListener('click', toggleMenu);
  window.addEventListener("scroll", updateLogoText);
  hiddenElements.forEach(el => observer.observe(el)); // Observe hidden elements
});

// Function to flip card on button click
function flipCard(button) {
  button.closest('.project__card').classList.toggle('flipped');
}

// Animation letters
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const intervals = [];

// Function to start text animation for element
function startAnimationForElement(element, index) {
  let iteration = 0;
  clearInterval(intervals[index]);
  intervals[index] = setInterval(() => {
    element.innerText = element.innerText.split("").map((letter, idx) => {
      return (idx < iteration) ? element.dataset.value[idx] : letters[Math.floor(Math.random() * 26)];
    }).join("");
    if (iteration >= element.dataset.value.length) clearInterval(intervals[index]);
    iteration += 1 / 3;
  }, 30);
}

// Function to handle intersection changes
function handleIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = Array.from(document.querySelectorAll('.animated-text')).indexOf(entry.target);
      startAnimationForElement(entry.target, index);
    }
  });
}

// Intersection observer for text animation
const animationObserver = new IntersectionObserver(handleIntersection, { threshold: 0.10 });
document.querySelectorAll('.animated-text').forEach(animatedText => animationObserver.observe(animatedText));

// Function to handle hover effect
function handleHover(element) {
  const index = Array.from(document.querySelectorAll('.animated-text__hover')).indexOf(element);
  startAnimationForElement(element, index);
}

// Add hover effect to animated text
document.querySelectorAll('.animated-text__hover').forEach(animatedText => {
  animatedText.addEventListener('mouseenter', () => handleHover(animatedText));
});




