function getDealsWeekCard(element, ptagrate, callback) {
  const { name, image_url, discounted_price, rating, rating_count } = element;

  const card = document.createElement("div");
  card.classList.add("deals_card");

  card.addEventListener("click", callback);

  card.innerHTML = `
  <div class="deal_image_outer">
    <img
        src="${image_url}" />
    </div>
    <div class="deals_body">
    <p>${name}</p>
    <div>
        ${ptagrate}
        <p>${rating_count}</p>
    </div>
    <p>Rs. ${discounted_price}</p>
    <button>Add to Cart <i class="fa-solid fa-cart-shopping" style="color: #000000;"></i></button>
 </div>`;

  return card;
}

export default getDealsWeekCard;

//   return
//   <div class="deals_card">
// </div>`;
