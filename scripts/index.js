import {
  top_navbar,
  middle_navbar,
  bottom_navbar,
  inputSearchEventListener,
  cartItemUpdate,
} from "/components/navbar.js";
import { getFooter, scrollTop } from "/components/footer.js";
import API from "/components/api.js";
import getCategoryCard from "/components/category_card.js";
import getFeaturedCard from "/components/featured_card.js";
import getDealsWeekCard from "/components/deals_card.js";
import getBlogCard from "/components/blog_card.js";
import getOfferCard from "/components/offer_card.js";
import { searchCardAppend } from "/components/search_card.js";
import addToCart from "../components/add_to_cart.js";

let categoryList = null;
let featuredList = null;
let dealsList = null;
let categorySlide = null;

window.onload = () => {
  const nav = document.querySelector("#navbar");
  nav.innerHTML = top_navbar() + middle_navbar() + bottom_navbar();
  const footer = document.querySelector("#footer");
  footer.innerHTML = getFooter();
  // scroll to top adding
  const scrollAdd = scrollTop();
  scrollAdd(); // calling this will add scroll to top funcion

  const searchAppend = searchCardAppend(); //getting the appending function for search result
  const inputListener = inputSearchEventListener(searchAppend, 700); // searchbar listener from component
  inputListener(); // input listener initialised

  cartItemUpdate(); // Update the cart items

  categoryRequest();
  featuredProductRequest();
  dealsWeekRequest();
  ourBlogRequest();
  ourOfferRequest();
};

async function ourOfferRequest() {
  try {
    const res = await fetch(`${API}/offers?_limit=10`);
    const data = await res.json();
    dealsList = data;
    ourOfferAppend(data);
  } catch (er) {}
}

