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
original_price:"2500",
discount_price:"2000",
},
{image:"https://th.bing.com/th/id/OIP.U8j_zjLYk6YE_TLvf_zeMAHaHa?w=171&h=180&c=7&r=0&o=5&pid=1.7",
name:"clutch plate",
original_price:"2500",
discount_price:"2000",
},
{image:"https://th.bing.com/th/id/OIP.U8j_zjLYk6YE_TLvf_zeMAHaHa?w=171&h=180&c=7&r=0&o=5&pid=1.7",
name:"clutch plate",
original_price:"2500",
discount_price:"2000",
},
{image:"https://th.bing.com/th/id/OIP.U8j_zjLYk6YE_TLvf_zeMAHaHa?w=171&h=180&c=7&r=0&o=5&pid=1.7",
name:"clutch plate",
original_price:"2500",
discount_price:"2000",
}]

// var arr=[];




//display update function
function UpdateDisplay(arr){
var tbody=document.querySelector("tbody");
tbody.innerHTML=null;



if(arr.length!=0)
{
  arr.forEach(function(ele,index){
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
    price.setAttribute("id","price");
    price.innerText="Rs. "+ele.original_price;
    td4.append(price);
    
    //remove item
    var td5=document.createElement("td");
    var remove=document.createElement("a");
    remove.setAttribute("href","#");
    var icon=document.createElement("i");
    icon.setAttribute("class","fas fa-trash-alt");
    remove.append(icon);
    td5.append(remove);
    
    
    //discount price
    var td6=document.createElement("td");
    var discount=document.createElement("h5");
    discount.innerText="Rs. "+ele.discount_price;
    td6.append(discount);

    // remove function
    remove.addEventListener("click",function(){
      arr.splice(index,1);
      UpdateDisplay();
    })
    
    
    
    tr.append(td1,td2,td3,td4,td6,td5);
    tbody.append(tr);
    });
   document.getElementById("cart-bottom").style="display=block";
}
else{
 document.getElementById("cart-container").innerHTML=null;
 document.getElementById("Empty_Display").style="display=block";
 
}
}

UpdateDisplay(arr);