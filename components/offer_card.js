function getOfferCard(element, callback) {
  const { image_url, name } = element;

  const card = document.createElement("li");
  card.classList.add("splide__slide", "offer_card");

  card.innerHTML = `
    <img src="${image_url}" />
    <div class="offer_card_body">
        <p>${name}</p>
        <p>Learn More <i class="fa-solid fa-angle-right fa-sm" style="color: #000000;"></i></p>
    </div>`;

  card.addEventListener("click", callback);
  return card;
}

export default getOfferCard;
