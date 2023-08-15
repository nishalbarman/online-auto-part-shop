function searchCardAppend() {
  function getSearchCard(element, ptagrate, callback) {
    const { image_url, name, discounted_price } = element;

    const card = document.createElement("div");
    card.classList.add("search_card");
    card.addEventListener("click", callback);

    card.innerHTML = `
    <div class="search_image_outer">
        <img
            src="${image_url}">
      </div>
      <div class="search_body">
        <p>${name}</p>
        <div>
          ${ptagrate}
        </div>
        <p>Rs. ${discounted_price}</p>
      `;

    return card;
  }

  return (list) => {
    const append = document.querySelector("#searchresult");
    append.innerHTML = "";
    list.forEach((element, index, arr) => {
      let p = `<p>`;

      if (element.rating > 5) {
        element.rating = 5;
      }
      if (element.rating_count >= 1000) {
        element.rating_count = (element.rating_count / 1000).toFixed(2) + "k";
      }

      let count = 0;
      for (let i = 0; i < 5; i++) {
        if (count < element.rating) {
          p += `<i class="fa-solid fa-star" style="color: #ff8800;"></i>`;
          count++;
        } else {
          p += `<i
                  class="fa-regular fa-star fa-sm"
                  style="color: rgb(0, 0, 0, 0.6);"></i>`;
        }
      }
      p += `</p>`;
      append.append(
        getSearchCard(element, p, (event) => {
          // console.log(event);
          event.stopPropagation();
          localStorage.setItem("product_details", JSON.stringify(element));
          window.location.assign("/details.html");
          // POP UP SHOULD BE here
        })
      );
      if (index !== arr.length - 1)
        append.insertAdjacentHTML(
          "beforeend",
          "<div class='vertical-line'></div>"
        );
    });
  };
}

export { searchCardAppend };
