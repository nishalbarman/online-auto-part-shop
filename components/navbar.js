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
          </div>
      </div>
      <div class="middle_third">
          <a href="#">My Account</a>
          <a href="#">Garage&nbsp;<i class="fa-solid fa-angle-down fa-sm"
                  style="color: rgb(0, 0, 0, 0.4);"></i></a>

          <a href="#">
              <i class="fa-solid fa-heart fa-lg" style="color: rgb(0, 0, 0, 0.4);">

                  <div id="item_count" class="item_count">
                      0
                  </div>

              </i>
          </a>
          <a href="#">
              <i class="fa-solid fa-cart-shopping fa-lg" style="color: rgb(0, 0, 0, 0.4);">
                  <div id="item_count" class="item_count">
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

export { top_navbar, middle_navbar, bottom_navbar };
