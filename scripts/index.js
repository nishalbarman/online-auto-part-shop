import {
  top_navbar,
  middle_navbar,
  bottom_navbar,
} from "/components/navbar.js";

window.onload = () => {
  const nav = document.querySelector("#navbar");
  nav.innerHTML = top_navbar() + middle_navbar() + bottom_navbar();
};
