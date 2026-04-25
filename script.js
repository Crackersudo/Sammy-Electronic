// Mobile Menu Toggle
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";

  if (navLinks.style.display === "flex") {
    navLinks.style.position = "absolute";
    navLinks.style.top = "70px";
    navLinks.style.left = "0";
    navLinks.style.right = "0";
    navLinks.style.background = "var(--dark-bg)";
    navLinks.style.flexDirection = "column";
    navLinks.style.padding = "20px";
    navLinks.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";
  }
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const elementVisible = 100;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Trigger once on load

// Navbar Active State on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

  // Navbar background on scroll
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(26, 26, 26, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background = "var(--dark-bg)";
    navbar.style.backdropFilter = "none";
  }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Counter Animation for Experience Badge
const animateCounter = () => {
  const badge = document.querySelector(".experience-badge h4");
  if (!badge) return;

  const target = 10;
  let current = 0;
  const increment = 1;
  const timer = setInterval(() => {
    current += increment;
    badge.textContent = current + "+";
    if (current >= target) {
      clearInterval(timer);
    }
  }, 200);
};

// Trigger counter when about section is visible
const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter();
        aboutObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

const aboutSection = document.querySelector(".about");
if (aboutSection) {
  aboutObserver.observe(aboutSection);
}
