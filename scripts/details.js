import {
  top_navbar,
  middle_navbar,
  bottom_navbar,
  inputSearchEventListener,
  cartItemUpdate,
} from "/components/navbar.js";
import { getImages, getThumbnails } from "/components/details_image_card.js";
import { getFooter, scrollTop } from "/components/footer.js";
import API from "/components/api.js";
import { searchCardAppend } from "/components/search_card.js";

window.onload = () => {
  const nav = document.querySelector("#navbar");
  nav.innerHTML = top_navbar() + middle_navbar() + bottom_navbar();
  const footer = document.querySelector("#footer");
  footer.innerHTML = getFooter();
  const scrollAdd = scrollTop();
  scrollAdd(); // calling this will add scroll to top funcion

  const searchAppend = searchCardAppend(); //getting the appending function for search result
  const inputListener = inputSearchEventListener(searchAppend, 700); // searchbar listener from component
  inputListener(); // input listener initialised

  cartItemUpdate(); // Update the cart items

  detailsImageReq();
};

async function detailsImageReq() {
  const product = JSON.parse(localStorage.getItem("product_details"));
  console.log(product);

  const addToC = document.querySelector("#addToCart");
  addToC.addEventListener("click", (event) => {
    addToCart(product, event);
  });

  document.title = product.name;
  const original = document.querySelector("#original");
  const discount = document.querySelector("#discount");

  original.innerHTML = `MRP <span class="strike-through">Rs. ${product.original_price}</span> `;

  discount.innerHTML = `<p>Rs. ${
    product.discounted_price
  } </p><span class="discount">${Math.round(
    ((product.original_price - product.discounted_price) /
      product.original_price) *
      100
  )}% OFF</span>`;

  const category = document.querySelector("#category");
  category.textContent = product.category;

  let p = `<p>`;
  if (product.rating > 5) {
    product.rating = 5;
  }
  if (product.rating_count >= 1000) {
    product.rating_count = (product.rating_count / 1000).toFixed(2) + "k";
  }
  let count = 0;
  for (let i = 0; i < 5; i++) {
    if (count < product.rating) {
      // p += `<i class="fa-solid fa-star" style="color: #ff8800;"></i>`;
      p += `<i class="fa-solid fa-star" style="color: rgb(243,182,9);"></i>`;
      count++;
    } else {
      p += `<i
                class="fa-regular fa-star fa-sm"
                style="color: rgb(0, 0, 0, 0.6);"></i>`;
    }
  }

  if (product.rating_count >= 1000) {
    product.rating_count = (product.rating_count / 1000).toFixed(2) + "k";
  }

  p += ` ${product.rating_count}`;
  p += `</p>`;

  const rating = document.querySelector("#rating");
  rating.innerHTML = p;

  const detail_append = document.querySelector("#detail_append");
  detail_append.innerHTML = product.description.other_specs
    .replace("Other Details", "")
    .replace('<tr><th colspan="2"> </th></tr>', "");

  const hightlights = document.querySelector("#hightlights");
  hightlights.innerHTML = product.description.highlights;

  const specBtn = document.querySelector("#specs");
  const descBtn = document.querySelector("#desc");
  const termsBtn = document.querySelector("#terms");

  specBtn.addEventListener("click", (event) => {
    let arr = [specBtn, descBtn, termsBtn];
    arr.forEach((e) => {
      e.classList.remove("t-active");
    });

    event.target.classList.add("t-active");

    const details_ = document.querySelector("#detail_append");
    details_.innerHTML = product.description.other_specs
      .replace("Other Details", "")
      .replace('<tr><th colspan="2"> </th></tr>', "");
  });

  descBtn.addEventListener("click", (event) => {
    let arr = [specBtn, descBtn, termsBtn];
    arr.forEach((e) => {
      e.classList.remove("t-active");
    });

    event.target.classList.add("t-active");

    const details_ = document.querySelector("#detail_append");
    details_.innerHTML = product.description.description
      .replace("Other Details", "")
      .replace('<tr><th colspan="2"> </th></tr>', "");
  });

  termsBtn.addEventListener("click", (event) => {
    let arr = [specBtn, descBtn, termsBtn];
    arr.forEach((e) => {
      e.classList.remove("t-active");
    });

    event.target.classList.add("t-active");

    const details_ = document.querySelector("#detail_append");
    details_.innerHTML =
      product.description.terms_conditon ||
      "The images represent actual product though color of the image and product may slightly differ.";
  });

  detailsImageAppend(product.small_images);
}

