import {
  top_navbar,
  middle_navbar,
  bottom_navbar,
} from "/components/navbar.js";
import getCategoryCard from "/components/category_card.js";

let categoryList = null;

let splide = null;

const featured = new Splide(".splideFeature", {
  // type: "loop",
  // heightRatio: 0.5,
  perPage: 2,
  rewind: true,
  breakpoints: {
    1024: {
      perPage: 2,
    },
    767: {
      perPage: 2,
    },
    640: {
      perPage: 1,
    },
  },
  autoplay: true,
  focus: "center",
  gap: "2em",
  updateOnMove: true,
  pagination: false,
}).mount();

window.onload = () => {
  const nav = document.querySelector("#navbar");
  nav.innerHTML = top_navbar() + middle_navbar() + bottom_navbar();
  const item_cart = document.querySelector("#item_count_cart");
  let cartItems = localStorage.getItem("cart-total-items") || 0;
  if (!(cartItems == 0 || cartItems == null)) {
    item_cart.textContent = cartItems;
    item_cart.style.display = "flex";
  }

  categoryRequest();
};

async function categoryRequest() {
  const res = await fetch(
    `https://dark-gold-meerkat-shoe.cyclic.cloud/category`
  );
  const data = await res.json();
  categoryList = data;
  console.log(categoryList);
  categoryAppend(data);
}

function categoryAppend(list) {
  const append = document.querySelector("#category_list");
  append.innerHTML = "";
  list.forEach((element, index) => {
    append.innerHTML += getCategoryCard(element);
  });
  splide = new Splide(".splideCategory", {
    // type: "loop",
    heightRatio: 0.5,
    perPage: 5,
    rewind: true,
    breakpoints: {
      1024: {
        perPage: 3,
      },
      767: {
        perPage: 2,
      },
      640: {
        perPage: 1,
      },
    },
    arrows: false,
    focus: "center",
    gap: "2em",
    updateOnMove: true,
    pagination: false,
  }).mount();
  const nextButton = document.querySelector("#nextButton");
  nextButton.removeEventListener("click", goNext);
  nextButton.addEventListener("click", goNext);

  const prevButton = document.querySelector("#prevButton");
  prevButton.removeEventListener("click", goPrev);
  prevButton.addEventListener("click", goPrev);
}

function goNext() {
  splide.go("+5");
}

function goPrev() {
  splide.go("-5");
}
