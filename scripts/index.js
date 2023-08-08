import {
  top_navbar,
  middle_navbar,
  bottom_navbar,
} from "/components/navbar.js";
import API from "/components/api.js";
import getCategoryCard from "/components/category_card.js";
import getFeaturedCard from "/components/featured_card.js";
import getDealsWeekCard from "/components/deals_card.js";

let categoryList = null;
let featuredList = null;
let dealsList = null;

let splide = null;

new Splide(".splideBlog", {
  // type: "loop",
  // heightRatio: 0.5,
  perPage: 3,
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
  duration: {
    delay: 1000,
  },
  focus: "center",
  gap: "2em",
  updateOnMove: true,
  pagination: false,
}).mount();

new Splide(".splideOffer", {
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
  duration: {
    delay: 1000,
  },
  focus: "center",
  gap: "2em",
  updateOnMove: true,
  pagination: false,
  cover: true,
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
  featuredProductRequest();
  dealsWeekRequest();
};

async function dealsWeekRequest() {
  const res = await fetch(`${API}/products?_limit=10`);
  const data = await res.json();
  dealsList = data;
  console.log(dealsList);
  dealsWeekAppend(data);
}

function dealsWeekAppend(list) {
  const append = document.querySelector("#deals_list");
  append.innerHTML = "";
  list.forEach((element, index) => {
    let p = `<p>`;

    if (element.rating > 5) {
      element.rating = 5;
    }
    if (element.rating_count >= 1000) {
      element.rating_count = (element.rating_count / 1000).toFixed(2) + "k";
    }

    let count = 0;
    for (let i = 0; i < 5; i++) {
      if (count < element.rating) {
        p += `<i class="fa-solid fa-star" style="color: #ff8800;"></i>`;
        count++;
      } else {
        p += `<i
                class="fa-regular fa-star fa-sm"
                style="color: rgb(0, 0, 0, 0.6);"></i>`;
      }
    }
    p += `</p>`;
    append.append(
      getDealsWeekCard(element, p, (event) => {
        alert("Clicked");
        console.log(event);
      })
    );
  });
}

async function categoryRequest() {
  const res = await fetch(`${API}/category`);
  const data = await res.json();
  categoryList = data;
  console.log(categoryList);
  categoryAppend(data);
}

async function featuredProductRequest() {
  const res = await fetch(`${API}/featured_products`);
  const data = await res.json();
  featuredList = data;
  console.log(featuredList);
  featuredAppend(data);
}

function featuredAppend(list) {
  const append = document.querySelector("#feature_list");
  append.innerHTML = "";
  list.forEach((element, index) => {
    append.append(
      getFeaturedCard(element, (event) => {
        alert("Clicked");
        console.log(event);
      })
    );
  });
  new Splide(".splideFeature", {
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
    duration: {
      delay: 1000,
    },
    focus: "center",
    gap: "2em",
    updateOnMove: true,
    pagination: false,
  }).mount();
}

function categoryAppend(list) {
  const append = document.querySelector("#category_list");
  append.innerHTML = "";
  list.forEach((element, index) => {
    append.append(
      getCategoryCard(element, (event) => {
        alert("Category Clicked");
        console.log(event);
      })
    );
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
