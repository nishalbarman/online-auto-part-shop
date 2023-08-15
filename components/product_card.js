function getDealsWeekCard(element, ptagrate, callback, card_callback) {
  const {
    name,
    image_url,
    original_price,
    discounted_price,
    rating,
    rating_count,
  } = element;

  const card = document.createElement("div");
  card.classList.add("deals_card");

  card.addEventListener("click", card_callback);

  // card.addEventListener("click", callback);

  const image_outer = document.createElement("div");
  image_outer.classList.add("deal_image_outer");

  const deal_image = document.createElement("img");
  deal_image.src = image_url;

  image_outer.innerHTML = `<img
  src="${image_url}" />
</div>`;

  const deals_body = document.createElement("div");
  deals_body.classList.add("deals_body");
  deals_body.innerHTML = `<p>${name}</p>
<div>
    ${ptagrate}
    <p>${rating_count}</p>
</div>
<p><span style="text-decoration: line-through!important; font-size: 15px;">Rs. ${original_price}</span> Rs. ${discounted_price}</p>
<span class="discount"> ${Math.round(
    ((element.original_price - element.discounted_price) /
      element.original_price) *
      100
  )}% OFF</span>`;

  const addToCart = document.createElement("button");
  addToCart.innerHTML = `Add to Cart <i class="fa-solid fa-cart-shopping" style="color: #000000;"></i>`;

  addToCart.addEventListener("click", callback);

  deals_body.append(addToCart);

  card.append(image_outer, deals_body);

  return card;
}

export default getDealsWeekCard;

// card.innerHTML = `
//   <div class="deal_image_outer">
//     <img
//         src="${image_url}" />
//     </div>
//     <div class="deals_body">
//     <p>${name}</p>
//     <div>
//         ${ptagrate}
//         <p>${rating_count}</p>
//     </div>
//     <p><span style="text-decoration: line-through!important; font-size: 15px;">Rs. ${original_price}</span> Rs. ${discounted_price}</p>
//     <button>Add to Cart <i class="fa-solid fa-cart-shopping" style="color: #000000;"></i></button>
//  </div>`;
