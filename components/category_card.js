function getCategoryCard(item) {
  const { image_url, name } = item;

  return `
    <li class="category_card splide__slide" onclick="categoryClick(this)">
      <img
      src="${image_url}" />
      <p>${name}</p>
    </li>
  `;
}
// <div style="width: 20px; background-color: white;"></div>

export default getCategoryCard;
