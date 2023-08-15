import {
  top_navbar,
  middle_navbar,
  bottom_navbar,
  inputSearchEventListener,
  cartItemUpdate,
} from "/components/navbar.js";
import { getFooter, scrollTop } from "/components/footer.js";
import API from "/components/api.js";

var api = `${API}/users/${localStorage.getItem("userid") || 1}`;

console.log(api);

var Total = 0;

window.onload = () => {
  const nav = document.querySelector("#navbar");
  // nav.innerHTML = top_navbar() + middle_navbar() + bottom_navbar();
  nav.innerHTML = top_navbar() + middle_navbar(true);
  const footer = document.querySelector("#footer");
  footer.innerHTML = getFooter();
  // scroll to top adding
  const scrollAdd = scrollTop();
  scrollAdd(); // calling this will add scroll to top funcion

  const logo = document.querySelector("#logo_click");
  logo.addEventListener("click", () => {
    let url = window.location.pathname;
    if (url !== "/index.html") {
      window.location.assign("/index.html");
    }
  });

  const item_cart = document.querySelector("#item_count_cart");
  let cartItems = localStorage.getItem("cart-total-items") || 0;
  if (!(cartItems == 0 || cartItems == null)) {
    item_cart.textContent = cartItems;
    item_cart.style.display = "flex";
  }

  fetch_data();
};

async function fetch_data() {
  try {
    let response = await fetch(api);
    let data = await response.json();
    console.log(data.cart);
    UpdateDisplay(data.cart);
  } catch (error) {
    console.log(error);
  }
}

//display update function
function UpdateDisplay(arr) {
  Total = 0;
  var tbody = document.querySelector("tbody");
  tbody.innerHTML = null;
  localStorage.setItem("cart-total-items", arr.length);
  cartItemUpdate();

  if (arr.length > 0) {
    arr.forEach(function (ele, index, cartarray) {
      var tr = document.createElement("tr");
      var td1 = document.createElement("td");
      var div_img = document.createElement("div");
      var image = document.createElement("img");
      image.setAttribute("Style", "width:70px");
      image.src = ele.image_url;
      div_img.append(image);
      td1.append(div_img);

      //product name
      var td2 = document.createElement("td");
      var name = document.createElement("p");
      name.innerText = ele.name;
      td2.append(name);

      let plus = document.createElement("button");
      let minus = document.createElement("button");

      plus.textContent = "+";
      minus.textContent = "-";

      minus.classList.add("pm_button");
      plus.classList.add("pm_button");

      const debounce = (duration = 400) => {
        let timer;
        return () => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            console.log(quantity.value);
            let options = {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                cart: cartarray,
              }),
            };

            fetch(api, options)
              .then(() => {
                UpdateDisplay(cartarray);
              })
              .catch((error) => {
                console.log(error);
              });
          }, duration);
        };
      };

      const debouceAddQuantity = debounce(400);

      plus.addEventListener("click", () => {
        ele.quantity = +ele.quantity;
        quantity.value = 1 + +quantity.value;
        ele.quantity = +quantity.value;
        debouceAddQuantity();
      });

      minus.addEventListener("click", () => {
        ele.quantity = +ele.quantity;
        quantity.value -= +1;
        if (quantity.value <= 0) {
          cartarray.splice(index, 1);
          Total -= ele.discounted_price * (ele.quantity || 1);
          console.log(cartarray.length);
          // UpdateDisplay(arr);

          let options = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cart: cartarray,
            }),
          };

          fetch(api, options)
            .then((res) => {
              UpdateDisplay(cartarray);
            })
            .catch((error) => {
              console.log(error);
            });
          return false;
        } else {
          ele.quantity = +quantity.value;
          debouceAddQuantity();
        }
      });

      //product quantity
      var td3 = document.createElement("td");
      var quantity = document.createElement("input");
      quantity.setAttribute("class", "w-25 pl-1");
      quantity.setAttribute("id", "Quantity");
      quantity.setAttribute("value", ele.quantity || 1);
      var q_button = document.createElement("input");
      q_button.setAttribute("type", "submit");
      q_button.setAttribute("id", "Submit");
      q_button.setAttribute("value", "Update");
      td3.append(minus, quantity, plus);
      // td3.append(minus, quantity, plusq_button);

      quantity.addEventListener("keyup", () => {
        let q = +quantity.value;
        console.log(q);
        if (q <= 0) {
          cartarray.splice(index, 1);
          Total -= ele.discounted_price * (ele.quantity || 1);
          console.log(cartarray.length);

          let options = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cart: cartarray,
            }),
          };

          fetch(api, options)
            .then(() => {
              UpdateDisplay(cartarray);
            })
            .catch((error) => {
              console.log(error);
            });
          return false;
        } else {
          ele.quantity = q;
          debouceAddQuantity();
        }
      });

      //product price
      var td4 = document.createElement("td");
      var price = document.createElement("p");
      price.setAttribute("id", "price");
      price.innerText = "Rs. " + ele.original_price * (ele.quantity || 1);
      td4.append(price);

      //remove item
      var td5 = document.createElement("td");
      var remove = document.createElement("a");
      remove.setAttribute("href", "#");
      var icon = document.createElement("i");
      icon.setAttribute("class", "fas fa-trash-alt");
      remove.append(icon);
      td5.append(remove);

      //discount price
      var td6 = document.createElement("td");
      var discount = document.createElement("p");
      discount.innerText = "Rs. " + ele.discounted_price * (ele.quantity || 1);
      td6.append(discount);
      Total = Total + +ele.discounted_price * +(ele.quantity || 1);
      console.log(Total);

      // remove function
      remove.addEventListener("click", function (event) {
        event.preventDefault();
        cartarray.splice(index, 1);
        Total -= +ele.discounted_price * +(ele.quantity || 1);
        console.log(cartarray.length);
        // UpdateDisplay(arr);

        let options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cartarray,
          }),
        };

        fetch(api, options)
          .then(() => {
            UpdateDisplay(cartarray);
          })
          .catch((error) => {
            console.log(error);
          });
      });
      // appending to main cart
      tr.append(td1, td2, td3, td4, td6, td5);
      tbody.append(tr);

      // for bottom part
      document.getElementById("cart-bottom").style = "display=block";
      var bottom = document.getElementById("cart-bottom");
      bottom.innerHTML = null;
      var cart_bottom = `
    <div class="row">
      <div class="coupon col-lg-6 col-md-6 col-12 mb-4">
        <div>
          <h5>COUPON</h5>
          <p>Enter your coupon code</p>
          <input type="text" placeholder="Coupon Code" id="coupon_code">
          <button id="coupon_button">Apply Coupon</button>
        </div>
      </div>
      <div class="total col-lg-6 col-md-6 col-12" >
        <div>
          <h5>Cart Total</h5>
          <div class="b_cart">
            <h6>Subtotal</h6>
            <p>Rs. ${Total}</p>
          </div>
          <div class="b_cart">
            <h6>Delivery Charges</h6>
            <p>Free</p>
          </div>
          <hr class="second-hr">
          <div class="b_cart">
            <h6>Total</h6>
            <p>Rs. ${Total}</p>
          </div>
          <button id="Checkout">Proceed To CheckOut </button>
        </div>
      </div>
    </div>`;

      bottom.innerHTML = cart_bottom;

      // storing for coupon
      document
        .getElementById("coupon_button")
        .addEventListener("click", function () {
          console.log("Total before coupon =>", Total);
          apply_code(Total);
        });

      // storing total amount in local storage for payment
      let CheckOut_button = document.getElementById("Checkout");
      CheckOut_button.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.setItem("Total_Amount", Total);
        window.location.assign("/checkout/checkout.html");
      });
    });
  } else {
    var upload = document.getElementById("cart-container");
    upload.innerHTML = null;
    var empty = `
      <div id="Empty_Display">
      <div id="emptyDisplay" class="no-item">
          <img src="https://images.bewakoof.com/images/doodles/empty-cart-page-doodle.png" alt="empty-bag" style="
          width: 150px;" />
          <p>Nothing in the bag</p>
          <a id="continuetohome" href="/index.html">Continue Shopping</a>
      </div>

      </div>`;

    upload.innerHTML = empty;
    //  document.getElementById("Empty_Display").style="display=block";
  }
}

