window.onload = () => {
  const helloWorld = () => {
    console.log("Hello, World! :)");
  };

  document
    .getElementById("settingsButton")
    .addEventListener("click", helloWorld);
};
