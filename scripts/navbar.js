import { inputSearchEventListener } from "/components/navbar.js";
import { searchCardAppend } from "/components/search_card.js";

window.onload = () => {
  const searchAppend = searchCardAppend(); //getting the appending function for search result
  const inputListener = inputSearchEventListener(searchAppend, 700); // searchbar listener from component
  inputListener();
};
