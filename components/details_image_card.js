function getImages(image_url, callback) {
  //   const { image_url, name } = element;

  const card = document.createElement("li");
  card.classList.add("splide__slide", "main_image");

  card.innerHTML = `
      <img src="${image_url}"  />`;

  //   card.addEventListener("click", callback);
  return card;
}

function getThumbnails(image_url, callback) {
  //   const { image_url, name } = element;

  const card = document.createElement("li");
  card.classList.add("splide__slide", "thumbnails");

  card.innerHTML = `
      <img src="${image_url}"  />`;

  return card;
}

export { getImages, getThumbnails };
