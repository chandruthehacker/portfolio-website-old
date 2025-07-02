function viewAndDownloadResume() {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const timestamp = new Date().getTime();
  const url = `assets/pdf/resume.pdf?v=${timestamp}`;

  if (isMobile) {
    window.open(url, "");
  } else {
    window.open(url, "_blank");

    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
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

//for projects
const projectsContainer = document.getElementById("projectsContainer");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const paginationDotsContainer = document.getElementById("paginationDots");
const projectBoxes = Array.from(
  projectsContainer.querySelectorAll(".project-box")
);
const totalProjects = projectBoxes.length;

// Configuration
const scrollDelay = 2000;
const desktopScrollCount = 1;

// State variables
let autoSwipeInterval;
let isAutoSwiping = false;
let resizeTimeout;

// Detect mobile view based on CSS media query
function isMobileView() {
  return window.matchMedia("(max-width: 500px)").matches;
}

// Get the width of a single project box including its margin/gap
function getProjectBoxWidth() {
  const firstBox = projectBoxes[0];
  if (!firstBox) return 0;

  const boxStyle = window.getComputedStyle(firstBox);
  const marginRight = parseFloat(boxStyle.marginRight);
  const marginLeft = parseFloat(boxStyle.marginLeft);

  return firstBox.offsetWidth + marginLeft + marginRight;
}

// Get the current active project index based on scroll position
function getCurrentIndex() {
  const scrollLeft = projectsContainer.scrollLeft;
  const itemWidth = getProjectBoxWidth(); // Use single item width for index calculation
  return Math.round(scrollLeft / itemWidth);
}

// Scroll to a specific project index
function scrollToProject(index) {
  let scrollAmount;
  if (isMobileView()) {
    scrollAmount = index * getProjectBoxWidth();
  } else {
    const boxWidth = getProjectBoxWidth();
    const maxScrollLeft =
      projectsContainer.scrollWidth - projectsContainer.clientWidth;
    scrollAmount = Math.min(index * boxWidth, maxScrollLeft);
  }

  projectsContainer.scrollTo({
    left: scrollAmount,
    behavior: "smooth",
  });
}

// --- Auto-swipe Functionality (Mobile Only) ---

function startAutoSwipe() {
  if (!isMobileView() || isAutoSwiping) return;

  isAutoSwiping = true;
  autoSwipeInterval = setInterval(() => {
    const currentIndex = getCurrentIndex();
    const nextIndex = (currentIndex + 1) % totalProjects;
    scrollToProject(nextIndex);
  }, scrollDelay);
}

function stopAutoSwipe() {
  clearInterval(autoSwipeInterval);
  isAutoSwiping = false;
}

// --- Arrow Navigation (Desktop Only) ---

function scrollProjects(direction) {
  if (isMobileView()) return;

  stopAutoSwipe();
  const currentScrollLeft = projectsContainer.scrollLeft;
  const projectBoxWidth = getProjectBoxWidth();
  let targetScrollLeft;

  if (direction === 1) {
    // Scroll right
    targetScrollLeft = currentScrollLeft + projectBoxWidth * desktopScrollCount;
    targetScrollLeft = Math.min(
      targetScrollLeft,
      projectsContainer.scrollWidth - projectsContainer.clientWidth
    );
  } else {
    // Scroll left
    targetScrollLeft = currentScrollLeft - projectBoxWidth * desktopScrollCount;
    targetScrollLeft = Math.max(targetScrollLeft, 0);
  }

  projectsContainer.scrollTo({
    left: targetScrollLeft,
    behavior: "smooth",
  });
}

// Update arrow visibility based on scroll position (Desktop)
function updateArrows() {
  if (isMobileView()) {
    leftArrow.style.display = "none";
    rightArrow.style.display = "none";
    return;
  }

  leftArrow.style.display = "block";
  rightArrow.style.display = "block";

  const scrollLeft = projectsContainer.scrollLeft;
  const maxScrollLeft =
    projectsContainer.scrollWidth - projectsContainer.clientWidth;

  leftArrow.disabled = scrollLeft <= 0;
  rightArrow.disabled = scrollLeft >= maxScrollLeft - 1;
}

function createPaginationDots() {
  paginationDotsContainer.innerHTML = "";

  if (!isMobileView()) {
    paginationDotsContainer.style.display = "none";
    return;
  }

  paginationDotsContainer.style.display = "flex";

  projectBoxes.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
      stopAutoSwipe();
      scrollToProject(index);
      if (isMobileView()) {
        setTimeout(startAutoSwipe, scrollDelay);
      }
    });
    paginationDotsContainer.appendChild(dot);
  });
}

function updateDots() {
  if (!isMobileView()) return;

  const dots = paginationDotsContainer.querySelectorAll(".dot");
  const currentIndex = getCurrentIndex();

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

// Listen for scroll events on the projects container
projectsContainer.addEventListener("scroll", () => {
  updateArrows();
  updateDots();
});

projectsContainer.addEventListener("mouseenter", stopAutoSwipe);
projectsContainer.addEventListener("mouseleave", () => {
  if (isMobileView()) {
    stopAutoSwipe();
  } else {
  }
});

// Touch interaction for mobile to stop/start auto-swipe
projectsContainer.addEventListener("touchstart", stopAutoSwipe);
projectsContainer.addEventListener("touchend", () => {
  if (isMobileView()) {
    // Resume auto-swipe after a short delay on touch end
    setTimeout(startAutoSwipe, scrollDelay);
  }
});

// Initialize on page load
window.addEventListener("load", () => {
  createPaginationDots();
  updateArrows();
  updateDots();
  if (isMobileView()) {
    startAutoSwipe();
  }
});

// Re-initialize on window resize to handle view changes
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    createPaginationDots();
    updateArrows();
    updateDots();

    if (isMobileView()) {
      stopAutoSwipe();
      startAutoSwipe();
    } else {
      stopAutoSwipe();
      projectsContainer.scrollLeft = 0;
    }
  }, 100);
});

window.scrollProjects = scrollProjects;
