const productDetails = document.querySelector(".product-deatails");
const categoryOption = document.getElementById("categoryha");
const spanPrice = document.querySelector(".spanPrice");
const basketImg = document.querySelector(".basket");
let showProducts = [];
let basketItems = [];
let totalPrice = 0;
let totalSpan = document.createElement('span');
totalSpan.textContent = `Total price is: ${totalPrice.toFixed(2)}$`;
spanPrice.appendChild(totalSpan);
let itemGetCount = {};

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
            const productContent = `
                <div style="background-color: whitesmoke; height: 150%" data-product-id="${product.id}">
                    <img src="${product.image}" class="img-style">
                    <h1 class="h-style">${product.title}</h1>
                    <button class="addBasket">Add to cart</button>
                    <p class="price">${product.price}$</p>
                </div>`;
            productDetails.insertAdjacentHTML("beforeend", productContent);
        });

        document.querySelectorAll('.addBasket').forEach(button => {
            button.addEventListener('click', (e) => {
                const productDiv = e.target.closest('[data-product-id]');
                const productId = productDiv.getAttribute('data-product-id');
                const product = showProducts.find(p => p.id == productId);
                Basket(product.title, product.image, product.price, product.id);
            });
        });
    } catch (error) {
        console.error("Error occurred:", error);
    }
};

function Basket(productTitle, productImg, productPrice, productId) {
    const buyedProduct = `
        <div class="buyed" style="height: fit-content; background-color: whitesmoke;" data-product-id="${productId}">
            <img src="${productImg}" class="img-style">
            <p style="color: white; background-color: #04aa6d;border-radius: 296px; padding: 10px 20px;font-weight: bold;">Saved in your basket</p>
            <h1 class="h-style">${productTitle}</h1>
            <p class="price">${productPrice}$</p>
            <button class="remove" data-product-id="${productId}">Cancel</button>
            <hr><br>
        </div>
    `;
    productDetails.insertAdjacentHTML("beforeend", buyedProduct);
    basketItems.push({ title: productTitle, img: productImg, price: productPrice, id: productId });
    localStorage.setItem("BasketItems", JSON.stringify(basketItems));

    totalPrice += productPrice;
    totalSpan.textContent = `Total price is: ${totalPrice.toFixed(2)}$`;

    document.querySelector(`.remove[data-product-id="${productId}"]`).addEventListener('click', (e) => {
        const productDiv = e.target.closest('[data-product-id]');
        const productId = productDiv.getAttribute('data-product-id');
        removeItemFromBasket(productId);
    });
}

function removeItemFromBasket(productId) {
    const productDiv = document.querySelector(`.buyed[data-product-id="${productId}"]`);
    const product = basketItems.find(item => item.id == productId);
    if (productDiv && product) {
        productDetails.removeChild(productDiv);
        basketItems = basketItems.filter(item => item.id != productId);
        localStorage.setItem("BasketItems", JSON.stringify(basketItems));
        totalPrice -= product.price;
        totalSpan.textContent = `Total price is: ${totalPrice.toFixed(2)}$`;
    }
}

function removeAll() {
    localStorage.clear();
    productDetails.innerHTML = "";
    location.reload();
}

function loadBasket() {
    const getBasket = localStorage.getItem("BasketItems");
    if (getBasket) {
        basketItems = JSON.parse(getBasket);
        basketItems.forEach(basketItem => {
            if (itemGetCount[basketItem.title] && itemGetCount[basketItem.title] > 1) {
                return;
            }
            Basket(basketItem.title, basketItem.img, basketItem.price, basketItem.id);
            itemGetCount[basketItem.title] = (itemGetCount[basketItem.title] || 0) + 2;
        });
    }
}

basketImg.addEventListener('click', () => {
    location.reload();
});
categoryOption.addEventListener('change', showData);
document.addEventListener('DOMContentLoaded', loadBasket);

Myapi();
