import {
  top_navbar,
  middle_navbar,
  bottom_navbar,
  inputSearchEventListener,
  cartItemUpdate,
} from "/components/navbar.js";
import { getFooter, scrollTop } from "/components/footer.js";
import API from "/components/api.js";
import { searchCardAppend } from "/components/search_card.js";
import getProductCards from "/components/product_card.js";
import addToCart from "../components/add_to_cart.js";

let productList = [];
let selectArray = [];

let currentRating = 0;
let currentDiscount = 0;
let currentPrice = 0;

let pages = 0;
let currentPage = 1;

let url = document.location.search.replace("?", "");
console.log(url);
if (url.includes("=")) {
  let category_query = url.split("=");
  console.log(category_query);
  if (category_query[0] == "category") {
    document.addEventListener("DOMContentLoaded", () => {
      const product_heading = document.querySelector("#title");
      product_heading.textContent = `Category : ${category_query[1]
        .toUpperCase()
        .split("%20")
        .join(" ")}`;
      productRequest(`?category=${category_query[1]}`);
    });
  } else if (category_query[0] == "search") {
    console.log("I am search");
    document.addEventListener("DOMContentLoaded", () => {
      console.log("I am running");
      const product_heading = document.querySelector("#title");
      console.log(product_heading);
      product_heading.textContent = `Search result for : '${category_query[1]
        .split("%20")
        .join(" ")}'`;
      productRequest(`?q=${category_query[1]}`);
    });
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      const product_heading = document.querySelector("#title");
      product_heading.textContent = `All Products`;
      productRequest();
    });
  }
} else {
  document.addEventListener("DOMContentLoaded", () => {
    const product_heading = document.querySelector("#title");
    product_heading.textContent = `All Products`;
    productRequest();
  });
}

window.onload = () => {
  const nav = document.querySelector("#navbar");
  nav.innerHTML = top_navbar() + middle_navbar() + bottom_navbar();
  const footer = document.querySelector("#footer");
  footer.innerHTML = getFooter();
  // scroll to top adding
  const scrollAdd = scrollTop();
  scrollAdd(); // calling this will add scroll to top funcion

  const searchAppend = searchCardAppend(); //getting the appending function for search result
  const inputListener = inputSearchEventListener(searchAppend, 400); // searchbar listener from component
  inputListener(); // input listener initialised

  cartItemUpdate(); // Update the cart items

  filterFunction();
  sideBarRatingFunction();
  sideBarDiscoundFunction();
  sideBarPriceFunction();
};

