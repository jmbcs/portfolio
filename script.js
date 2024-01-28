// Get DOM elements
const btnMobile = document.getElementById("btn-mobile");
const nav = document.getElementById("nav");
const header = document.getElementById("header");
const logo = document.getElementById("logo");
const menu = document.getElementById("menu");
const body = document.body;
const sections = document.querySelectorAll("section");

// Define text for each section
const sectionText = {
  header: "Júlio Silva",
  "section-cover": "Cover",
  "section-about": "About Me",
  "section-work": "Work Experience",
  "section-skills": "Skills",
  "section-projects": "Projects",
  "section-contact": "Contact Me",
};

// Toggle menu function
function toggleMenu(event) {
  if (event.type === "touchstart") event.preventDefault();

  nav.classList.toggle("active");
  header.classList.toggle("active");
}

// Event listeners for mobile button

btnMobile.addEventListener("click", toggleMenu);

// Event listener for menu item click and touchstart
menu.addEventListener("click", handleMenuInteraction);

// Event listener for nav click and touchstart
nav.addEventListener("click", handleNavInteraction);

function handleMenuInteraction() {
  nav.classList.remove("active");
  header.classList.remove("active");
}

function handleNavInteraction() {
  console.log(nav.classList.contains("active"));
  if (nav.classList.contains("active")) {
    body.classList.toggle("menu-open");
    logo.textContent = "Menu";
  } else {
    body.classList.remove("menu-open");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - header.offsetHeight;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (window.scrollY === 0) {
        logo.textContent = sectionText["header"];
      } else {
        const isInSection =
          window.scrollY >= sectionTop && window.scrollY < sectionBottom;

        if (isInSection) {
          logo.textContent = sectionText[section.id];
        }
      }
    });
  }
}

// Scroll event to dynamically change the name in the nav bar
window.addEventListener("scroll", () => {
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - header.offsetHeight;
    const sectionBottom = sectionTop + section.offsetHeight;
    const link = document.querySelector(`#menu a[href="#${section.id}"]`);
    const isAtTop = window.scrollY === 0;
    const isInSection =
      window.scrollY >= sectionTop && window.scrollY < sectionBottom;

    const underlineColor = "#FF5A5A"; // Set the desired underline color

    // Inside the scroll event listener
    if (isAtTop) {
      logo.textContent = sectionText["header"];
      link.style.borderBottom = "none"; // Remove underline
    } else if (isInSection) {
      link.style.borderBottom = `2px solid ${underlineColor}`; // Add colored underline
    } else {
      link.style.borderBottom = "none"; // Remove underline
    }

    if (window.scrollY === 0) {
      logo.textContent = sectionText["header"];
    } else if (isInSection && !nav.classList.contains("active")) {
      logo.textContent = sectionText[section.id];
    }
  });
});
