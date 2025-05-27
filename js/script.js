const timestamp = new Date().getTime();

function viewAndDownloadResume() {
  window.open(`assets/pdf/resume.pdf?v=${timestamp}`, "_blank");
  const link = document.createElement("a");
  link.href = "assets/pdf/resume.pdf?v=2";
  link.download = "resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
// =================== Navigation Toggle ===================
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Close navbar when clicking outside
document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  }
});

// =================== Scroll Behavior ===================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  document
    .querySelector("header")
    .classList.toggle("sticky", window.scrollY > 100);

  sections.forEach((sec) => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => link.classList.remove("active"));
      document
        .querySelector(`header nav a[href*="${id}"]`)
        ?.classList.add("active");
    }
  });

  // Close navbar on scroll
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// Close navbar when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  });
});

// =================== ScrollReveal Animations ===================
document.addEventListener("DOMContentLoaded", () => {
  ScrollReveal().reveal(".home-content, .heading", {
    origin: "top",
    distance: "50px",
    duration: 1000,
  });
  ScrollReveal().reveal(".home-image, .contact form", {
    origin: "bottom",
    distance: "50px",
    duration: 1000,
  });
  ScrollReveal().reveal(".home-content h1, .about-image", {
    origin: "left",
    distance: "50px",
    duration: 1000,
  });
  ScrollReveal().reveal(
    ".home-content .passion, .home-content p, .about-content",
    {
      origin: "right",
      distance: "50px",
      duration: 1000,
    }
  );

  new Typed(".multiple-text", {
    strings: [
      "CS Student",
      "Aspiring Security Analyst",
      "Cybersecurity Enthusiast",
    ],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
  });

  // Hide "Show More" buttons if all items are visible
  checkVisibility(
    ".projects-container",
    ".project-box",
    "#lap-show-more",
    "#mob-show-more"
  );
  checkVisibility(
    ".certificates-container",
    ".certificate-box",
    "#lap-show-more-cert",
    "#mob-show-more-cert"
  );
});

function checkVisibility(containerSelector, itemSelector, lapBtnId, mobBtnId) {
  const container = document.querySelector(containerSelector);
  const items = container?.querySelectorAll(itemSelector);
  const lapBtn = document.querySelector(lapBtnId);
  const mobBtn = document.querySelector(mobBtnId);

  if (
    !items ||
    items.length === 0 ||
    Array.from(items).every((box) => box.offsetParent !== null)
  ) {
    lapBtn && (lapBtn.style.display = "none");
    mobBtn && (mobBtn.style.display = "none");
  }
}

// =================== Show More Buttons ===================
// Mobile Projects
setupShowMore("#mob-show-more", ".mob-hidden", 3);
// Laptop Projects
setupShowMore("#lap-show-more", ".lap-hidden", 4);
// Mobile Certificates
setupShowMore("#mob-show-more-cert", ".mob-hidden-cert", 3);
// Laptop Certificates
setupShowMore("#lap-show-more-cert", ".lap-hidden-cert", 4);

function setupShowMore(buttonId, itemsSelector, countPerClick) {
  const button = document.querySelector(buttonId);
  const items = document.querySelectorAll(itemsSelector);
  let currentIndex = 0;

  if (!button) return;

  button.addEventListener("click", () => {
    for (let i = currentIndex; i < currentIndex + countPerClick; i++) {
      if (items[i]) items[i].style.display = "block";
    }

    currentIndex += countPerClick;
    if (currentIndex >= items.length) button.style.display = "none";
  });
}

// =================== Contact Form ===================
const form = document.querySelector("form");
const statusText = document.getElementById("form-status");

form?.addEventListener("submit", (e) => {
  const email = form.querySelector('input[name="email"]').value.trim();
  const name = form.querySelector('input[name="name"]').value.trim();
  const message = form.querySelector('textarea[name="message"]').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !name || !message) {
    e.preventDefault();
    showFormStatus("Please fill in all required fields.", "red");
    return;
  }

  if (!emailRegex.test(email)) {
    e.preventDefault();
    showFormStatus("Please enter a valid email address.", "red");
    return;
  }

  // Fake delay for success simulation
  setTimeout(() => {
    showFormStatus("Message sent successfully!", "var(--main-color)");
    form.reset();
  }, 300);
});

function showFormStatus(message, color) {
  if (statusText) {
    statusText.innerText = message;
    statusText.style.color = color;
    statusText.style.display = "block";
  }
}