function sideBarDiscoundFunction() {
  const rf = document.getElementById("10to20");
  const rs = document.getElementById("21to30");
  const rt = document.getElementById("31to40");
  const rr = document.getElementById("41to50");
  const nf = document.getElementById("no_discount");

  nf.addEventListener("click", (event) => {
    const ar = [nf, rf, rs, rt, rr];
    ar.forEach((element) => {
      element.childNodes[1].classList.remove("checkedcheck");
    });

    nf.childNodes[1].classList.add("checkedcheck");

    // productAppend(productList);

    selectArray = productList.filter((element) => {
      // let original = element.original_price;
      // let discount = element.discounted_price;

      currentDiscount = 0;

      let return_value = true;

      if (currentRating != -1) {
        if (currentRating == 4) {
          return_value = return_value && element.rating >= 4;
        }
        if (currentRating == 3) {
          return_value = return_value && element.rating >= 3;
        }
        if (currentRating == 2) {
          return_value = return_value && element.rating >= 2;
        }
        if (currentRating == 1) {
          return_value = return_value && element.rating >= 1;
        }
        if (currentRating == 0) {
          return_value = return_value && element.rating >= 0;
        }
      }

      if (currentPrice != 0) {
        if (currentPrice == 100) {
          return_value =
            return_value &&
            element.discounted_price >= 0 &&
            element.discounted_price <= 100;
        }

        if (currentPrice == 200) {
          return_value =
            return_value &&
            element.discounted_price >= 101 &&
            element.discounted_price <= 200;
        }

        if (currentPrice == 300) {
          return_value =
            return_value &&
            element.discounted_price >= 201 &&
            element.discounted_price <= 300;
        }

        if (currentPrice == 400) {
          return_value = return_value && element.discounted_price >= 301;
        }
      }

      return return_value;
    });

    productAppend(selectArray);
  });

  rf.addEventListener("click", (event) => {
    const ar = [nf, rf, rs, rt, rr];
    ar.forEach((element) => {
      element.childNodes[1].classList.remove("checkedcheck");
    });

    rf.childNodes[1].classList.add("checkedcheck");

    const [...rest] = productList;

    selectArray = rest.filter((element) => {
      let original = element.original_price;
      let discount = element.discounted_price;

      currentDiscount = 10;

      let dis = ((original - discount) / original) * 100;
      console.log(dis);

      let return_value = dis >= 10 && dis <= 30;

      if (currentRating != -1) {
        if (currentRating == 4) {
          return_value = return_value && element.rating >= 4;
        }
        if (currentRating == 3) {
          return_value = return_value && element.rating >= 3;
        }
        if (currentRating == 2) {
          return_value = return_value && element.rating >= 2;
        }
        if (currentRating == 1) {
          return_value = return_value && element.rating >= 1;
        }
        if (currentRating == 0) {
          return_value = return_value && element.rating >= 0;
        }
      }

      if (currentPrice != 0) {
        if (currentPrice == 100) {
          return_value =
            return_value &&
            element.discounted_price >= 0 &&
            element.discounted_price <= 100;
        }

        if (currentPrice == 200) {
          return_value =
            return_value &&
            element.discounted_price >= 101 &&
            element.discounted_price <= 200;
        }

        if (currentPrice == 300) {
          return_value =
            return_value &&
            element.discounted_price >= 201 &&
            element.discounted_price <= 300;
        }

        if (currentPrice == 400) {
          return_value = return_value && element.discounted_price >= 301;
        }
      }

      return return_value;
    });

    productAppend(selectArray);
  });

  rs.addEventListener("click", (event) => {
    const ar = [nf, rf, rs, rt, rr];
    ar.forEach((element) => {
      element.childNodes[1].classList.remove("checkedcheck");
    });

    rs.childNodes[1].classList.add("checkedcheck");

    const [...rest] = productList;

    selectArray = rest.filter((element) => {
      let original = element.original_price;
      let discount = element.discounted_price;

      currentDiscount = 31;

      let dis = ((original - discount) / original) * 100;
      console.log(dis);

      let return_value = dis >= 31 && dis <= 50;

      if (currentRating != -1) {
        if (currentRating == 4) {
          return_value = return_value && element.rating >= 4;
        }
        if (currentRating == 3) {
          return_value = return_value && element.rating >= 3;
        }
        if (currentRating == 2) {
          return_value = return_value && element.rating >= 2;
        }
        if (currentRating == 1) {
          return_value = return_value && element.rating >= 1;
        }
        if (currentRating == 0) {
          return_value = return_value && element.rating >= 0;
        }
      }

      if (currentPrice != 0) {
        if (currentPrice == 100) {
          return_value =
            return_value &&
            element.discounted_price >= 0 &&
            element.discounted_price <= 100;
        }

        if (currentPrice == 200) {
          return_value =
            return_value &&
            element.discounted_price >= 101 &&
            element.discounted_price <= 200;
        }

        if (currentPrice == 300) {
          return_value =
            return_value &&
            element.discounted_price >= 201 &&
            element.discounted_price <= 300;
        }

        if (currentPrice == 400) {
          return_value = return_value && element.discounted_price >= 301;
        }
      }

      return return_value;
    });

    productAppend(selectArray);
  });

  rt.addEventListener("click", (event) => {
    const ar = [nf, rf, rs, rt, rr];
    ar.forEach((element) => {
      element.childNodes[1].classList.remove("checkedcheck");
    });

    rt.childNodes[1].classList.add("checkedcheck");

    const [...rest] = productList;

    selectArray = rest.filter((element) => {
      let original = element.original_price;
      let discount = element.discounted_price;

      currentDiscount = 51;

      let dis = ((original - discount) / original) * 100;
      console.log(dis);

      let return_value = dis >= 51 && dis <= 70;

      if (currentRating != -1) {
        if (currentRating == 4) {
          return_value = return_value && element.rating >= 4;
        }
        if (currentRating == 3) {
          return_value = return_value && element.rating >= 3;
        }
        if (currentRating == 2) {
          return_value = return_value && element.rating >= 2;
        }
        if (currentRating == 1) {
          return_value = return_value && element.rating >= 1;
        }
        if (currentRating == 0) {
          return_value = return_value && element.rating >= 0;
        }
      }

      if (currentPrice != 0) {
        if (currentPrice == 100) {
          return_value =
            return_value &&
            element.discounted_price >= 0 &&
            element.discounted_price <= 100;
        }

        if (currentPrice == 200) {
          return_value =
            return_value &&
            element.discounted_price >= 101 &&
            element.discounted_price <= 200;
        }

        if (currentPrice == 300) {
          return_value =
            return_value &&
            element.discounted_price >= 201 &&
            element.discounted_price <= 300;
        }

        if (currentPrice == 400) {
          return_value = return_value && element.discounted_price >= 301;
        }
      }

      return return_value;
    });

    productAppend(selectArray);
  });

  rr.addEventListener("click", (event) => {
    const ar = [nf, rf, rs, rt, rr];
    ar.forEach((element) => {
      element.childNodes[1].classList.remove("checkedcheck");
    });

    rr.childNodes[1].classList.add("checkedcheck");

    const [...rest] = productList;

    selectArray = rest.filter((element) => {
      let original = element.original_price;
      let discount = element.discounted_price;

      currentDiscount = 71;

      let dis = ((original - discount) / original) * 100;
      console.log(dis);

      let return_value = dis >= 71 && dis <= 100;

      if (currentRating != -1) {
        if (currentRating == 4) {
          return_value = return_value && element.rating >= 4;
        }
        if (currentRating == 3) {
          return_value = return_value && element.rating >= 3;
        }
        if (currentRating == 2) {
          return_value = return_value && element.rating >= 2;
        }
        if (currentRating == 1) {
          return_value = return_value && element.rating >= 1;
        }
        if (currentRating == 0) {
          return_value = return_value && element.rating >= 0;
        }
      }

      if (currentPrice != 0) {
        if (currentPrice == 100) {
          return_value =
            return_value &&
            element.discounted_price >= 0 &&
            element.discounted_price <= 100;
        }

        if (currentPrice == 200) {
          return_value =
            return_value &&
            element.discounted_price >= 101 &&
            element.discounted_price <= 200;
        }

        if (currentPrice == 300) {
          return_value =
            return_value &&
            element.discounted_price >= 201 &&
            element.discounted_price <= 300;
        }

        if (currentPrice == 400) {
          return_value = return_value && element.discounted_price >= 301;
        }
      }

      return return_value;
    });

    productAppend(selectArray);
  });
}

