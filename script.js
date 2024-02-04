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
  header: "Welcome",
  "section-cover": "Cover",
  "section-about": "About",
  "section-work": "Experience",
  "section-skills": "Skills",
  "section-projects": "Projects",
  "section-contact": "Contact",
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



function getVisibleSection() {
  const visibilityThreshold = 0.35; // Adjust this value as needed

  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    const visiblePercentage = visibleHeight / rect.height;

    if (visiblePercentage >= visibilityThreshold) {
      return section;
    }
  }

  return null;
}

window.addEventListener("scroll", () => {

  if (window.scrollY === 0) {
    logo.textContent = sectionText["header"];
  } else {

    const visibleSection = getVisibleSection();

    if (visibleSection) {
      const link = document.querySelector(`#menu a[href="#${visibleSection.id}"]`);
      const underlineColor = "#FF5A5A"; // Set the desired underline color

      logo.textContent = sectionText[visibleSection.id];
      link.style.borderBottom = `3px solid ${underlineColor}`;

      // Remove underline from other links
      document.querySelectorAll("#menu a").forEach((otherLink) => {
        if (otherLink !== link) {
          otherLink.style.borderBottom = "none";
        }
      });
    }
 
  }
});






