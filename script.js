document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const btnMobile = document.getElementById("btn-mobile");
  const header = document.getElementById("header");
  const logo = document.getElementById("logo");
  const menu = document.getElementById("menu");
  const sections = document.querySelectorAll("section");
  const hiddenElements = document.querySelectorAll('.hidden');

  // Intersection Observer to show/hide content
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  });

  // Update logo text based on the current section or menu state
  function updateLogoText() {
    var isActive = nav.classList.contains('active') || header.classList.contains('active');
    // Check if the screen width is less than or equal to 800px
    if (isActive && window.innerWidth < 1000) {
      logo.textContent = "Menu";
    } else {
      if (window.scrollY === 0) {
        logo.textContent = "Welcome";
      } else {
        sections.forEach(section => {
          const bounding = section.getBoundingClientRect();
          if (bounding.top <= 30 && bounding.bottom >= 0) {
            const sectionTitle = section.querySelector(".header-up");
            const sectionTitleValue = sectionTitle.dataset.value; // Accessing data-value attribute
            logo.textContent = sectionTitleValue;
          }
        });
      }
    }

  }


  // Handle menu interaction
  function menuInteraction(event) {

    if (event.type === 'touchstart') {
      event.preventDefault();
    }

    var isActive = nav.classList.contains('active') || header.classList.contains('active');

    nav.classList.toggle('active', !isActive);
    header.classList.toggle('active', !isActive);


    updateLogoText();
  }

  // Event listeners
  btnMobile.addEventListener('click', menuInteraction);
  menu.addEventListener('click', menuInteraction);
  window.addEventListener("scroll", updateLogoText);

  // Observe hidden elements
  hiddenElements.forEach((el) => observer.observe(el));


});




const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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

// Function to handle intersection changes
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const animatedText = entry.target;
      const index = Array.from(document.querySelectorAll('.animated-text')).indexOf(animatedText); // Find the index of animated text among all .animated-text elements
      startAnimationForElement(animatedText, index);
    }
  });
}



// Create Intersection Observer instance
const observer = new IntersectionObserver(handleIntersection, { threshold: 0.10 });

// Observe each ".animated-text" element
document.querySelectorAll('.animated-text').forEach(animatedText => {
  observer.observe(animatedText);
});
