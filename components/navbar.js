import API from "./api.js";

function top_navbar() {
  return `<!------------------------------------>
    <!-- Top part of the navigation bar -->
    <!------------------------------------>

    <div id="top_nav" class="nav_top">
        <div class="top_first">
            <a href="#">Help</a>
            <div class="vertical_line"></div>
            <a href="#">Order Status</a>
        </div>
        <div class="top_second">
            <span><strong>Free shipping</strong> : On All U.S. Orders Over $100</span>
        </div>
        <div class="top_third">
            <i class="fa-solid fa-phone fa-sm" style="color: rgb(0, 0, 0, 0.4);"></i>
            <span>123.456.7890</span>
        </div>
    </div>

    <!------------------------------------>
    <!-- Top part of the navigation bar -->
    <!------------------------------------>`;
}

function middle_navbar() {
  const logged = localStorage.getItem("logged") || false;
  let data = null;
  if (logged == true || logged === "true") {
    const object = JSON.parse(localStorage.getItem("userInfo")) || {
      name: "Demo User",
    };
    data = `<div class="myaccount">
    <a href="#">My Account</a>
    <div class="myaccount-details">
        <a href=""><i class="fa-solid fa-user" style="color: #000000;"></i>&nbsp;&nbsp;Hi, ${object.name}</a>
        <a href="/logout.html"><i class="fa-solid fa-right-from-bracket"
                style="color: #000000;"></i>&nbsp;&nbsp;LogOut</a>
    </div>
  </div>`;
  } else {
    data = `<a href="/login.html" style="font-weight: bold;">Login</a>`;
  }

  return ` <!---------------------------------------------->
  <!-- Middle/Common part of the navigation bar -->
  <!---------------------------------------------->
  <div class="middle_nav">
      <div class="middle_first">
          <h1 class="logo-text">AUTO PLAY</h1>
      </div>
      <div class="middle_second">
          <div class="searchbox_outer">

              <!-- make this input text display to one to hide this -->
              <input type="text" placeholder="Search by Make Model Year, Product Type Part Number ..."
                  id="searchbar" />
              <div id="searchbtn">
                  <i class="fa-solid fa-magnifying-glass " style="color: #000000;"></i>
              </div>
              <div id="searchresult" class="search_result_list"></div>
             <div class="uparrow">
             <div class="arrow-up"></div>
             </div>
              <div id="blackscreen" class="blackBack"></div>
          </div>
      </div>
      <div class="middle_third">
          ${data}
          <a href="#">Garage&nbsp;<i class="fa-solid fa-angle-down fa-sm"
                  style="color: rgb(0, 0, 0, 0.4);"></i></a>

          <a href="#">
              <i class="fa-solid fa-heart fa-lg" style="color: rgb(0, 0, 0, 0.4);">

                  <div id="item_count_fav" class="item_count" style="display:none;">
                      0
                  </div>

              </i>
          </a>
          <a href="#">
              <i class="fa-solid fa-cart-shopping fa-lg" style="color: rgb(0, 0, 0, 0.4);">
                  <div id="item_count_cart" class="item_count" style="display:none;">
                      0
                  </div>
              </i>
          </a>

          
      </div>
  </div>
  <!---------------------------------------------->
  <!-- End of Middle part of the navigation bar -->
  <!---------------------------------------------->`;
}

{
  /* <img class="uparrow" src="https://media.istockphoto.com/id/1371797891/vector/up-arrow-icon-with-long-shadow-on-blank-background-flat-design.jpg?s=612x612&w=0&k=20&c=mSgRqRCxvAU4No13fw0iQYr7xZZ7lAEW0GKTcSyHJZc=" /> */
}

function bottom_navbar() {
  return ` <!---------------------------------------------->
    <!-- Bottom part of the navigation bar starts -->
    <!---------------------------------------------->
    <div id="bottom_nav" class="bottom_nav">

        <a href="#">Exterior</a>
        <a href="#">Interior</a>
        <a href="#">Performance</a>
        <a href="#">Wheels and Tires</a>
        <a href="#">Body parts</a>
        <a href="#">Repair parts</a>
        <a href="#">Electronics</a>
        <a href="#">Tools & Garage</a>

    </div>
    <!---------------------------------------------->
    <!-- Bottom part of  the navigation bar ends  -->
    <!---------------------------------------------->`;
}

function inputSearchEventListener(callback, duration = 300) {
  function debounce(duration = 300) {
    let timer;
    return (query) => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        let data = { length: 0 };
        if (query != "") {
          const res = await fetch(`${API}/products?q=${query}`);
          data = await res.json();
        }

        const search_result_container = document.querySelector("#searchresult");
        search_result_container.innerHTML = "";

        if (data.length != 0) {
          search_result_container.style.display = "flex";
          document.querySelector("body").style.backgroundColor =
            "rgb(0, 0, 0, 0.1)";
          document.querySelector("#blackscreen").style.display = "block";
          document.querySelector(".uparrow").style.display = "flex";
          callback(data); // append call back function than we will get from index.js
        } else {
          search_result_container.style.display = "none";
          document.querySelector("#blackscreen").style.display = "none";
          document.querySelector(".uparrow").style.display = "none";
        }
      }, duration);
    };
  }

  const debounceData = debounce(duration);

  document.querySelector("#blackscreen").addEventListener("click", () => {
    const search_result_container = document.querySelector("#searchresult");
    search_result_container.innerHTML = "";
    search_result_container.style.display = "none";
    document.querySelector("#blackscreen").style.display = "none";
    document.querySelector(".uparrow").style.display = "none";
  });

  return () => {
    const input = document.querySelector("#searchbar");
    input.addEventListener("keyup", (event) => {
      debounceData(event.target.value);
    });
  };
}

function cartItemUpdate(selector = "#item_count_cart") {
  const item_count_cart = document.querySelector(selector);
  let cartItems = localStorage.getItem("cart-total-items") || 0;
  if (!(cartItems == 0 || cartItems == null)) {
    item_count_cart.textContent = cartItems;
    item_count_cart.style.display = "flex";
  }
}

export {
  top_navbar,
  middle_navbar,
  bottom_navbar,
  inputSearchEventListener,
  cartItemUpdate,
};
