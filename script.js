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
    images: [
      {
        src: "assets/images/cbc-1.png",
        alt: "Cool Beans Coffee ordering system preview",
      },
      {
        src: "assets/images/cbc-2.png",
        alt: "Cool Beans Coffee ordering interface",
      },
      {
        src: "assets/images/cbc-3.png",
        alt: "Cool Beans Coffee customization interface",
      },
      {
        src: "assets/images/cbc-4.png",
        alt: "Cool Beans Coffee customization interface",
      },
      {
        src: "assets/images/cbc-5.png",
        alt: "Cool Beans Coffee customization interface",
      },
      {
        src: "assets/images/cbc-6.png",
        alt: "Cool Beans Coffee customization interface",
      },
      {
        src: "assets/images/cbc-7.png",
        alt: "Cool Beans Coffee customization interface",
      },
      {
        src: "assets/images/cbc-8.png",
        alt: "Cool Beans Coffee customization interface",
      },
      {
        src: "assets/images/cbc-9.png",
        alt: "Cool Beans Coffee customization interface",
      },
      {
        src: "assets/images/cbc-10.png",
        alt: "Cool Beans Coffee customization interface",
      },
      {
        src: "assets/images/cbc-11.png",
        alt: "Cool Beans Coffee customization interface",
      },
      {
        src: "assets/images/cbc-12.png",
        alt: "Cool Beans Coffee customization interface",
      },
      {
        src: "assets/images/cbc-13.png",
        alt: "Cool Beans Coffee customization interface",
      },
      {
        src: "assets/images/cbc-14.png",
        alt: "Cool Beans Coffee customization interface",
      },
      {
        src: "assets/images/cbc-15.png",
        alt: "Cool Beans Coffee customization interface",
      },
    ],
    github: "https://github.com/jhncrl04/coffee-shop",
  },
  "job-tracker": {
    type: "Desktop Application",
    title: "Jab's Coffee POS",
    description:
      "A desktop-based point-of-sale system designed for coffee shops to manage orders, process transactions, and streamline day-to-day sales operations.",
    technologies: ["Java", "MySQL"],
    images: [
      {
        src: "assets/images/job-tracker-1.png",
        alt: "Jab's Coffee POS preview",
      },
      {
        src: "assets/images/job-tracker-2.png",
        alt: "Jab's Coffee POS interface",
      },
    ],
    github: "https://github.com/jhncrl04/job-application-tracker",
  },
};

const modal = document.getElementById("project-modal");
const modalClose = document.getElementById("project-modal-close");
const modalOverlay = document.querySelector(".project-modal-overlay");

const modalType = document.getElementById("project-modal-type");
const modalTitle = document.getElementById("project-modal-title");
const modalImage = document.getElementById("project-modal-image");
const modalThumbnails = document.getElementById("project-modal-thumbnails");
const modalDescription = document.getElementById("project-modal-description");
const modalTech = document.getElementById("project-modal-tech");
const modalGithub = document.getElementById("project-modal-github");

function openProjectModal(projectId) {
  const project = projectData[projectId];

  if (!project) {
    return;
  }

  modalType.textContent = project.type;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalGithub.href = project.github;

  // Main image

  modalImage.src = project.images[0].src;
  modalImage.alt = project.images[0].alt;

  // Thumbnails

  modalThumbnails.innerHTML = "";

  project.images.forEach((image, index) => {
    const thumbnail = document.createElement("button");

    thumbnail.type = "button";
    thumbnail.className = "project-modal-thumbnail";

    if (index === 0) {
      thumbnail.classList.add("active");
    }

    thumbnail.innerHTML = `
        <img
          src="${image.src}"
          alt="${image.alt}"
        />
      `;

    thumbnail.addEventListener("click", () => {
      modalImage.src = image.src;
      modalImage.alt = image.alt;

      document.querySelectorAll(".project-modal-thumbnail").forEach((item) => {
        item.classList.remove("active");
      });

      thumbnail.classList.add("active");
    });

    modalThumbnails.appendChild(thumbnail);
  });

  // Technologies

  modalTech.innerHTML = "";

  project.technologies.forEach((technology) => {
    const technologyTag = document.createElement("span");

    technologyTag.textContent = technology;

    modalTech.appendChild(technologyTag);
  });

  // Show modal

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

// Open modal

document.querySelectorAll(".project-modal-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    const projectId = button.dataset.project;

    openProjectModal(projectId);
  });
});

// Close button

modalClose.addEventListener("click", closeProjectModal);

// Close when clicking overlay

modalOverlay.addEventListener("click", closeProjectModal);

// Close with Escape

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("active")) {
    closeProjectModal();
  }
});
