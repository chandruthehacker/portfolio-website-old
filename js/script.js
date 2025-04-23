let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
  //sticky navbar
  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.scrollY > 100);

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 100,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".home-image, .contact form", {
  origin: "bottom",
});
ScrollReveal().reveal(".home-content h1, .about-image", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

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

//max 750 px shows 3 projects
const showMoreBtn = document.getElementById("showMoreBtn");
let hiddenBoxes = document.querySelectorAll(".hidden-box");
let currentIndex = 0;
const itemsPerClick = 3;

showMoreBtn.addEventListener("click", () => {
  for (let i = currentIndex; i < currentIndex + itemsPerClick; i++) {
    if (hiddenBoxes[i]) {
      hiddenBoxes[i].style.display = "flex";
    }
  }
  currentIndex += itemsPerClick;

  if (currentIndex >= hiddenBoxes.length) {
    showMoreBtn.style.display = "none";
  }
});

//landscape shows 4 projecta

const showMoreListBtn = document.getElementById("showMoreListBtn");
let hiddenBoxesList = document.querySelectorAll(".projects-list");
let current = 0;
const items = 4;

showMoreListBtn.addEventListener("click", () => {
  for (let i = current; i < current + items; i++) {
    if (hiddenBoxesList[i]) {
      hiddenBoxesList[i].style.display = "flex";
    }
  }
  current += items;

  if (current >= hiddenBoxesList.length) {
    showMoreListBtn.style.display = "none";
  }
});
