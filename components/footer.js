function getFooter() {
  return `<div class="footer">
    <div class="top_footer">

        <div class="first_footer">
            <p class="footer_heading">About us</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus sequi quis voluptatibus,
                reprehenderit quibusdam pariatur eum quo rem alias ea, ut ab ad, atque quidem quae animi eaque?
                Cumque, magni.</p>
        </div>

        <div class="second_footer">
            <p class="footer_heading">Get in Touch</p>
            <p>447 Broadway, FL 2, New York, </p>
            <p>info@covermax.com</p>
            <p>800-451-0972</p>
        </div>

        <div class="third_footer">
            <p class="footer_heading">Quick Links</p>
            <p>Customer Service</p>
            <p>Return Policy</p>
            <p>Shipping & Delivery</p>
            <p>Our Story</p>
            <p>About Us</p>
            <p>Blog</p>
        </div>

        <div class="fourth_footer">
            <p class="footer_heading">Get in Touch</p>
            <input type="email" placeholder="Email Address" />
            <button>Subscribe</button>
            <div class="social_footer_btn">
                <i class="fa-brands fa-facebook-f" style="color: rgb(152,152,152);"></i>
                <i class="fa-brands fa-twitter" style="color: rgb(152,152,152)"></i>
                <i class="fa-brands fa-instagram" style="color: rgb(152,152,152)"></i>
                <i class="fa-brands fa-linkedin-in" style="color: rgb(152,152,152)"></i>
            </div>
        </div>

        <!-- <div class="fifth_footer" id="footer-scroll"> -->
        <i id="fifth_footer" class="fa-solid fa-angle-up" style="color: rgb(0, 0, 0);"></i>
        <!-- </div> -->
    </div>
    <div class="footer_bottom">
        <div class="logo">
            <h1 class="logo-text">AUTO PLAY</h1>
        </div>
        <div class="bottom-copyright">
            <p>Copyrights @ 2020 <span style="color: rgb(248,200,8); text-transform: uppercase;">AUTO
                    PART</span></p>
            <p>All rights reserved.</p>
        </div>
        <div>
            <img class="pay_logo_image" src="/img/payment_logos.png" />
        </div>

    </div>

</div>`;
}

function scrollTop() {
  return () => {
    const footerScroll = document.querySelector("#fifth_footer");
    footerScroll.addEventListener("click", () => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0;
    });
  };
}

export { getFooter, scrollTop };
