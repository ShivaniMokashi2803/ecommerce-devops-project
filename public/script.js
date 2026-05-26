let cart = [];

window.onload = function(){
    let user = localStorage.getItem("username");

    if(user && document.getElementById("username")){
        document.getElementById("username").innerHTML =
        "👤 Welcome, " + user;
    }
}

function addToCart(product){
    cart.push(product);
    displayCart();
    alert(product + " added to cart!");
}

function displayCart(){
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    cart.forEach((item,index)=>{
        cartItems.innerHTML += `
        <li>
            ${item}
            <button onclick="removeItem(${index})">Delete</button>
        </li>`;
    });
}

function removeItem(index){
    cart.splice(index,1);
    displayCart();
}

function buyNow(){
    if(cart.length === 0){
        alert("Cart is Empty!");
    } else {
        alert("Order Placed Successfully!");
        cart = [];
        displayCart();
    }
}

function logout(){
    localStorage.removeItem("username");
    window.location.href = "/";
}

function searchProducts(){
    let input = document.getElementById("searchInput").value.toLowerCase();
    let products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        let name = product.getAttribute("data-name").toLowerCase();

        if(name.includes(input)){
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

function filterCategory(category){
    let products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        let productCategory = product.getAttribute("data-category");

        if(category === "All" || productCategory === category){
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}