function startMeshing(startButton) {
  document.getElementById("visual").innerHTML = "";
  document.getElementById("result-buttons").innerHTML = "";
  startButton.classList.add("is-loading");
}

function finishMeshing(startButton) {
  startButton.classList.remove("is-loading");
}
