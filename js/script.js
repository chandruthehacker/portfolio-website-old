let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

document.addEventListener("click", (event) => {
  const isClickInsideMenu =
    navbar.contains(event.target) || menuIcon.contains(event.target);

  if (navbar.classList.contains("active") && !isClickInsideMenu) {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  }
});

// Scroll behavior
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => link.classList.remove("active"));
      document
        .querySelector("header nav a[href*=" + id + "]")
        .classList.add("active");
    }
  });

  // close navbar on scroll
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// smooth close on link click
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  });
});

// scroll reveal contents
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
    ".home-content .passion,.home-content p, .about-content",
    {
      origin: "right",
      distance: "50px",
      duration: 1000,
    }
  );

  const typed = new Typed(".multiple-text", {
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

  //show more button display in projects

  const container = document.querySelector(".projects-container");
  const projectBoxes = container.querySelectorAll(".project-box");
  const lapShowMore = document.querySelector("#lap-show-more");
  const mobShowMore = document.querySelector("#mob-show-more");

  // Check if all project boxes are already visible or there are no hidden ones
  if (projectBoxes.length == 0 || areAllBoxesVisible(projectBoxes)) {
    lapShowMore.style.display = "none";
    mobShowMore.style.display = "none";
  }
  function areAllBoxesVisible(boxes) {
    return Array.from(boxes).every((box) => box.offsetParent !== null);
  }

  // certificate show more button display
  const certContainer = document.querySelector(".certificates-container");
  const certBoxes = certContainer.querySelectorAll(".certificate-box");
  const lapShowMoreCert = document.querySelector("#lap-show-more-cert");
  const mobShowMoreCert = document.querySelector("#mob-show-more-cert");

  // Check if all project boxes are already visible or there are no hidden ones
  if (certBoxes.length === 0 || areAllBoxesVisible(certBoxes)) {
    lapShowMoreCert.style.display = "none";
    mobShowMoreCert.style.display = "none";
  }
  function areAllBoxesVisible(boxes) {
    return Array.from(boxes).every((box) => box.offsetParent !== null);
  }
});

//
//Mobile show more max 750 px shows 3 projects
const mobShowMore = document.getElementById("mob-show-more");
let mobHidden = document.querySelectorAll(".mob-hidden");
let currentIndex = 0;
const itemsPerClick = 3;

mobShowMore.addEventListener("click", () => {
  for (let i = currentIndex; i < currentIndex + itemsPerClick; i++) {
    if (mobHidden[i]) {
      mobHidden[i].style.display = "block";
    }
  }
  currentIndex += itemsPerClick;

  if (currentIndex >= mobHidden.length) {
    mobShowMore.style.display = "none";
  }
});

//Lap show more button landscape shows 4 projects

const lapShowMore = document.getElementById("lap-show-more");
let lapHidden = document.querySelectorAll(".lap-hidden");
let current = 0;
const items = 4;

lapShowMore.addEventListener("click", () => {
  for (let i = current; i < current + items; i++) {
    if (lapHidden[i]) {
      lapHidden[i].style.display = "block";
    }
  }
  current += items;

  if (current >= lapHidden.length) {
    lapShowMore.style.display = "none";
  }
});

//Mobile show more max 750 px shows 3 certificates
const mobShowMoreCert = document.getElementById("mob-show-more-cert");
let mobHiddenCert = document.querySelectorAll(".mob-hidden-cert");
let currentIndexCert = 0;
const itemsPerClickCert = 3;

mobShowMoreCert.addEventListener("click", () => {
  for (
    let i = currentIndexCert;
    i < currentIndexCert + itemsPerClickCert;
    i++
  ) {
    if (mobHiddenCert[i]) {
      mobHiddenCert[i].style.display = "block";
    }
  }
  currentIndexCert += itemsPerClickCert;

  if (currentIndexCert >= mobHiddenCert.length) {
    mobShowMoreCert.style.display = "none";
  }
});

//Lap show more button landscape shows 4 projects

const lapShowMoreCert = document.getElementById("lap-show-more-cert");
let lapHiddenCert = document.querySelectorAll(".lap-hidden-cert");
let currentCert = 0;
const itemsCert = 4;

lapShowMoreCert.addEventListener("click", () => {
  for (let i = currentCert; i < currentCert + itemsCert; i++) {
    if (lapHiddenCert[i]) {
      lapHiddenCert[i].style.display = "block";
    }
  }
  currentCert += itemsCert;

  if (currentCert >= lapHiddenCert.length) {
    lapShowMoreCert.style.display = "none";
  }
});

//contact section

const form = document.querySelector("form");
const statusText = document.getElementById("form-status");

form.addEventListener("submit", function (e) {
  const email = form.querySelector('input[name="email"]').value;
  const name = form.querySelector('input[name="name"]').value;
  const message = form.querySelector('textarea[name="message"]').value;

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !name || !message) {
    e.preventDefault();
    statusText.innerText = "Please fill in all required fields.";
    statusText.style.color = "red";
    statusText.style.display = "block";
    return;
  }

  if (!emailRegex.test(email)) {
    e.preventDefault();
    statusText.innerText = "Please enter a valid email address.";
    statusText.style.color = "red";
    statusText.style.display = "block";
    return;
  }

  // Show success message after a short delay
  setTimeout(() => {
    statusText.innerText = "Message sent successfully!";
    statusText.style.color = "var(--main-color)";
    statusText.style.display = "block";
    form.reset();
  }, 300);
});