// for coupon code
function apply_code(Total) {
  let coupons = null;
  let code = document.getElementById("coupon_code").value;

  console.log("Total just calling apply =>", Total);

  if (code === "") {
    alert("Please Enter Your coupon code");
  } else {
    console.log("Calling pop up");
    let popup = document.getElementById("popup");
    fetch(`${API}/coupons`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        coupons = data;
        console.log("Coupons =>", coupons);
        let flag = false;
        let discount = 0;

        coupons.forEach((couponObject) => {
          if (code === couponObject.code) {
            flag = true;
            discount = couponObject.discount;
          }
        });

        if (flag) {
          var dis = Math.round((+Total * +discount) / 100);
          console.log("Discount => ", +discount);
          Total -= +dis;
          console.log("After discount => ", +Total);
          // alert("Your Coupon is Successfully Applied")

          popup.classList.add("open-popup");

          document
            .getElementById("ok_btn")
            .addEventListener("click", function () {
              popup.classList.remove("open-popup");
            });

          var bottom = document.getElementById("cart-bottom");
          bottom.innerHTML = null;
          var cart_bottom = `
    <div class="row">
      <div class="coupon col-lg-6 col-md-6 col-12 mb-4">
        <div>
          <h5>COUPON</h5>
          <p>Enter your coupon code</p>
          <input type="text" placeholder="Coupon Code" id="coupon_code">
          <button id="coupon_button">Apply Coupon</button>
        </div>
      </div>
      <div class="total col-lg-6 col-md-6 col-12" >
        <div>
          <h5>Cart Total</h5>
          <div class="b_cart">
            <h6>Subtotal</h6>
            <p>Rs. ${Total}</p>
          </div>
          <div class="b_cart">
            <h6>Delivery Charges</h6>
            <p>Free</p>
          </div>
          <hr class="second-hr">
          <div class="b_cart">
            <h6>Total</h6>
            <p>Rs. ${Total}</p>
          </div>
          <button id="Checkout">Proceed To CheckOut </button>
        </div>
      </div>
    </div>`;

          bottom.innerHTML = cart_bottom;

          document
            .getElementById("coupon_button")
            .addEventListener("click", function () {
              console.log("Total before coupon =>", Total);
              apply_code(Total);
            });

          let CheckOut_button = document.getElementById("Checkout");
          CheckOut_button.addEventListener("click", function () {
            event.preventDefault();
            localStorage.setItem("Total_Amount", Total);
            console.log("clicked");
            window.location.assign("/checkout/checkout.html");
          });
        } else {
          // alert("invalid Coupon");
          let popup = document.getElementById("popup1");
          popup.classList.add("open-popup");

          document
            .getElementById("ok_btn1")
            .addEventListener("click", function () {
              popup.classList.remove("open-popup");
            });
        }
      })
      .catch((err) => {
        console.log("Coupon catching error => ", err);
      });
  }
}
