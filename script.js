// JavaScript for Mobile Navigation
const mobileNav = document.getElementById("mobileNav");
const mobileNavButton = document.getElementById("mobileNavButton");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
const mobileNavSeparators = document.querySelectorAll(".mobile-nav-separator"); // Select separators
const nav = document.querySelector(".luxurious-nav"); // Select the navigation element

function toggleMobileNav() {
  const isOpen = mobileNav.classList.toggle("open");
  mobileNavButton.setAttribute("aria-expanded", isOpen.toString());

  if (isOpen) {
    mobileNav.removeAttribute("hidden");
    animateMobileNavOpen(); // Call combined open animation
    document.body.classList.add("mobile-nav-open");
  } else {
    animateMobileNavClose(); // Call combined close animation
    setTimeout(() => {
      mobileNav.setAttribute("hidden", "");
    }, 500);
    document.body.classList.remove("mobile-nav-open");
  }
}

function animateMobileNavOpen() {
  mobileNavLinks.forEach((link, index) => {
    link.classList.add("animate-in"); // Add class for animation
  });
  mobileNavSeparators.forEach((separator, index) => {
    separator.classList.add("animate-in"); // Animate separators in too
  });
}

function animateMobileNavClose() {
  mobileNavLinks.forEach((link, index) => {
    link.classList.remove("animate-in"); // Remove class to trigger reverse animation (CSS transition)
  });
  mobileNavSeparators.forEach((separator, index) => {
    separator.classList.remove("animate-in"); // Animate separators out
  });
}

function closeMobileNavOnClick() {
  if (mobileNav.classList.contains("open")) {
    // Only close if it's open
    toggleMobileNav(); // Use existing toggle function to close
  }
}

// Function to handle scroll event and add class to nav
function handleScroll() {
  if (window.scrollY > 50) {
    // Example scroll threshold, adjust as needed
    nav.classList.add("nav-scrolled");
  } else {
    nav.classList.remove("nav-scrolled");
  }
}

// Attach scroll event listener
window.addEventListener("scroll", handleScroll);

// Section Entrance Animations using Intersection Observer
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animatedElements =
          entry.target.querySelectorAll(".animate__animated");
        animatedElements.forEach((element) => {
          const animationDelay = element.dataset.animationDelay || "0s";
          element.style.animationDelay = animationDelay;
          element.classList.add("animate__fadeInUp", "animate__faster"); // Slightly faster animation
        });
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach((section) => observer.observe(section));

// Button Ripple Effect (Primary Button) - CSS now handles active state
// JavaScript is only needed to remove focus outline if you click with mouse
document.querySelectorAll(".button-primary").forEach((button) => {
  button.addEventListener("mouseup", () => button.blur()); // Remove focus outline after click
});

// Update UTC Time in Status Bar
function updateUTCTime() {
  const utcTimeElement = document.getElementById("utc-time");
  if (!utcTimeElement) return; // Exit if element not found (error handling)

  const now = new Date();
  const utcString = now.toUTCString().slice(-12, -4); // Extract HH:MM:SS from UTC string
  utcTimeElement.textContent = `UTC ${now}`;
}

updateUTCTime(); // Initial call
setInterval(updateUTCTime, 1000); // Update every second
