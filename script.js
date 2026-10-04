/* =========================
   Config
========================= */

const CONTACT_EMAIL = "jcarlo.servidad.dev@gmail.com";
const FORM_ENDPOINT = "https://api.web3forms.com/submit";

/* =========================
   Project data
========================= */

const cbcImages = Array.from({ length: 15 }, (_, i) => ({
  src: `assets/images/cbc-${i + 1}.png`,
  alt:
    i === 0
      ? "Cool Beans Coffee ordering system preview"
      : `Cool Beans Coffee screenshot ${i + 1}`,
}));

const projectData = {
  smartspeak: {
    type: "Capstone Project",
    title: "SmartSpeak",
    description:
      "A mobile application designed to support students with communication difficulties through digital PECS cards, providing an accessible way to express needs, requests, and messages.",
    technologies: ["React Native", "Expo", "TypeScript", "Firebase"],
    images: [
      {
        src: "assets/images/smartspeak-1.png",
        alt: "SmartSpeak learner screen preview",
      },
      {
        src: "assets/images/smartspeak-2.png",
        alt: "SmartSpeak category screen preview",
      },
      {
        src: "assets/images/smartspeak-3.png",
        alt: "SmartSpeak assign card screen",
      },
      {
        src: "assets/images/smartspeak-4.png",
        alt: "SmartSpeak add category screen",
      },
      {
        src: "assets/images/smartspeak-5.png",
        alt: "SmartSpeak assign category screen",
      },
    ],
    github: "https://github.com/jhncrl04/smartspeak",
  },
  coffeeshopweb: {
    type: "Web Application",
    title: "Cool Beans Coffee",
    description:
      "A web-based coffee ordering system that allows customers to browse beverages, place orders, and customize their drinks according to their preferences.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP"],
    images: cbcImages,
    github: "https://github.com/jhncrl04/coffee-shop",
  },
  "jabs-pos": {
    type: "Desktop Application",
    title: "Jab's Coffee POS",
    description:
      "A desktop-based point-of-sale system designed for coffee shops to manage orders, process transactions, and streamline day-to-day sales operations.",
    technologies: ["Java", "MySQL"],
    // TODO: make sure these filenames match your actual image files
    images: [
      {
        src: "assets/images/jabs-1.png",
        alt: "Jab's Coffee POS preview",
      },
      {
        src: "assets/images/jabs-2.png",
        alt: "Jab's Sign Up Screen",
      },
      {
        src: "assets/images/jabs-3.png",
        alt: "Jab's Menu Screen",
      },
      {
        src: "assets/images/jabs-4.png",
        alt: "Jab's Profile Setting Screen",
      },
      {
        src: "assets/images/jabs-5.png",
        alt: "Jab's Admin Dashboard Screen",
      },
      {
        src: "assets/images/jabs-6.png",
        alt: "Jab's Product Table Screen",
      },
      {
        src: "assets/images/jabs-7.png",
        alt: "Jab's Order Table Screen",
      },
    ],
    github: "https://github.com/jhncrl04/coffee-pos-java",
  },
};

/* =========================
   Project modal
========================= */

const modal = document.getElementById("project-modal");
const modalClose = document.getElementById("project-modal-close");
const modalOverlay = modal.querySelector(".project-modal-overlay");

const modalType = document.getElementById("project-modal-type");
const modalTitle = document.getElementById("project-modal-title");
const modalImage = document.getElementById("project-modal-image");
const modalThumbnails = document.getElementById("project-modal-thumbnails");
const modalDescription = document.getElementById("project-modal-description");
const modalTech = document.getElementById("project-modal-tech");
const modalGithub = document.getElementById("project-modal-github");

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

let lastFocusedElement = null;

function setModalImage(image, activeThumbnail) {
  modalImage.src = image.src;
  modalImage.alt = image.alt;

  modalThumbnails
    .querySelectorAll(".project-modal-thumbnail")
    .forEach((item) =>
      item.classList.toggle("active", item === activeThumbnail),
    );
}

function buildThumbnail(image, index) {
  const thumbnail = document.createElement("button");
  thumbnail.type = "button";
  thumbnail.className = "project-modal-thumbnail";
  thumbnail.setAttribute("aria-label", `Show image ${index + 1}: ${image.alt}`);

  // Built with DOM methods instead of innerHTML so alt text can't break markup
  const img = document.createElement("img");
  img.src = image.src;
  img.alt = "";
  img.loading = "lazy";
  img.decoding = "async";
  thumbnail.appendChild(img);

  thumbnail.addEventListener("click", () => setModalImage(image, thumbnail));

  return thumbnail;
}