function sideBarRatingFunction() {
  const rf = document.getElementById("4andUp");
  const rs = document.getElementById("3andUp");
  const rt = document.getElementById("2andUp");
  const rr = document.getElementById("1andUp");
  const nf = document.getElementById("none");
  const rl = document.getElementById("0andUp");

  nf.addEventListener("click", (event) => {
    const ar = [nf, rf, rs, rt, rr, rl];
    ar.forEach((element) => {
      element.childNodes[1].classList.remove("checkedcheck");
    });

    nf.childNodes[1].classList.add("checkedcheck");

    selectArray = productList.filter((element) => {
      currentRating = -1;

      let return_value = true;

      if (currentPrice != 0) {
        if (currentPrice == 100) {
          return_value =
            return_value &&
            element.discounted_price >= 0 &&
            element.discounted_price <= 100;
        }

        if (currentPrice == 200) {
          return_value =
            return_value &&
            element.discounted_price >= 101 &&
            element.discounted_price <= 200;
        }

        if (currentPrice == 300) {
          return_value =
            return_value &&
            element.discounted_price >= 201 &&
            element.discounted_price <= 300;
        }

        if (currentPrice == 400) {
          return_value = return_value && element.discounted_price >= 301;
        }
      }

      let original = element.original_price;
      let discount = element.discounted_price;

      let dis = ((original - discount) / original) * 100;
      console.log(dis);

      if (currentDiscount != 0) {
        if (currentDiscount == 10) {
          return_value = return_value && dis <= 30;
        }
        if (currentDiscount == 31) {
          return_value = return_value && dis >= 31 && dis <= 50;
        }
        if (currentDiscount == 51) {
          return_value = return_value && dis >= 51 && dis <= 70;
        }
        if (currentDiscount == 71) {
          return_value = return_value && dis >= 71 && dis <= 100;
        }
      }

      return return_value;
    });

    productAppend(selectArray);
  });

  rf.addEventListener("click", (event) => {
    const ar = [nf, rf, rs, rt, rr, rl];
    ar.forEach((element) => {
      element.childNodes[1].classList.remove("checkedcheck");
    });

    rf.childNodes[1].classList.add("checkedcheck");

    const [...rest] = productList;

    selectArray = productList.filter((element) => {
      currentRating = 4;

      let return_value = element.rating >= 4;

      if (currentPrice != 0) {
        if (currentPrice == 100) {
          return_value =
            return_value &&
            element.discounted_price >= 0 &&
            element.discounted_price <= 100;
        }

        if (currentPrice == 200) {
          return_value =
            return_value &&
            element.discounted_price >= 101 &&
            element.discounted_price <= 200;
        }

        if (currentPrice == 300) {
          return_value =
            return_value &&
            element.discounted_price >= 201 &&
            element.discounted_price <= 300;
        }

        if (currentPrice == 400) {
          return_value = return_value && element.discounted_price >= 301;
        }
      }

      let original = element.original_price;
      let discount = element.discounted_price;

      let dis = ((original - discount) / original) * 100;
      console.log(dis);

      if (currentDiscount != 0) {
        if (currentDiscount == 10) {
          return_value = return_value && dis <= 30;
        }
        if (currentDiscount == 31) {
          return_value = return_value && dis >= 31 && dis <= 50;
        }
        if (currentDiscount == 51) {
          return_value = return_value && dis >= 51 && dis <= 70;
        }
        if (currentDiscount == 71) {
          return_value = return_value && dis >= 71 && dis <= 100;
        }
      }

      return return_value;
    });

    productAppend(selectArray);
  });

  rs.addEventListener("click", (event) => {
    const ar = [nf, rf, rs, rt, rr, rl];
    ar.forEach((element) => {
      element.childNodes[1].classList.remove("checkedcheck");
    });

    rs.childNodes[1].classList.add("checkedcheck");

    const [...rest] = productList;

    selectArray = productList.filter((element) => {
      currentRating = 3;

      let return_value = element.rating >= 3;

      if (currentPrice != 0) {
        if (currentPrice == 100) {
          return_value =
            return_value &&
            element.discounted_price >= 0 &&
            element.discounted_price <= 100;
        }

        if (currentPrice == 200) {
          return_value =
            return_value &&
            element.discounted_price >= 101 &&
            element.discounted_price <= 200;
        }

        if (currentPrice == 300) {
          return_value =
            return_value &&
            element.discounted_price >= 201 &&
            element.discounted_price <= 300;
        }

        if (currentPrice == 400) {
          return_value = return_value && element.discounted_price >= 301;
        }
      }

      let original = element.original_price;
      let discount = element.discounted_price;

      let dis = ((original - discount) / original) * 100;
      console.log(dis);

      if (currentDiscount != 0) {
        if (currentDiscount == 10) {
          return_value = return_value && dis <= 30;
        }
        if (currentDiscount == 31) {
          return_value = return_value && dis >= 31 && dis <= 50;
        }
        if (currentDiscount == 51) {
          return_value = return_value && dis >= 51 && dis <= 70;
        }
        if (currentDiscount == 71) {
          return_value = return_value && dis >= 71 && dis <= 100;
        }
      }

      return return_value;
    });

    productAppend(selectArray);
  });

  rt.addEventListener("click", (event) => {
    const ar = [nf, rf, rs, rt, rr, rl];
    ar.forEach((element) => {
      element.childNodes[1].classList.remove("checkedcheck");
    });

    rt.childNodes[1].classList.add("checkedcheck");

    const [...rest] = productList;

    selectArray = productList.filter((element) => {
      currentRating = 2;

      let return_value = element.rating >= 2;

      if (currentPrice != 0) {
        if (currentPrice == 100) {
          return_value =
            return_value &&
            element.discounted_price >= 0 &&
            element.discounted_price <= 100;
        }

        if (currentPrice == 200) {
          return_value =
            return_value &&
            element.discounted_price >= 101 &&
            element.discounted_price <= 200;
        }

        if (currentPrice == 300) {
          return_value =
            return_value &&
            element.discounted_price >= 201 &&
            element.discounted_price <= 300;
        }

        if (currentPrice == 400) {
          return_value = return_value && element.discounted_price >= 301;
        }
      }

      let original = element.original_price;
      let discount = element.discounted_price;

      let dis = ((original - discount) / original) * 100;
      console.log(dis);

      if (currentDiscount != 0) {
        if (currentDiscount == 10) {
          return_value = return_value && dis <= 30;
        }
        if (currentDiscount == 31) {
          return_value = return_value && dis >= 31 && dis <= 50;
        }
        if (currentDiscount == 51) {
          return_value = return_value && dis >= 51 && dis <= 70;
        }
        if (currentDiscount == 71) {
          return_value = return_value && dis >= 71 && dis <= 100;
        }
      }

      return return_value;
    });

    productAppend(selectArray);
  });

  rr.addEventListener("click", (event) => {
    const ar = [nf, rf, rs, rt, rr, rl];
    ar.forEach((element) => {
      element.childNodes[1].classList.remove("checkedcheck");
    });

    rr.childNodes[1].classList.add("checkedcheck");

    const [...rest] = productList;

    selectArray = productList.filter((element) => {
      currentRating = 1;

      let return_value = element.rating >= 1;

      if (currentPrice != 0) {
        if (currentPrice == 100) {
          return_value =
            return_value &&
            element.discounted_price >= 0 &&
            element.discounted_price <= 100;
        }

        if (currentPrice == 200) {
          return_value =
            return_value &&
            element.discounted_price >= 101 &&
            element.discounted_price <= 200;
        }

        if (currentPrice == 300) {
          return_value =
            return_value &&
            element.discounted_price >= 201 &&
            element.discounted_price <= 300;
        }

        if (currentPrice == 400) {
          return_value = return_value && element.discounted_price >= 301;
        }
      }

      let original = element.original_price;
      let discount = element.discounted_price;

      let dis = ((original - discount) / original) * 100;
      console.log(dis);

      if (currentDiscount != 0) {
        if (currentDiscount == 10) {
          return_value = return_value && dis <= 30;
        }
        if (currentDiscount == 31) {
          return_value = return_value && dis >= 31 && dis <= 50;
        }
        if (currentDiscount == 51) {
          return_value = return_value && dis >= 51 && dis <= 70;
        }
        if (currentDiscount == 71) {
          return_value = return_value && dis >= 71 && dis <= 100;
        }
      }

      return return_value;
    });

    productAppend(selectArray);
  });

  rl.addEventListener("click", (event) => {
    const ar = [nf, rf, rs, rt, rr, rl];
    ar.forEach((element) => {
      element.childNodes[1].classList.remove("checkedcheck");
    });

    rl.childNodes[1].classList.add("checkedcheck");

    const [...rest] = productList;
    selectArray = productList.filter((element) => {
      currentRating = 0;

      let return_value = true;

      if (currentPrice != 0) {
        if (currentPrice == 100) {
          return_value =
            return_value &&
            element.discounted_price >= 0 &&
            element.discounted_price <= 100;
        }

        if (currentPrice == 200) {
          return_value =
            return_value &&
            element.discounted_price >= 101 &&
            element.discounted_price <= 200;
        }

        if (currentPrice == 300) {
          return_value =
            return_value &&
            element.discounted_price >= 201 &&
            element.discounted_price <= 300;
        }

        if (currentPrice == 400) {
          return_value = return_value && element.discounted_price >= 301;
        }
      }

      let original = element.original_price;
      let discount = element.discounted_price;

      let dis = ((original - discount) / original) * 100;
      console.log(dis);

      if (currentDiscount != 0) {
        if (currentDiscount == 10) {
          return_value = return_value && dis <= 30;
        }
        if (currentDiscount == 31) {
          return_value = return_value && dis >= 31 && dis <= 50;
        }
        if (currentDiscount == 51) {
          return_value = return_value && dis >= 51 && dis <= 70;
        }
        if (currentDiscount == 71) {
          return_value = return_value && dis >= 71 && dis <= 100;
        }
      }

      return return_value;
    });

    productAppend(selectArray);
  });
}

