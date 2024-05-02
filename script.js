const Myproducts = document.querySelector(".products");
const buyproducts = document.querySelector(".product-click");
const inputcategory = document.querySelector('input')
let imageCount = 0;

const Myapi = async () => {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const json = await res.json();
        console.log(json);
        return json;
    } catch (error) {
        console.log("error");
    }
};

const showData = async () => {
    const products = await Myapi();
    products.forEach(product => {
        if (imageCount < 4) {
            const productName = product.title;
            const ProductImg = product.image;
            const productprice = product.price;
            const productContent = `<div onclick="selectedproduct('${ProductImg}')" style="border: 1px solid orangered; background-color: rgb(255, 94, 0); border-radius: 10px; padding: 10px 20px;">
                <img src="${ProductImg}" class="img-style">
                <br>
                <h1 class="h-style">${productName}</h1>
                <p1 class="price" onclick="selectedproduct('${productprice}')">${productprice + "$"}</p1>
            </div>`;
            Myproducts.insertAdjacentHTML('beforeend', productContent);
        }
    });

    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    if (selectedProduct) {
        const selectContent = `<div class="border-div" style="border: 2px solid orange;">
            <img src="${selectedProduct.image}" class="img-style">
        </div>`;
        document.body.insertAdjacentHTML('beforeend', selectContent);
    }
};
function selectedproduct(ProductImg) {
    localStorage.setItem('selectedProduct', JSON.stringify({ image : ProductImg }));
    localStorage.getItem('selectedProduct')
    const selectContent = `<div class="border-div" style="border: 2px solid orange;">
        <img src="${ProductImg}" class="img-style">
    </div>`;
    document.body.insertAdjacentHTML('beforeend', selectContent);

}
showData();
