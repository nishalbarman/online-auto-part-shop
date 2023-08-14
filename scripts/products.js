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

let productList = [];
let selectArray = [];

let currentRating = 0;
let currentDiscount = 0;
let currentPrice = 0;

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
        .replace("%20", " ")}`;
      productRequest(`?category=${category_query[1]}`);
    });
  } else if (category_query[0] == "search") {
    console.log("I am search");
    document.addEventListener("DOMContentLoaded", () => {
      console.log("I am running");
      const product_heading = document.querySelector("#title");
      console.log(product_heading);
      product_heading.textContent = `Search result for : '${category_query[1].replace(
        "%20",
        " "
      )}'`;
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
  nav.innerHTML = top_navbar() + middle_navbar();
  const footer = document.querySelector("#footer");
  footer.innerHTML = getFooter();
  // scroll to top adding
  const scrollAdd = scrollTop();
  scrollAdd(); // calling this will add scroll to top funcion

  const searchAppend = searchCardAppend(); //getting the appending function for search result
  const inputListener = inputSearchEventListener(searchAppend, 400); // searchbar listener from component
  inputListener(); // input listener initialised

  // cartItemUpdate(); // Update the cart items

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
  productAppend(data);
}

function productAppend(list) {
  const append = document.querySelector("#list");
  append.innerHTML = "";
  const select = document.querySelector("#sort");

  console.log(list);

  if (list.length == 0 || list == null) {
    const product_heading = document.querySelector("#title");
    product_heading.textContent = `No items found`;
    select.style.display = "none";
    return false;
  }

  select.style.display = "inline-block";

  list.forEach((element, index) => {
    let p = `<p>`;

    if (element.rating > 5) {
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
      getProductCards(element, p, (event) => {
        addToCart(element, event);
        // if (
        //   event.target.innerHTML ==
        //   'Add to Cart <i class="fa-solid fa-cart-shopping" style="color: #000000;"></i>'
        // ) {
        //   event.target.innerHTML = `Add to Cart <i style="margin-left: 5px;" class="fa-solid fa-check" style="color: #000000;"></i>`;
        // } else if (
        //   event.target.innerHTML == "" &&
        //   event.target.parentNode.innerHTML ==
        //     'Add to Cart <i class="fa-solid fa-cart-shopping" style="color: #000000;"></i>'
        // ) {
        //   event.target.parentNode.innerHTML = `Add to Cart <i style="margin-left: 5px;" class="fa-solid fa-check" style="color: #000000;"></i>`;
        // }
        // fetch(`${API}/users/${localStorage.getItem("userid") || 1}`)
        //   .then((res) => {
        //     return res.json();
        //   })
        //   .then((data) => {
        // let carts = data.cart;
        // carts.push(element);
        // let options = {
        //   method: "PATCH",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     cart: carts,
        //   }),
        // };
        // fetch(
        //   `${API}/users/${localStorage.getItem("userid") || 1}`,
        //   options
        // )
        //   .then((res) => {
        //     return res.json();
        //   })
        //   .then((data) => {
        //     localStorage.setItem(
        //       "cart-total-items",
        //       +(localStorage.getItem("cart-total-items") || 0) + 1
        //       );
        //       cartItemUpdate();
        //     });
        // })
        // .catch((error) => {});
      })
    );
  });
}

async function addToCart(element, event) {
  try {
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
    carts.push(element);
    localStorage.setItem(
      "cart-total-items",
      +(localStorage.getItem("cart-total-items") || 0) + 1
    );
    cartItemUpdate();
    postTheItemToserver(carts);
    console.log(event.target);
    // if (
    //   event.target.innerHTML ==
    //   'Add to Cart <i class="fa-solid fa-cart-shopping" style="color: #000000;"></i>'
    // ) {
    //   event.target.innerHTML = `Add to Cart <i style="margin-left: 5px;" class="fa-solid fa-check" style="color: #000000;"></i>`;
    // } else if (
    //   event.target.innerHTML == "" &&
    //   event.target.parentNode.innerHTML ==
    //     'Add to Cart <i class="fa-solid fa-cart-shopping" style="color: #000000;"></i>'
    // ) {
    //   event.target.parentNode.innerHTML = `Add to Cart <i style="margin-left: 5px;" class="fa-solid fa-check" style="color: #000000;"></i>`;
    // }
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

    const res = await fetch(`${API}/users/1`, options);
    const data = res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
