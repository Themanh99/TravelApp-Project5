function updateUI(block, valid, contents) {
  // Retrieve data from localStorage
  const savedContents = JSON.parse(localStorage.getItem("contents"));

  // If there's saved data in localStorage, use it, otherwise use the provided contents
  if (savedContents && savedContents.length > 0) {
    contents = savedContents;
  } else {
    // Save the initial contents to localStorage
    localStorage.setItem("contents", JSON.stringify(contents));
  }

  // Error message if at least one input is missing
  if (valid === false) {
    block.innerHTML = '<h1 class="error"> Please input all fields </h1>';
    return;
  }

  // Clear the existing content in the block
  block.innerHTML = "";

  for (let i = 0; i < contents.length; i++) {
    let weatherText = "Current weather is:";
    if (contents[0].infuture) {
      weatherText = "Weather forecast then is:";
    }

    let div = document.createElement("div");
    let content = contents[i];
    div.className = "result" + i;

    div.innerHTML = `
      <div class="image">
        <img src="${content.image}" alt="ok">
      </div>
      <div class="message">
        <h2>Trip to : ${content.city} on :${content.country}</h2>
        <p>
          <span>${weatherText}</span><br>
          High temperature : ${content.high_temp}&deg;C<br> Low temperature : ${content.low_temp}&deg;C<br>
          ${content.forecast}
        </p>
      </div>
    `;

    block.appendChild(div);
  }
}

export { updateUI };
