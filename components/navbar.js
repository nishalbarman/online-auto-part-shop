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
            <span><strong>Free shipping</strong> : On All Indian Orders Over Rs. 500</span>
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

function middle_navbar(hide = false) {
  const logged = localStorage.getItem("logged") || false;
  let data = null;
  let sidebar_login = null;
  if (logged == true || logged === "true") {
    const object = JSON.parse(localStorage.getItem("userObject")) || {
      name: "Demo User",
    };
    data = `<div class="myaccount">
    <a href="#">My Account</a>
    <div class="myaccount-details">
        <a href="#"><i class="fa-solid fa-user" style="color: #000000;"></i>&nbsp;&nbsp;Hi, ${
          object.name || "Anonymous"
        }</a>
        <a href="/logout.html"><i class="fa-solid fa-right-from-bracket"
                style="color: #000000;"></i>&nbsp;&nbsp;LogOut</a>
    </div>
  </div>`;
    sidebar_login = ` <div class="myaccount sidebar_account">
      <a href="#">My Account</a>
      <div class="myaccount-details">
          <a href="#"><i class="fa-solid fa-user" style="color: #000000;"></i>&nbsp;&nbsp;Hi, RooT
              BattleGrounds</a>
          <a href="/logout.html"><i class="fa-solid fa-right-from-bracket"
                  style="color: #000000;"></i>&nbsp;&nbsp;LogOut</a>
      </div>
    </div>`;
  } else {
    data = `<a href="/signin.html" style="font-weight: bold;">Login</a>`;
    sidebar_login = `<a class="login_sidebar" href="/signin.html" style="font-weight: bold;">Login</a>`;
  }

  let middle = null;
  if (hide == true) {
    middle = `<div class="middle_second"></div>`;
  } else {
    middle = ` <div class="middle_second">
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
</div>`;
  }

  return ` <!---------------------------------------------->
    <!-- Middle/Common part of the navigation bar -->
    <!---------------------------------------------->
    <div class="middle_nav">

    <div id="menu-btn" class="menu">
        <div>
        <i id="menu-icon" class="fa-solid fa-bars fa-xl" style="color: rgb(243,183,11);"></i>
        </div>
        
          <div class="black"></div>
          <div id="sidebar" class="sidebar hide_sidebar">
              <div class="middle_first">
                  <h1 id="logo_cl" class="logo-text">AUTO PART</h1>
                  <div id="side_close">
                      <i class="fa-solid fa-xmark fa-xl" style="color: #000000;"></i>
                  </div>
              </div>

              <div class="search_outer_mob">
                  <input type="text" id="mobile-search" placeholder="Search" />
                  <button id="mobile-s-button"><i class="fa-solid fa-magnifying-glass"
                          style="color: #000000;"></i></button>
              </div>
              <div class="vertical-line"></div>
              <a href="/products.html?category=exterior">Exterior</a>
              <div class="vertical-line"></div>
              <a href="/products.html?category=interior">Interior</a>

              <div class="vertical-line"></div>
              <a href="/products.html?category=performance">Performance</a>

              <div class="vertical-line"></div>
              <a href="/products.html?category=wheels%20and%20tyres">Wheels and Tyres</a>

              <div class="vertical-line"></div>
              <a href="/products.html?category=car body parts">Body parts</a>

              <div class="vertical-line"></div>
              <a href="/products.html?category=repair parts">Repair parts</a>

              <div class="vertical-line"></div>
              <a href="/products.html?category=electronics">Electronics</a>

              <div class="vertical-line"></div>
              <a href="/products.html?category=tools and garage">Tools &amp; Garage</a>

              <div class="vertical-line"></div>
              ${sidebar_login}
             
          </div>
      </div>

      <div class="middle_first">
          <h1 id="logo_click" class="logo-text">AUTO PART</h1>
      </div>
     ${middle}
      <div class="middle_third">
          ${data}
          <a class="garage" href="#">Garage&nbsp;<i class="fa-solid fa-angle-down fa-sm"
                  style="color: rgb(0, 0, 0, 0.4);"></i></a>

          <a class="favorite" href="#">
              <i class="fa-solid fa-heart fa-lg" style="color: rgb(0, 0, 0, 0.4);">

                  <div id="item_count_fav" class="item_count" style="display:none;">
                      0
                  </div>

              </i>
          </a>
          <a href="/cart.html">
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

        <a href="/products.html?category=exterior">Exterior</a>
        <a href="/products.html?category=interior">Interior</a>
        <a href="/products.html?category=performance">Performance</a>
        <a href="/products.html?category=wheels%20and%20tyres">Wheels and Tyres</a>
        <a href="/products.html?category=car body parts">Body parts</a>
        <a href="/products.html?category=repair parts">Repair parts</a>
        <a href="/products.html?category=electronics">Electronics</a>
        <a href="/products.html?category=tools and garage">Tools & Garage</a>

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
          // document.querySelector("body").style.backgroundColor =
          //   "rgb(0, 0, 0, 0.1)";
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

    const sidebar = document.querySelector("#sidebar");
    console.log(sidebar);
    sidebar.classList.add("hide_sidebar");
  });

  return () => {
    const input = document.querySelector("#searchbar");
    input.addEventListener("keyup", (event) => {
      if (event.key == "Enter") {
        if (event.target.value != "") {
          window.location.assign(`/products.html?search=${event.target.value}`);
        }
      } else {
        debounceData(event.target.value);
      }
    });

    const search_input = document.querySelector("#mobile-search");
    search_input.addEventListener("keyup", (event) => {
      if (event.key == "Enter") {
        if (event.target.value != "") {
          window.location.assign(`/products.html?search=${event.target.value}`);
        }
      }
    });

    const search_input_btn = document.querySelector("#mobile-s-button");
    search_input_btn.addEventListener("click", () => {
      const search_input = document.querySelector("#mobile-search");
      let q = search_input.value;
      if (q != "") {
        window.location.assign(`/products.html?search=${q}`);
      }
    });

    const close_button = document.querySelector("#side_close");
    close_button.addEventListener("click", () => {
      const sidebar = document.querySelector("#sidebar");
      console.log(sidebar);
      sidebar.classList.add("hide_sidebar");
      document.querySelector(".black").style.display = "none";
    });

    const menu_btn = document.querySelector("#menu-icon");
    menu_btn.addEventListener("click", () => {
      const sidebar = document.querySelector("#sidebar");
      sidebar.classList.remove("hide_sidebar");
      document.querySelector(".black").style.display = "block";
      console.log(sidebar);
    });

    document.querySelector(".black").addEventListener("click", () => {
      const sidebar = document.querySelector("#sidebar");
      sidebar.classList.add("hide_sidebar");
      document.querySelector(".black").style.display = "none";
    });

    const logo = document.querySelector("#logo_click");
    logo.addEventListener("click", () => {
      let url = window.location.pathname;
      if (url !== "/index.html") {
        window.location.assign("/index.html");
      }
    });
  };
}

function cartItemUpdate(selector = "#item_count_cart") {
  const item_count_cart = document.querySelector(selector);
  let cartItems = localStorage.getItem("cart-total-items") || 0;
  if (!(cartItems == 0 || cartItems == null)) {
    item_count_cart.textContent = cartItems;
    item_count_cart.style.display = "flex";
  } else {
    item_count_cart.textContent = 0;
    item_count_cart.style.display = "none";
  }
}

export {
  top_navbar,
  middle_navbar,
  bottom_navbar,
  inputSearchEventListener,
  cartItemUpdate,
};
