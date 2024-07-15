function changeTheme(theme) {
  let htmlElement = document.querySelector("html");
  htmlElement.setAttribute("data-theme", theme);
}

function toggleClass(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}

function switchClass(element, className1, className2) {
  if (element.classList.contains(className1)) {
    element.classList.remove(className1);
    element.classList.add(className2);
  } else if (element.classList.contains(className2)) {
    element.classList.remove(className2);
    element.classList.add(className1);
  }
}

function toggleIsActive(element) {
  toggleClass(element, "is-active");
}

function toggleMediaDetails(element) {
  mediaContentElement = element.parentElement.previousElementSibling;
  detailsElement = mediaContentElement.querySelector(".content > div");
  switchClass(detailsElement, "is-hidden", "is-inline");
}