function sideBarPriceFunction() {
  const rf = document.getElementById("0to100");
  const rs = document.getElementById("101to200");
  const rt = document.getElementById("201to300");
  const rr = document.getElementById("301toAbove");
  const nf = document.getElementById("no_price");

  nf.addEventListener("click", (event) => {
    const ar = [nf, rf, rs, rt, rr];
    ar.forEach((element) => {
      element.childNodes[1].classList.remove("checkedcheck");
    });

    nf.childNodes[1].classList.add("checkedcheck");

    selectArray = productList.filter((element) => {
      currentPrice = 0;

      let return_value = true;

      if (currentRating != -1) {
        if (currentRating == 4) {
          return_value = return_value && element.rating >= 4;
        }
        if (currentRating == 3) {
          return_value = return_value && element.rating >= 3;
        }
        if (currentRating == 2) {
          return_value = return_value && element.rating >= 2;
        }
        if (currentRating == 1) {
          return_value = return_value && element.rating >= 1;
        }
        if (currentRating == 0) {
          return_value = return_value && element.rating >= 0;
        }
      }

      let original = element.original_price;
      let discount = element.discounted_price;

      let dis = ((original - discount) / original) * 100;
      console.log(dis);

      if (currentDiscount != 0) {
        if (currentDiscount == 10) {
          return_value = return_value && dis <= 30;
        }
        if (currentDiscount == 31) {
          return_value = return_value && dis >= 31 && dis <= 50;
        }
        if (currentDiscount == 51) {
          return_value = return_value && dis >= 51 && dis <= 70;
        }
        if (currentDiscount == 71) {
          return_value = return_value && dis >= 71 && dis <= 100;
        }
      }

      return return_value;
    });

    productAppend(selectArray);
  });

  rf.addEventListener("click", (event) => {
    const ar = [nf, rf, rs, rt, rr];
    ar.forEach((element) => {
      element.childNodes[1].classList.remove("checkedcheck");
    });

    rf.childNodes[1].classList.add("checkedcheck");

    const [...rest] = productList;

    selectArray = productList.filter((element) => {
      currentPrice = 100;

      let return_value = element.discounted_price <= 100;

      if (currentRating != -1) {
        if (currentRating == 4) {
          return_value = return_value && element.rating >= 4;
        }
        if (currentRating == 3) {
          return_value = return_value && element.rating >= 3;
        }
        if (currentRating == 2) {
          return_value = return_value && element.rating >= 2;
        }
        if (currentRating == 1) {
          return_value = return_value && element.rating >= 1;
        }
        if (currentRating == 0) {
          return_value = return_value && element.rating >= 0;
        }
      }

      let original = element.original_price;
      let discount = element.discounted_price;

      let dis = ((original - discount) / original) * 100;
      console.log(dis);

      if (currentDiscount != 0) {
        if (currentDiscount == 10) {
          return_value = return_value && dis <= 30;
        }
        if (currentDiscount == 31) {
          return_value = return_value && dis >= 31 && dis <= 50;
        }
        if (currentDiscount == 51) {
          return_value = return_value && dis >= 51 && dis <= 70;
        }
        if (currentDiscount == 71) {
          return_value = return_value && dis >= 71 && dis <= 100;
        }
      }

      return return_value;
    });

    productAppend(selectArray);
  });

  rs.addEventListener("click", (event) => {
    const ar = [nf, rf, rs, rt, rr];
    ar.forEach((element) => {
      element.childNodes[1].classList.remove("checkedcheck");
    });

    rs.childNodes[1].classList.add("checkedcheck");

    const [...rest] = productList;

    selectArray = productList.filter((element) => {
      currentPrice = 200;

      let return_value =
        element.discounted_price >= 101 && element.discounted_price <= 200;

      if (currentRating != -1) {
        if (currentRating == 4) {
          return_value = return_value && element.rating >= 4;
        }
        if (currentRating == 3) {
          return_value = return_value && element.rating >= 3;
        }
        if (currentRating == 2) {
          return_value = return_value && element.rating >= 2;
        }
        if (currentRating == 1) {
          return_value = return_value && element.rating >= 1;
        }
        if (currentRating == 0) {
          return_value = return_value && element.rating >= 0;
        }
      }

      let original = element.original_price;
      let discount = element.discounted_price;

      let dis = ((original - discount) / original) * 100;
      console.log(dis);

      if (currentDiscount != 0) {
        if (currentDiscount == 10) {
          return_value = return_value && dis <= 30;
        }
        if (currentDiscount == 31) {
          return_value = return_value && dis >= 31 && dis <= 50;
        }
        if (currentDiscount == 51) {
          return_value = return_value && dis >= 51 && dis <= 70;
        }
        if (currentDiscount == 71) {
          return_value = return_value && dis >= 71 && dis <= 100;
        }
      }

      return return_value;
    });

    productAppend(selectArray);
  });

  rt.addEventListener("click", (event) => {
    const ar = [nf, rf, rs, rt, rr];
    ar.forEach((element) => {
      element.childNodes[1].classList.remove("checkedcheck");
    });

    rt.childNodes[1].classList.add("checkedcheck");

    const [...rest] = productList;

    selectArray = productList.filter((element) => {
      currentPrice = 300;

      let return_value =
        element.discounted_price >= 201 && element.discounted_price <= 300;

      if (currentRating != -1) {
        if (currentRating == 4) {
          return_value = return_value && element.rating >= 4;
        }
        if (currentRating == 3) {
          return_value = return_value && element.rating >= 3;
        }
        if (currentRating == 2) {
          return_value = return_value && element.rating >= 2;
        }
        if (currentRating == 1) {
          return_value = return_value && element.rating >= 1;
        }
        if (currentRating == 0) {
          return_value = return_value && element.rating >= 0;
        }
      }

      let original = element.original_price;
      let discount = element.discounted_price;

      let dis = ((original - discount) / original) * 100;
      console.log(dis);

      if (currentDiscount != 0) {
        if (currentDiscount == 10) {
          return_value = return_value && dis <= 30;
        }
        if (currentDiscount == 31) {
          return_value = return_value && dis >= 31 && dis <= 50;
        }
        if (currentDiscount == 51) {
          return_value = return_value && dis >= 51 && dis <= 70;
        }
        if (currentDiscount == 71) {
          return_value = return_value && dis >= 71 && dis <= 100;
        }
      }

      return return_value;
    });

    productAppend(selectArray);
  });

  rr.addEventListener("click", (event) => {
    const ar = [nf, rf, rs, rt, rr];
    ar.forEach((element) => {
      element.childNodes[1].classList.remove("checkedcheck");
    });

    rr.childNodes[1].classList.add("checkedcheck");

    const [...rest] = productList;

    selectArray = productList.filter((element) => {
      currentPrice = 400;

      let return_value = element.discounted_price >= 301;

      if (currentRating != -1) {
        if (currentRating == 4) {
          return_value = return_value && element.rating >= 4;
        }
        if (currentRating == 3) {
          return_value = return_value && element.rating >= 3;
        }
        if (currentRating == 2) {
          return_value = return_value && element.rating >= 2;
        }
        if (currentRating == 1) {
          return_value = return_value && element.rating >= 1;
        }
        if (currentRating == 0) {
          return_value = return_value && element.rating >= 0;
        }
      }

      let original = element.original_price;
      let discount = element.discounted_price;

      let dis = ((original - discount) / original) * 100;
      console.log(dis);

      if (currentDiscount != 0) {
        if (currentDiscount == 10) {
          return_value = return_value && dis <= 30;
        }
        if (currentDiscount == 31) {
          return_value = return_value && dis >= 31 && dis <= 50;
        }
        if (currentDiscount == 51) {
          return_value = return_value && dis >= 51 && dis <= 70;
        }
        if (currentDiscount == 71) {
          return_value = return_value && dis >= 71 && dis <= 100;
        }
      }

      return return_value;
    });

    productAppend(selectArray);
  });
}

