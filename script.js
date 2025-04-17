// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Toggle Navigation Menu
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;
  let scrollPosition = 0;

  // First, let's create a reliable function to determine which section is in view
  function getCurrentSection() {
    const sections = document.querySelectorAll("section[id]");
    let currentSectionId = "";
    let minDistance = Number.MAX_VALUE;

    // Get the middle point of the viewport
    const viewportMiddle = window.scrollY + window.innerHeight / 2;

    // Find which section is closest to the middle of the viewport
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionMiddle = sectionTop + section.offsetHeight / 2;
      const distance = Math.abs(viewportMiddle - sectionMiddle);

      if (distance < minDistance) {
        minDistance = distance;
        currentSectionId = section.id;
      }
    });

    console.log("Current section detected:", currentSectionId); // Debug
    return currentSectionId;
  }

  // Function to forcibly update the active nav link
  function forceUpdateActiveNavLink() {
    const currentSection = getCurrentSection();
    const navLinks = document.querySelectorAll(".nav-link");

    // Remove active class from all links
    navLinks.forEach((link) => link.classList.remove("active"));

    // Add active class to current section link
    if (currentSection) {
      const activeLink = document.querySelector(
        `.nav-link[href="#${currentSection}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");
        console.log("Set active link for:", currentSection); // Debug
      }
    }
  }

  // Function to toggle scroll lock
  function toggleScrollLock() {
    if (navLinks.classList.contains("active")) {
      // Save current scroll position before locking
      scrollPosition = window.pageYOffset;
      // Apply fixed position to body at current scroll position
      body.style.top = `-${scrollPosition}px`;
      body.style.position = "fixed";
      body.style.overflow = "hidden";
      body.style.width = "100%";
      body.style.left = "0";
    } else {
      // Reset body styles
      body.style.position = "";
      body.style.top = "";
      body.style.overflow = "";
      body.style.width = "";
      body.style.left = "";
      // Immediately restore scroll position without animation
      window.scrollTo({
        top: scrollPosition,
        behavior: "instant", // Use instant instead of smooth
      });
    }
  }

  // Replace the hamburger click event completely
  document.querySelector(".hamburger").addEventListener("click", function (e) {
    e.preventDefault();

    // Store scroll position
    const scrollPos = window.scrollY;

    // Force update active link BEFORE toggling the menu
    forceUpdateActiveNavLink();

    // Toggle hamburger and nav menu
    this.classList.toggle("active");
    document.querySelector(".nav-links").classList.toggle("active");

    // Apply scroll lock
    document.body.style.overflow = this.classList.contains("active")
      ? "hidden"
      : "";

    // Log debug info
    console.log("Hamburger clicked, scroll position:", scrollPos);
  });

  // Close navbar when clicking outside or on a link
  document.addEventListener("click", function (event) {
    const isClickInsideNavbar =
      navLinks.contains(event.target) || hamburger.contains(event.target);
    if (!isClickInsideNavbar && navLinks.classList.contains("active")) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      toggleScrollLock();
    }
  });

  // Close navbar when clicking on nav links
  const navLink = document.querySelectorAll(".nav-link");
  navLink.forEach((n) =>
    n.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      const isInternalLink = href.startsWith("#");

      // Close menu
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");

      if (!isInternalLink) {
        // For external links, just close the menu
        toggleScrollLock();
      } else {
        // For internal links, handle scrolling separately
        const targetId = href;
        const targetElement = document.querySelector(targetId);

        // First restore body scroll state
        body.style.position = "";
        body.style.top = "";
        body.style.overflow = "";
        body.style.width = "";
        body.style.left = "";

        if (targetElement) {
          // Prevent default to handle our own scrolling
          e.preventDefault();

          // Then scroll to the target with a small delay to ensure styles are applied
          setTimeout(() => {
            const headerHeight = document.querySelector("header").offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }, 5);
        }
      }
    })
  );

  // Theme Toggle
  const themeToggle = document.querySelector(".theme-toggle");

  // Update the initial theme setting logic
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "light") {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
  } else {
    // Ensure dark mode is default
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  }

  themeToggle.addEventListener("click", function () {
    if (body.classList.contains("light-mode")) {
      // Switch to dark mode
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      // Switch to light mode
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    }
  });

  // Typewriter Effect
  class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = "";
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
      this.deletePause = false;
    }

    type() {
      // Current index of word
      const current = this.wordIndex % this.words.length;
      // Get full text of current word
      const fullTxt = this.words[current];

      // Check if deleting
      if (this.isDeleting) {
        if (this.deletePause) {
          // If we're in the delete pause state, don't modify text yet
          this.deletePause = false; // Reset the flag
          // Set timeout for 1.5 seconds before starting to delete
          setTimeout(() => this.type(), 1500);
          return;
        }
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      // Insert txt into element with a space at the end
      this.txtElement.innerHTML = `${this.txt}&nbsp;`;

      // Initial Type Speed
      let typeSpeed = 100;

      if (this.isDeleting) {
        typeSpeed /= 2;
      }

      // If word is complete
      if (!this.isDeleting && this.txt === fullTxt) {
        // Set deletePause to true when word is complete
        this.deletePause = true;
        // Set delete to true, but actual deletion will start after pause
        this.isDeleting = true;
        // Normal typeSpeed here, actual pause happens above
        typeSpeed = 100;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
      }

      setTimeout(() => this.type(), typeSpeed);
    }
  }

  // Initialize Typewriter
  const txtElement = document.querySelector(".typewriter-text");
  if (txtElement) {
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");
    new TypeWriter(txtElement, words, wait);
  }

  // Scroll Animations
  const scrollElements = document.querySelectorAll(
    ".section-title, .about-content, .timeline-item, .skills-category, .project-card, .contact-content"
  );

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add("active");
  };

  const hideScrollElement = (element) => {
    element.classList.remove("active");
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      } else if (elementOutofView(el)) {
        hideScrollElement(el);
      }
    });
  };

  // Add reveal class to all animation elements
  scrollElements.forEach((el) => {
    el.classList.add("reveal");
  });

  // Initialize
  window.addEventListener("scroll", () => {
    handleScrollAnimation();
  });

  // Trigger once on load
  handleScrollAnimation();

  // Show/hide scroll indicator based on scroll position
  const scrollDownIndicator = document.querySelector(".scroll-down");
  if (scrollDownIndicator) {
    // Hide by default when page loads if we're already scrolled down
    if (window.scrollY > 10) {
      scrollDownIndicator.style.opacity = "0";
      scrollDownIndicator.style.pointerEvents = "none";
    }

    window.addEventListener("scroll", function () {
      // If we've scrolled down at all, hide the scroll indicator
      if (window.scrollY > 10) {
        scrollDownIndicator.style.opacity = "0";
        scrollDownIndicator.style.pointerEvents = "none";
      } else {
        // If we're back at the top, show the scroll indicator
        scrollDownIndicator.style.opacity = "1";
        scrollDownIndicator.style.pointerEvents = "auto";
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Account for fixed header
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // AJAX Form submission with Formspree
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const btnText = submitBtn.querySelector(".btn-text");
  const originalBtnText = btnText.textContent;

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the form from submitting normally

      // Show loading state
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      // Get form data
      const formData = new FormData(contactForm);

      // Set a timeout to prevent indefinite spinning
      const timeoutId = setTimeout(() => {
        submitBtn.classList.remove("loading");
        submitBtn.classList.add("error");
        submitBtn.querySelector(".btn-text").textContent = "Timed Out";

        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.classList.remove("error");
          submitBtn.querySelector(".btn-text").textContent = "Send Message";
          submitBtn.disabled = false;
        }, 3000);
      }, 10000); // 10 second timeout

      // Send form data to Formspree
      fetch("https://formspree.io/f/mleqnnpd", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          clearTimeout(timeoutId); // Clear the timeout
          return response.json();
        })
        .then((data) => {
          // Success - update button text
          submitBtn.classList.remove("loading");
          submitBtn.querySelector(".btn-text").textContent = "Message Sent!";
          submitBtn.classList.add("success");

          // Reset form
          contactForm.reset();

          // Reset button after 3 seconds
          setTimeout(() => {
            submitBtn.querySelector(".btn-text").textContent = "Send Message";
            submitBtn.classList.remove("success");
            submitBtn.disabled = false;
          }, 3000);
        })
        .catch((error) => {
          // Make sure timeout is cleared
          clearTimeout(timeoutId);

          // Error - update button text
          submitBtn.classList.remove("loading");
          submitBtn.querySelector(".btn-text").textContent = "Failed to Send";
          submitBtn.classList.add("error");

          // Reset button after 3 seconds
          setTimeout(() => {
            submitBtn.querySelector(".btn-text").textContent = "Send Message";
            submitBtn.classList.remove("error");
            submitBtn.disabled = false;
          }, 3000);

          console.error("Error:", error);
        });
    });
  }

  // Calculate and animate progress bars
  const progressBars = document.querySelectorAll(".progress-bar");
  const animateProgressBars = () => {
    progressBars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0%";
      setTimeout(() => {
        bar.style.width = width;
      }, 500);
    });
  };

  // Add intersection observer for progress bars
  const languagesSection = document.querySelector("#languages");
  if (languagesSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateProgressBars();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(languagesSection);
  }

  // Also update active link on scroll
  window.addEventListener("scroll", function () {
    // Use debounce to avoid excessive calls
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(forceUpdateActiveNavLink, 100);
  });

  // Make sure active link is set on page load
  document.addEventListener("DOMContentLoaded", function () {
    // Initial update
    setTimeout(forceUpdateActiveNavLink, 100);
  });
});
