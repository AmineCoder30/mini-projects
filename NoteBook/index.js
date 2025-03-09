const bullet = document.querySelectorAll("li");
const bulletContainer = document.querySelector("ul");
const notes = document.querySelector(".notes");
const colorsPl = document.querySelector(".color-pl");
const toggle = document.querySelector(".toggle");

var showcolors = false;
const colors = [
  "#00a374",
  "#0069a3",
  "#57a300",
  "#a30d00",
  "#a30046",
  "oklch(0.444 0.177 26.899)",
  "oklch(0.47 0.157 37.304)",
  "oklch(0.473 0.137 46.201)",
  "oklch(0.453 0.124 130.933)",
  "oklch(0.448 0.119 151.328)",
  "oklch(0.45 0.085 224.283)",
  "oklch(0.398 0.195 277.366)",
  "oklch(0.452 0.211 324.591)",
  "oklch(0.279 0.041 260.031)",
];

//toggle colors
toggle.addEventListener("click", function () {
  if (showcolors) {
    colorsPl.style.display = "none";
    toggle.innerHTML = "+";
    showcolors = false;
  } else {
    colorsPl.style.display = "flex";
    toggle.innerHTML = "x";
    showcolors = true;
  }
});

//create more colors
function createColor(colors, parent) {
  for (let f = 0; f < colors.length; f++) {
    const color = document.createElement("li");
    color.classList.add("color");
    color.setAttribute("data-color", colors[f]);
    color.style.background = colors[f];
    parent.appendChild(color);
  }
}

createColor(colors.slice(0, 6), bulletContainer);
createColor(colors.slice(6, colors.length), colorsPl);

//create circle
function createCircle(innerDiv, bullet) {
  const bulletOffset = bullet.getBoundingClientRect();
  const innerDivOffset = innerDiv.getBoundingClientRect();

  const circle = document.createElement("div");
  circle.style.background = bullet.getAttribute("data-color");

  circle.style.left = bulletOffset.left + "px";
  circle.style.top = bulletOffset.top + "px";
  circle.classList.add("circle");
  document.body.appendChild(circle);

  // Trigger reflow to ensure the initial position is applied
  circle.offsetHeight;

  // Move the circle to the innerDiv position
  circle.style.transition = "left 0.2s, top 0.2s";
  circle.style.left = innerDivOffset.left + "px";
  circle.style.top = innerDivOffset.top + "px";

  // Remove the circle after the animation is complete
  setTimeout(() => {
    circle.remove();
  }, 300);
}

function AddNote(bullet) {
  for (let j = 0; j < bullet.length; j++) {
    bullet[j].addEventListener("click", function () {
      //create the outer div
      const div = document.createElement("div");
      div.classList.add("new-note");

      //create the inner div
      const innerDiv = document.createElement("div");
      innerDiv.classList.add("inner-note");
      const input = document.createElement("input");
      input.value = "untitled note";
      innerDiv.appendChild(input);
      const textarea = document.createElement("textarea");
      textarea.maxLength = 200;
      textarea.value = "your note here";
      innerDiv.appendChild(textarea);

      div.appendChild(innerDiv);
      notes.insertBefore(div, notes.firstChild);
      innerDiv.style.background = bullet[j].getAttribute("data-color");
      createCircle(innerDiv, bullet[j]);
      setTimeout(() => {
        div.classList.remove("new-note");
      }, 200);
    });
  }
}

window.onload = function () {
  const secondaryColors = document.querySelectorAll(".color-pl .color");
  const primaryColors = document.querySelectorAll("ul .color");
  AddNote(secondaryColors);
  AddNote(primaryColors);
};