function filterFunction() {
  const filter = document.querySelector("#filter");
  filter.addEventListener("click", () => {
    document.querySelector("#filter_black").style.display = "block";
    document.querySelector("#filter_pop").style.display = "block";
  });

  document.querySelector("#filter_black").addEventListener("click", () => {
    document.querySelector("#filter_black").style.display = "none";
    document.querySelector("#filter_pop").style.display = "none";
  });

  document.querySelector("#close_filter").addEventListener("click", () => {
    document.querySelector("#filter_black").style.display = "none";
    document.querySelector("#filter_pop").style.display = "none";
  });

  const sort_ = document.querySelector("#sort");
  sort_.addEventListener("change", (event) => {
    const [...rest] = selectArray;
    switch (event.target.value) {
      case "asc":
        productAppend(
          rest.sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          })
        );
        break;
      case "desc":
        productAppend(
          rest.sort(function (a, b) {
            if (a.name < b.name) {
              return 1;
            } else if (a.name > b.name) {
              return -1;
            } else {
              return 0;
            }
          })
        );
        break;
      case "htl":
        productAppend(
          rest.sort(function (a, b) {
            return b.discounted_price - a.discounted_price;
          })
        );
        break;
      case "lth":
        productAppend(
          rest.sort(function (a, b) {
            return a.discounted_price - b.discounted_price;
          })
        );
        break;
      default:
        productAppend(selectArray);
    }
  });
}

