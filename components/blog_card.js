function getBlogCard(element, callback) {
  const { name, data: date, category_display, image_url } = element;

  const card = document.createElement("li");
  card.classList.add("blog_card", "splide__slide");
  card.addEventListener("click", callback);
  card.innerHTML = `
    <img src="${image_url}" />
    <div class="blog_body">
        <div>
            <p>${category_display}</p>
            <p>${date}</p>
        </div>
        <p>${name}</p>
        <p>Learn More <i class="fa-solid fa-angle-right fa-sm" style="color: #000000;"></i></p>
    </div>`;

  return card;
}

export default getBlogCard;
