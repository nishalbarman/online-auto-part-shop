function getCategoryCard(element, callback) {
  const { name, image_url } = element;

  const cardOuter = document.createElement("li");
  cardOuter.classList.add("splide__slide", "feature_card");
  cardOuter.innerHTML = `<p>${name}</p>
  <div>
      <p>Learn More</p>
      <i class="fa-solid fa-angle-right fa-sm" style="color: #000000;"></i>
  </div>
  <img
      src="${image_url}" />`;

  cardOuter.addEventListener("click", callback);

  return cardOuter;
}

export default getCategoryCard;

// return `
// <li class="splide__slide feature_card" onclick="callback(this)">

// </li>
// `;