async function productRequest(query = "?_limit=10") {
  const res = await fetch(`${API}/products${query}`);
  const data = await res.json();
  // dealsList = data;
  productList = data;
  selectArray = data;
  console.log(data);

  if (data.length == 0 || data == null) {
    const select = document.querySelector("#sort");
    select.style.display = "none";
    document.querySelector("#filter").style.display = "none";
    const append = document.querySelector("#list");
    append.classList.add("center");
    append.innerHTML = `<img style="height: 300px; display: block;" src="https://cdni.iconscout.com/illustration/premium/thumb/confusing-woman-due-to-empty-cart-4558760-3780056.png"><h3 style="color: rgb(255,142,85)">No items found</h3>`;
    return false;
  }
  productAppend(data);
}

function productAppend(list, start = 0) {
  paginationUpdate(list);
  const append = document.querySelector("#list");
  append.innerHTML = "";
  const select = document.querySelector("#sort");

  console.log(list);

  select.style.display = "inline-block";

  // list.forEach((element, index) => {

  let end = start + 10 > list.length ? list.length : start + 10;

  for (let i = start; i < end; i++) {
    let element = list[i];
    console.log("Append for loop => ", i, element);

    let p = `<p>`;

    if (element.rating || element.rating > 5) {
      element.rating = 5;
    }
    // element.rating = 3;
    if (element.rating_count >= 1000) {
      element.rating_count = (element.rating_count / 1000).toFixed(2) + "k";
    }

    let count = 0;
    for (let i = 0; i < 5; i++) {
      if (count < element.rating) {
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
      getProductCards(
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
  }
  // });
}

function paginationUpdate(data, currentPage = 1) {
  let number = Math.floor(data.length / 10);
  pages = number;

  document.querySelector(
    "#pagination"
  ).innerHTML = `<div id="prev_p" class="prev_page">
      <i class="fa-solid fa-chevron-left" style="color: #000000;"></i>
    </div>
    <div class="page_number">
      ${currentPage} / ${number}
    </div>
    <div id="next_p" class="next_page">
      <i class="fa-solid fa-chevron-right" style="color: #000000;"></i>
    </div>`;

  document.querySelector("#prev_p").addEventListener("click", () => {
    currentPage -= 1;
    if (currentPage < 1) {
      currentPage = 1;
      return;
    }
    productAppend(productList, currentPage * 10);
    return paginationUpdate(data, currentPage);
  });

  document.querySelector("#next_p").addEventListener("click", () => {
    currentPage += 1;
    if (currentPage > number) {
      currentPage = number;
      return;
    }
    productAppend(productList, currentPage * 10);
    return paginationUpdate(data, currentPage);
  });
}
