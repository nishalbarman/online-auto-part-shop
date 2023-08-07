import {
  top_navbar,
  middle_navbar,
  bottom_navbar,
} from "../components/navbar.js";

window.onload = () => {
  const nav = document.querySelector("#navbar");
  nav.innerHTML = top_navbar() + middle_navbar() + bottom_navbar();
  const item_cart = document.querySelector("#item_count_cart");
  let cartItems = localStorage.getItem("cart-total-items") || 0;
  if (!(cartItems == 0 || cartItems == null)) {
    item_cart.textContent = cartItems;
    item_cart.style.display = "flex";
  }
};
// for cart
var arr=[{image:"https://th.bing.com/th/id/OIP.U8j_zjLYk6YE_TLvf_zeMAHaHa?w=171&h=180&c=7&r=0&o=5&pid=1.7",
name:"clutch plate",
price:"250",
}]





//display update function
function UpdateDisplay(){
var tbody=document.querySelector("tbody");
tbody.innerHTML=null;



if(arr.length!=0)
{
  arr.forEach(function(ele){
    var tr=document.createElement("tr");
    var td1=document.createElement("td");
    var div_img=document.createElement("div");
    var image=document.createElement("img");
    image.src=ele.image;
    div_img.append(image);
    td1.append(div_img);
    
    //product name
    var td2=document.createElement("td");
    var name=document.createElement("h5");
    name.innerText=ele.name;
    td2.append(name);
    
    //product quantity
    var td3=document.createElement("td");
    var quantity=document.createElement("input");
    quantity.setAttribute("class", "w-25 pl-1");
    quantity.setAttribute("value", "1");
    td3.append(quantity);
    
    //product price
    var td4=document.createElement("td");
    var price=document.createElement("h5");
    price.innerText=ele.price;
    td4.append(price);
    
    //remove item
    var td5=document.createElement("td");
    var remove=document.createElement("a");
    remove.setAttribute("href","#");
    var icon=document.createElement("i");
    icon.setAttribute("class","fas fa-trash-alt");
    remove.append(icon);
    td5.append(remove);
    
    //total
    var td6=document.createElement("td");
    var total=document.createElement("h5");
    total.innerText=ele.price;
    td6.append(total);
    
    
    
    tr.append(td1,td2,td3,td4,td5,td6);
    tbody.append(tr);
    });
    var cart_bottom=document.getElementById("cart-bottom").style="display=block";
}
else{
  var blank=document.getElementById("cart-container");

  blank.innerHTML=null;

  var update=`<div id="emptyDisplay" class="no-item">
  <img src="https://images.bewakoof.com/images/doodles/empty-cart-page-doodle.png" alt="empty-bag" style="
  width: 150px;" />
  <p>Nothing in the bag</p>
  <a id="continuetohome" href="/index.html">Continue Shopping</a>`

  blank.innerHTML=update;


}
}

UpdateDisplay();