const productDetails = document.querySelector(".product-deatails");
const categoryOption = document.getElementById("categoryha"); 
let showProducts = [];

const Myapi = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const json = await response.json();
        showProducts = json;
        console.log(showProducts);
        return json

    } catch (error) {
        console.log("Error encountered:", error);
    }
}

const showData = (json) => {
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
}

function Basket(productTitle, productImg, productPrice) {
    const buyedProduct = `
        <div class="buyed" style = "height : 150%; background-color : whitesmoke;">
            <img src="${productImg}" class="img-style">
            <p2 style = "color : white; background-color : red;border-radius : 296px; padding : 10px 20px;font-weight : bold; ">Saved in your basket</p2>
            <h1 class = "h-style">${productTitle}</h1>
            <p1 class="price">${productPrice + "$"}</p1>
            <hr><br>
        </div>
    `;
    const hrtag = `<hr><br>
    <p1>Your Basket</p1>
    `
    productDetails.insertAdjacentHTML("beforeend", buyedProduct);
    //get Info to browser
    localStorage.setItem("productInfo" , productTitle ) ;
    localStorage.setItem("productImg" , productImg);
    localStorage.setItem("productPrice" , productPrice)

    //recive data from browser

    let reciveTitle = localStorage.getItem("productInfo")
    let reciveImg = localStorage.getItem("productImg")
    let recivePrice = localStorage.getItem("productPrice")
}

Myapi(); 
showData();

