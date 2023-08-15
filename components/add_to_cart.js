import API from "/components/api.js";
import { cartItemUpdate } from "/components/navbar.js";

async function addToCart(element, event, page = false) {
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

  try {
    if (
      localStorage.getItem("logged") != true &&
      localStorage.getItem("logged") != "true"
    ) {
      alert("You need to login first --> Redirecting");
      window.location.assign("/signin.html");
      return false;
    }

    let button = null;

    if (
      event.target.innerHTML ==
      'Add to Cart <i class="fa-solid fa-cart-shopping" style="color: #000000;"></i>'
    ) {
      button = event.target;
    } else if (
      event.target.innerHTML == "" &&
      event.target.parentNode.innerHTML ==
        'Add to Cart <i class="fa-solid fa-cart-shopping" style="color: #000000;"></i>'
    ) {
      button = event.target.parentNode;
    } else {
      return false;
    }

    button.innerHTML = `Add to Cart <i style="margin-left: 2px;" class="fa-solid fa-spinner fa-spin"></i>`;

    const res = await fetch(
      `${API}/users/${localStorage.getItem("userid") || 1}`
    );
    const data = await res.json();

    let carts = data.cart;

    if (page) {
      element.quantity =
        +document.querySelector("#quantity").value < 1
          ? 1
          : +document.querySelector("#quantity").value;
    }

    carts.push(element);
    localStorage.setItem(
      "cart-total-items",
      +(localStorage.getItem("cart-total-items") || 0) + 1
    );
    cartItemUpdate();
    postTheItemToserver(carts);
    console.log(event.target);
    button.innerHTML = `Add to Cart <i style="margin-left: 5px;" class="fa-solid fa-check" style="color: #000000;"></i>`;
  } catch (error) {
    console.error(error);
  }
}

export default addToCart;