function detailsImageAppend(list) {
  console.log(list);
  const append = document.querySelector("#image_list");
  const thumbnail = document.querySelector("#thumbnail_list");
  append.innerHTML = "";
  thumbnail.innerHTML = "";
  list.forEach((element, index) => {
    append.append(getImages(element, (event) => {}));
    thumbnail.append(getThumbnails(element, (event) => {}));
  });

  var main = new Splide("#details_image_slider", {
    type: "fade",
    heightRatio: 0.5,
    pagination: false,
    arrows: false,
    cover: true,
  });

  var thumbnails = new Splide("#thumbnail-slider", {
    rewind: true,
    fixedWidth: 104,
    fixedHeight: 58,
    isNavigation: true,
    gap: 10,
    focus: "center",
    pagination: false,
    cover: true,
    autoplay: true,
    dragMinThreshold: {
      mouse: 4,
      touch: 10,
    },
    breakpoints: {
      640: {
        fixedWidth: 66,
        fixedHeight: 38,
      },
    },
  });

  main.sync(thumbnails);
  main.mount();
  thumbnails.mount();
}

async function addToCart(element, event) {
  try {
    if (
      localStorage.getItem("logged") != true &&
      localStorage.getItem("logged") != "true"
    ) {
      alert("You need to login first --> Redirecting");
      window.location.assign("/signin.html");
      return false;
    }
    if (
      event.target.innerHTML ==
      'Add to Cart <i class="fa-solid fa-cart-shopping" style="color: #000000;"></i>'
    ) {
      event.target.innerHTML = `Add to Cart <i style="margin-left: 2px;" class="fa-solid fa-spinner fa-spin"></i>`;
    } else if (
      event.target.innerHTML == "" &&
      event.target.parentNode.innerHTML ==
        'Add to Cart <i class="fa-solid fa-cart-shopping" style="color: #000000;"></i>'
    ) {
      event.target.parentNode.innerHTML = `Add to Cart <i style="margin-left: 2px;" class="fa-solid fa-spinner fa-spin"></i>`;
    }

    const res = await fetch(
      `${API}/users/${localStorage.getItem("userid") || 1}`
    );
    const data = await res.json();

    let carts = data.cart;
    element.quantity =
      +document.querySelector("#quantity").value < 1
        ? 1
        : +document.querySelector("#quantity").value;
    carts.push(element);
    localStorage.setItem(
      "cart-total-items",
      +(localStorage.getItem("cart-total-items") || 0) + 1
    );
    cartItemUpdate();
    postTheItemToserver(carts);
    console.log(event.target);
    if (
      event.target.innerHTML ==
      'Add to Cart <i style="margin-left: 2px;" class="fa-solid fa-spinner fa-spin"></i>'
    ) {
      event.target.innerHTML = `Add to Cart <i style="margin-left: 5px;" class="fa-solid fa-check" style="color: #000000;"></i>`;
    } else if (
      event.target.innerHTML == "" &&
      event.target.parentNode.innerHTML ==
        'Add to Cart <i style="margin-left: 2px;" class="fa-solid fa-spinner fa-spin"></i>'
    ) {
      event.target.parentNode.innerHTML = `Add to Cart <i style="margin-left: 5px;" class="fa-solid fa-check" style="color: #000000;"></i>`;
    }
  } catch (error) {
    console.error();
  }
}

async function postTheItemToserver(carts) {
  try {
    let options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: carts,
      }),
    };

    const res = await fetch(
      `${API}/users/${localStorage.getItem("userid") || 1}`,
      options
    );
    const data = res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
