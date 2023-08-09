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
name:"Break pad",
original_price:"2500",
discount_price:"2000",
},
{image:"https://th.bing.com/th/id/OIP.U8j_zjLYk6YE_TLvf_zeMAHaHa?w=171&h=180&c=7&r=0&o=5&pid=1.7",
name:"Break pad",
original_price:"2500",
discount_price:"2000",
},
{image:"https://th.bing.com/th/id/OIP.U8j_zjLYk6YE_TLvf_zeMAHaHa?w=171&h=180&c=7&r=0&o=5&pid=1.7",
name:"Break pad",
original_price:"2500",
discount_price:"2000",
},
{image:"https://th.bing.com/th/id/OIP.U8j_zjLYk6YE_TLvf_zeMAHaHa?w=171&h=180&c=7&r=0&o=5&pid=1.7",
name:"Break pad",
original_price:"2500",
discount_price:"2000",
}]
// var api=`http://localhost:3000/users/${localStorage.getItem("userid") || 1}`

// var arr=[];
// Data.cart

// fetch("")

async function fetch_data(){
  try{
    let response=await fetch(api);
    let data=await response.json();
    console.log(data.cart);
  }
  catch(error){
    console.log(error);
  }
}
fetch_data();


//display update function
function UpdateDisplay(arr){
var tbody=document.querySelector("tbody");
tbody.innerHTML=null;



if(arr.length!=0)
{
  var total=0;
  arr.forEach(function(ele,index){
    var tr=document.createElement("tr");
    var td1=document.createElement("td");
    var div_img=document.createElement("div");
    var image=document.createElement("img");
    image.setAttribute("Style","width:70px")
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
    quantity.setAttribute("id", "Quantity");
    quantity.setAttribute("value", "1");
    var q_button=document.createElement("input");
    q_button.setAttribute("type","submit");
    q_button.setAttribute("id","Submit");
    q_button.setAttribute("value","Update");
    td3.append(quantity,q_button);
     
    //getting value from input field
    q_button.addEventListener("click",function(){
      var u_p=document.getElementById("Quantity").value;
      console.log(u_p);
      updated_discount=ele.discount_price*u_p;
      td6.innerHTML=null;
      var discount=document.createElement("h5");
      discount.innerText="Rs. "+updated_discount;
      td6.append(discount);
    })
   
    
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
    total=total+ +ele.discount_price;
    console.log(total);

    // remove function
    remove.addEventListener("click",function(){
      arr.splice(index,1);
      total=total- +ele.discount_price
      UpdateDisplay(arr);
    })
    // appending to main cart
    tr.append(td1,td2,td3,td4,td6,td5);
    tbody.append(tr);
    
    // for bottom part
    document.getElementById("cart-bottom").style="display=block";
    var bottom=document.getElementById("cart-bottom");
    bottom.innerHTML=null;
    var cart_bottom=`
    <div class="row">
      <div class="coupon col-lg-6 col-md-6 col-12 mb-4">
        <div>
          <h5>COUPON</h5>
          <p>Enter your coupon code</p>
          <input type="text" placeholder="Coupon Code">
          <button>Apply Coupon</button>
        </div>
      </div>
      <div class="total col-lg-6 col-md-6 col-12" >
        <div>
          <h5>Cart Total</h5>
          <div class="b_cart">
            <h6>Subtotal</h6>
            <p>Rs. ${total}</p>
          </div>
          <div class="b_cart">
            <h6>Delivery Charges</h6>
            <p>Free</p>
          </div>
          <hr class="second-hr">
          <div class="b_cart">
            <h6>Total</h6>
            <p>Rs. ${total}</p>
          </div>
          <button id="Checkout">Proceed To CheckOut </button>
        </div>
      </div>
    </div>`

    bottom.innerHTML=cart_bottom;

    // storing total amount in local storage for payment
    let CheckOut_button=document.getElementById("Checkout");
    CheckOut_button.addEventListener("click",function(){
      event.preventDefault();
      localStorage.setItem("Total_Amount",total);
      console.log("clicked");
    })
    });
    
   
}
else{
 document.getElementById("cart-container").innerHTML=null;
 document.getElementById("Empty_Display").style="display=block";
 
}
}

UpdateDisplay(arr);