function openProjectModal(projectId, trigger) {
  const project = projectData[projectId];
  if (!project) return;

  lastFocusedElement = trigger || document.activeElement;

  modalType.textContent = project.type;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalGithub.href = project.github;

  // Thumbnails + main image
  modalThumbnails.replaceChildren(
    ...project.images.map((image, index) => buildThumbnail(image, index)),
  );
  setModalImage(project.images[0], modalThumbnails.firstElementChild);

  // Technologies
  modalTech.replaceChildren(
    ...project.technologies.map((technology) => {
      const tag = document.createElement("li");
      tag.textContent = technology;
      return tag;
    }),
  );

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  modalClose.focus();
}

function closeProjectModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

// Open
document.querySelectorAll(".project-modal-trigger").forEach((button) => {
  button.addEventListener("click", () =>
    openProjectModal(button.dataset.project, button),
  );
});

// Close
modalClose.addEventListener("click", closeProjectModal);
modalOverlay.addEventListener("click", closeProjectModal);

// Escape to close + keep Tab focus inside the modal
document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("active")) return;

  if (event.key === "Escape") {
    closeProjectModal();
    return;
  }

  if (event.key === "Tab") {
    const focusable = [...modal.querySelectorAll(FOCUSABLE)];
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

/* =========================
   Mobile navigation
========================= */

const navToggle = document.getElementById("navbar-toggle");
const navLinks = document.getElementById("navbar-links");

function setNavOpen(open) {
  navLinks.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}

navToggle.addEventListener("click", () => {
  setNavOpen(navToggle.getAttribute("aria-expanded") !== "true");
});

// Close the menu after choosing a link, pressing Escape, or resizing to desktop
navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) setNavOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNavOpen(false);
});

window.matchMedia("(min-width: 701px)").addEventListener("change", (e) => {
  if (e.matches) setNavOpen(false);
});

/* =========================
   Active nav link on scroll
========================= */

const navAnchors = [...navLinks.querySelectorAll("a")];
const observedSections = navAnchors
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navAnchors.forEach((a) => {
        const isActive = a.getAttribute("href") === `#${entry.target.id}`;
        a.classList.toggle("active", isActive);
        if (isActive) {
          a.setAttribute("aria-current", "true");
        } else {
          a.removeAttribute("aria-current");
        }
      });
    });
  },
  // Triggers when a section crosses the middle band of the viewport
  { rootMargin: "-45% 0px -50% 0px" },
);

observedSections.forEach((section) => sectionObserver.observe(section));

/* =========================
   Copy email
========================= */

const copyEmailButton = document.getElementById("copy-email");

copyEmailButton.addEventListener("click", async () => {
  const original = copyEmailButton.textContent;

  try {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
    copyEmailButton.textContent = "Copied!";
  } catch {
    copyEmailButton.textContent = "Copy failed";
  }

  setTimeout(() => (copyEmailButton.textContent = original), 2000);
});

/* =========================
   Contact form
========================= */

const contactForm = document.getElementById("contact-form");
const contactSubmit = document.getElementById("contact-submit");
const formStatus = document.getElementById("form-status");

function setStatus(message, type = "") {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`.trim();
}

function validateForm() {
  let firstInvalid = null;

  contactForm.querySelectorAll("[required]").forEach((field) => {
    const valid = field.checkValidity() && field.value.trim() !== "";
    field.setAttribute("aria-invalid", String(!valid));
    if (!valid && !firstInvalid) firstInvalid = field;
  });

  if (firstInvalid) {
    firstInvalid.focus();
    setStatus("Please fill in all fields with a valid email.", "error");
    return false;
  }

  return true;
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validateForm()) return;

  const originalLabel = contactSubmit.innerHTML;
  contactSubmit.disabled = true;
  contactSubmit.textContent = "Sending...";
  setStatus("");

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(contactForm),
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Request failed");
    }

    contactForm.reset();
    setStatus(
      "Thanks! Your message was sent. I'll get back to you soon.",
      "success",
    );
  } catch {
    setStatus(
      `Something went wrong. Please email me directly at ${CONTACT_EMAIL}.`,
      "error",
    );
  } finally {
    contactSubmit.disabled = false;
    contactSubmit.innerHTML = originalLabel;
  }
});

// Clear the error state as the user fixes a field
contactForm.addEventListener("input", (event) => {
  if (event.target.hasAttribute("aria-invalid")) {
    event.target.removeAttribute("aria-invalid");
  }
});
