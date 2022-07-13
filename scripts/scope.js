function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(220);
  ellipse(100, 200, 80, 80);
}

window.onload = () => {
  const helloWorld = () => {
    console.log("Hello, World! :)");
  };

  document
    .getElementById("settingsButton")
    .addEventListener("click", helloWorld);
};
