const topBar = document.querySelector("#top-bar");

const exteriorColorSection = document.querySelector("#exterior-buttons");
const interiorColorSection = document.querySelector("#interior-buttons");
const exteriorImage = document.querySelector("#exterior-image");
const interiorImage = document.querySelector("#interior-image");

const wheelButtonsSection = document.querySelector("#wheel-buttons");

let selectedColor = "Stealth Grey";
const selectedOptions = {
  "Performance Wheels": false,
  "Performance Package": false,
  "Full Self-Driving": false,
};

// Handle Top Bar On Scroll
const handleScroll = () => {
  const atTop = window.scrollY === 0;
  topBar.classList.toggle("visible-bar", atTop);
  topBar.classList.toggle("hidden-bar", !atTop);
};

// Image Mapping
const exteriorImages = {
  "Stealth Grey": "./images/model-y-stealth-grey.jpg",
  "Pearl White": "./images/model-y-pearl-white.jpg",
  "Deep Blue": "./images/model-y-deep-blue-metallic.jpg",
  "Solid Black": "./images/model-y-solid-black.jpg",
  "Ultra Red": "./images/model-y-ultra-red.jpg",
  "Quick Silver": "./images/model-y-quicksilver.jpg",
};

const interiorImages = {
  Dark: "./images/model-y-interior-dark.jpg",
  Light: "./images/model-y-interior-light.jpg",
};
// Handle Color Selection
const handleColorButtonClick = (e) => {
  let button;
  //   console.log(e.target.tagName);
  if (e.target.tagName === "IMG") {
    button = e.target.closest("button");
  } else if (e.target.tagName === "BUTTON") {
    button = e.target;
  }

  if (button) {
    const buttons = e.currentTarget.querySelectorAll("button");
    buttons.forEach((btn) => btn.classList.remove("btn-selected"));
    button.classList.add("btn-selected");
  }
  // Change exterior image
  if (e.currentTarget === exteriorColorSection) {
    selectedColor = button.querySelector("img").alt;
    // exteriorImage.src = exteriorImages[color];
    updateExteriorImage();
  }

  // Change interior image
  if (e.currentTarget === interiorColorSection) {
    const color = button.querySelector("img").alt;
    interiorImage.src = interiorImages[color];
  }
};

// Update exterior image based on color and wheels
const updateExteriorImage = () => {
  const performanceSuffix = selectedOptions["Performance Wheels"]
    ? "-performance"
    : "";
  const colorKey =
    selectedColor in exteriorImages ? selectedColor : "Stealth Grey";
  exteriorImage.src = exteriorImages[colorKey].replace(
    ".jpg",
    `${performanceSuffix}.jpg`
  );
};

// Wheel Selection
const handleWheelButtonClick = (event) => {
  if (event.target.tagName === "BUTTON") {
    const buttons = document.querySelectorAll("#wheel-buttons button");
    buttons.forEach((btn) => btn.classList.remove("bg-gray-700", "text-white"));
    event.target.classList.add("bg-gray-700", "text-white");
    // const selectedWheel = event.target.textContent.includes("Performance");
    // exteriorImage.src = selectedWheel
    //   ? "./images/model-y-stealth-grey-performance.jpg"
    //   : "./images/model-y-stealth-grey.jpg";

    selectedOptions["Performance Wheels"] =
      event.target.textContent.includes("Performance");
    updateExteriorImage();
  }
};

// Event Listeners
window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));
exteriorColorSection.addEventListener("click", handleColorButtonClick);
interiorColorSection.addEventListener("click", handleColorButtonClick);
wheelButtonsSection.addEventListener("click", handleWheelButtonClick);
