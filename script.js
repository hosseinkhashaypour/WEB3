const productDetails = document.querySelector(".product-deatails");
const categoryOption = document.getElementById("categoryha");
const spanPrice = document.querySelector(".spanPrice")
let showProducts = [];

const Myapi = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const json = await response.json();
        showProducts = json;
        console.log(showProducts);
        return json;

    } catch (error) {
        console.log("Error encountered:", error);
    }
};

const showData = () => {
    try {
        const selectedCategory = categoryOption.value;
        const filteredProducts = showProducts.filter(product => product.category === selectedCategory);
        productDetails.innerHTML = '';

        filteredProducts.forEach(product => {
            const productTitle = product.title;
            const productImg = product.image;
            const productPrice = product.price;
            const productContent = `
                <div style="background-color: whitesmoke; height: 150%">
                    <img src="${productImg}" class="img-style">
                    <h1 class="h-style">${productTitle}</h1>
                    <p1 class="price">${productPrice + "$"}</p1>
                </div>`;
            productDetails.insertAdjacentHTML("beforeend", productContent);

            const productDiv = productDetails.lastElementChild;
            productDiv.addEventListener('click', () => {
                Basket(productTitle, productImg, productPrice);
            });
        });
    } catch (error) {
        console.error("Error occurred:", error);
    }
};

let basketItems = [];
let totalPrice = 0;
let totalSpan = document.createElement('span');
totalSpan.textContent = `Total price is: ${totalPrice.toFixed(2)}$`;
spanPrice.appendChild(totalSpan);

function Basket(productTitle, productImg, productPrice) {
    const buyedProduct = `
        <div class="buyed" style="height: 150%; background-color: whitesmoke;">
            <img src="${productImg}" class="img-style">
            <p2 style="color: white; background-color: #04aa6d;border-radius: 296px; padding: 10px 20px;font-weight: bold;">Saved in your basket</p2>
            <h1 class="h-style">${productTitle}</h1>
            <p1 class="price">${productPrice + "$"}</p1>
            <button id = "remove" onclick = "removeCart()">Cancel</button>
            <hr><br>
        </div>
    `;
    productDetails.insertAdjacentHTML("beforeend", buyedProduct);
    basketItems.push({ title: productTitle, img: productImg, price: productPrice });
    localStorage.setItem("BasketItems", JSON.stringify(basketItems));

    totalPrice += productPrice;
    totalSpan.textContent = `Total price is: ${totalPrice.toFixed(2)}$`;
    // removeCart(productImg, productTitle,productPrice)
}



let itemGetCount = {};
function loadBasket() {
    const getBasket = localStorage.getItem("BasketItems");
    if (getBasket) {
        basketItems = JSON.parse(getBasket);
        basketItems.forEach(basketItem => {
            if (itemGetCount[basketItem.title] && itemGetCount[basketItem.title] > 1) {
                console.log(`More than one getItem for ${basketItem.title}`);
                return;
            }
            Basket(basketItem.title, basketItem.img, basketItem.price);
            itemGetCount[basketItem.title] = (itemGetCount[basketItem.title] || 0) + 2;
        });
    }
}


categoryOption.addEventListener('change', showData);
document.addEventListener('DOMContentLoaded', loadBasket);

Myapi()
showData()