function ourOfferAppend(list) {
  const append = document.querySelector("#offer_list");
  append.innerHTML = "";
  list.forEach((element, index) => {
    append.append(
      getOfferCard(element, (event) => {
        console.log(event);
      })
    );
  });
  new Splide(".splideOffer", {
    perPage: 2,
    rewind: true,
    breakpoints: {
      1024: {
        perPage: 1,
      },
      767: {
        perPage: 1,
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
}

async function dealsWeekRequest() {
  try {
    const res = await fetch(`${API}/products?_limit=10`);
    const data = await res.json();
    dealsList = data;
    console.log(dealsList);
    dealsWeekAppend(data);
  } catch (er) {}
}

async function ourBlogRequest() {
  try {
    const res = await fetch(`${API}/blogs?_limit=10`);
    const data = await res.json();
    // dealsList = data;
    console.log(data);
    ourBlogAppend(data);
  } catch (er) {}
}

function ourBlogAppend(list) {
  const append = document.querySelector("#blog_list");
  append.innerHTML = "";
  list.forEach((element, index) => {
    append.append(
      getBlogCard(element, (event) => {
        console.log(event);
      })
    );
  });
  new Splide(".splideBlog", {
    // type: "loop",
    // heightRatio: 0.5,
    perPage: 3,
    rewind: true,
    breakpoints: {
      1130: {
        perPage: 1,
      },
      1024: {
        perPage: 1,
      },
      767: {
        perPage: 1,
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
        // p += `<i class="fa-solid fa-star" style="color: #ff8800;"></i>`;
        p += `<i class="fa-solid fa-star" style="color: rgb(243,182,9);"></i>`;
        count++;
      } else {
        p += `<i
                class="fa-regular fa-star fa-sm"
                style="color: rgb(0, 0, 0, 0.6);"></i>`;
      }
    }
    p += `</p>`;
    append.append(
      getDealsWeekCard(
        element,
        p,
        (event) => {
          event.stopPropagation();
          addToCart(element, event);
        },
        (event) => {
          event.stopPropagation();
          localStorage.setItem("product_details", JSON.stringify(element));
          window.location.assign("/details.html");
          // POP UP SHOULD BE here
        }
      )
    );
  });
}

// async function addToCart(element, event) {
//   try {
//     if (
//       localStorage.getItem("logged") != true &&
//       localStorage.getItem("logged") != "true"
//     ) {
//       alert("You need to login first -> Redirecting");
//       window.location.assign("/signin.html");
//       return false;
//     }

//     if (
//       event.target.innerHTML ==
//       'Add to Cart <i class="fa-solid fa-cart-shopping" style="color: #000000;"></i>'
//     ) {
//       event.target.innerHTML = `Add to Cart <i style="margin-left: 2px;" class="fa-solid fa-spinner fa-spin"></i>`;
//     } else if (
//       event.target.innerHTML == "" &&
//       event.target.parentNode.innerHTML ==
//         'Add to Cart <i class="fa-solid fa-cart-shopping" style="color: #000000;"></i>'
//     ) {
//       event.target.parentNode.innerHTML = `Add to Cart <i style="margin-left: 2px;" class="fa-solid fa-spinner fa-spin"></i>`;
//     } else {
//       return false;
//     }

//     const res = await fetch(
//       `${API}/users/${localStorage.getItem("userid") || 1}`
//     );
//     const data = await res.json();

//     let carts = data.cart;
//     carts.push(element);
//     postTheItemToserver(carts);
//     console.log(event.target);
//     if (
//       event.target.innerHTML ==
//       'Add to Cart <i style="margin-left: 2px;" class="fa-solid fa-spinner fa-spin"></i>'
//     ) {
//       event.target.innerHTML = `Add to Cart <i style="margin-left: 5px;" class="fa-solid fa-check" style="color: #000000;"></i>`;
//     } else if (
//       event.target.innerHTML == "" &&
//       event.target.parentNode.innerHTML ==
//         'Add to Cart <i style="margin-left: 2px;" class="fa-solid fa-spinner fa-spin"></i>'
//     ) {
//       event.target.parentNode.innerHTML = `Add to Cart <i style="margin-left: 5px;" class="fa-solid fa-check" style="color: #000000;"></i>`;
//     }
//   } catch (error) {
//     console.error();
//   }
// }

// async function postTheItemToserver(carts) {
//   try {
//     let options = {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         cart: carts,
//       }),
//     };

//     const res = await fetch(
//       `${API}/users/${localStorage.getItem("userid") || 1}`,
//       options
//     );
//     const data = res.json();
//     console.log(data);
//     localStorage.setItem(
//       "cart-total-items",
//       +(localStorage.getItem("cart-total-items") || 0) + 1
//     );
//     cartItemUpdate();
//   } catch (err) {
//     console.error(err);
//   }
// }

async function categoryRequest() {
  try {
    const res = await fetch(`${API}/category`);
    const data = await res.json();
    categoryList = data;
    console.log(categoryList);
    categoryAppend(data);
  } catch (er) {
    console.log(er);
    // if (er.toString().includes("insecure resource")) {
    // document
    //   .querySelector("#navbar")
    //   .insertAdjacentHTML(
    //     "beforebegin",
    //     `<div style="height: fit-content; padding: 20px 20px; margin: auto; text-align:center; color: white; background-color: rgb(185,28,28); font-size: 20px; font-weight: bold; font-family: monospace;">As we are not using HTTPS protocol for our JSON-Server API, You need to allow 'insecure content' in the site setting for this website to load the contents of this site. Thank You.</div>`
    //   );
    // alert(
    //   "As we are not using HTTPS protocol for our JSON-Server API, You need to allow 'insecure content' in the site setting for this website to load the contents of this site. Thank You."
    // );
    // }
  }
}

async function featuredProductRequest() {
  try {
    const res = await fetch(`${API}/featured_products`);
    const data = await res.json();
    featuredList = data;
    console.log(featuredList);
    featuredAppend(data);
  } catch (er) {}
}

function featuredAppend(list) {
  const append = document.querySelector("#feature_list");
  append.innerHTML = "";
  list.forEach((element, index) => {
    append.append(
      getFeaturedCard(element, (event) => {
        // alert("Clicked");
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
      1130: {
        perPage: 1,
      },
      1024: {
        perPage: 1,
      },
      767: {
        perPage: 1,
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
        // alert("Category Clicked");
        console.log(event);
        window.location.assign(
          `/products.html?category=${element.name.toLowerCase()}`
        );
      })
    );
  });
  categorySlide = new Splide(".splideCategory", {
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
  categorySlide.go("+5");
}

function goPrev() {
  categorySlide.go("-5");
}
