const slides = [
  {
    type: "single",
    src: "Grafics/Reisebild%200.png",
    alt: "Reisebild 0",
    label: "Startseite"
  },
  {
    type: "single",
    src: "Grafics/Reisebild%201.png",
    alt: "Reisebild 1",
    label: "Reisebild 1"
  },
  {
    type: "single",
    src: "Grafics/Reisebild%202.png",
    alt: "Reisebild 2",
    label: "Reisebild 2"
  },
  {
    type: "single",
    src: "Grafics/Reisebild%203.png",
    alt: "Reisebild 3",
    label: "Reisebild 3"
  },
  {
    type: "single",
    src: "Grafics/Reisebild%204.png",
    alt: "Reisebild 4",
    label: "Reisebild 4"
  },
  {
    type: "single",
    src: "Grafics/Reisebild%205.png",
    alt: "Reisebild 5",
    label: "Reisebild 5"
  },
  {
    type: "single",
    src: "Grafics/Reisebild%206.png",
    alt: "Reisebild 6",
    label: "Reisebild 6"
  },
  {
    type: "single",
    src: "Grafics/Reisebild%207.png",
    alt: "Reisebild 7",
    label: "Reisebild 7"
  },
  {
    type: "collage",
    label: "Baumhausbilder",
    images: [
      "Grafics/Baumhausbild%201.jpeg",
      "Grafics/Baumhausbild%202.jpeg",
      "Grafics/Baumhausbild%203.jpeg"
    ]
  },
  {
    type: "message",
    label: "Schlussseite"
  }
];

const slideStage = document.getElementById("slideStage");
const slideCounter = document.getElementById("slideCounter");
const dotTrack = document.getElementById("dotTrack");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const singleTemplate = document.getElementById("singleImageTemplate");
const treehouseTemplate = document.getElementById("treehouseTemplate");
const messageTemplate = document.getElementById("messageTemplate");

let currentSlideIndex = 0;

function renderDots() {
  const fragment = document.createDocumentFragment();

  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot-button";
    dot.setAttribute("aria-label", `${index + 1}. ${slide.label}`);
    dot.addEventListener("click", () => goToSlide(index));
    fragment.appendChild(dot);
  });

  dotTrack.replaceChildren(fragment);
}

function renderSlide() {
  const slide = slides[currentSlideIndex];
  let slideElement;

  if (slide.type === "single") {
    slideElement = singleTemplate.content.firstElementChild.cloneNode(true);
    const image = slideElement.querySelector(".hero-image");
    image.src = slide.src;
    image.alt = slide.alt;
  } else if (slide.type === "collage") {
    slideElement = treehouseTemplate.content.firstElementChild.cloneNode(true);
    const images = slideElement.querySelectorAll("img");
    slide.images.forEach((src, index) => {
      images[index].src = src;
    });
  } else {
    slideElement = messageTemplate.content.firstElementChild.cloneNode(true);
  }

  slideStage.replaceChildren(slideElement);
  slideCounter.textContent = `${currentSlideIndex + 1} / ${slides.length}`;

  Array.from(dotTrack.children).forEach((dot, index) => {
    dot.classList.toggle("is-active", index === currentSlideIndex);
    dot.setAttribute("aria-current", index === currentSlideIndex ? "true" : "false");
  });

  prevButton.disabled = currentSlideIndex === 0;
  nextButton.disabled = currentSlideIndex === slides.length - 1;
  prevButton.setAttribute("aria-disabled", String(prevButton.disabled));
  nextButton.setAttribute("aria-disabled", String(nextButton.disabled));
}

function goToSlide(index) {
  currentSlideIndex = Math.max(0, Math.min(index, slides.length - 1));
  renderSlide();
}

function changeSlide(direction) {
  goToSlide(currentSlideIndex + direction);
}

prevButton.addEventListener("click", () => changeSlide(-1));
nextButton.addEventListener("click", () => changeSlide(1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    changeSlide(-1);
  }

  if (event.key === "ArrowRight") {
    changeSlide(1);
  }
});

renderDots();
renderSlide();
