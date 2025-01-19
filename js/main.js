//? html elements
// buttons
const addBtn = document.querySelectorAll('.add-btn');
const closeBtn = document.querySelector('.close');
const updateBtn = document.querySelector('.update-btn');
const deleteBtn = document.querySelectorAll('.delete-btn');

// inputs
const titleInput = document.getElementById('title');
const priceInput = document.getElementById('price');
const taxInput = document.getElementById('tax');
const adsInput = document.getElementById('ads');
const discountInput = document.getElementById('discount');
const countInput = document.getElementById('count');
const categoryInput = document.getElementById('category');
const searchInput = document.getElementById('search-input');

// modal
const modal = document.querySelector('.modal');

let products = JSON.parse(localStorage.getItem('products')) || [];
let span = document.createElement('span');
let temp;

displayProducts(products);
productsCount(products);

// ^ functions
// get the total
function getTotal(){
    if(priceInput.value !== ''){
        let totalPrice = (Number(priceInput.value) + Number(taxInput.value) + Number(adsInput.value)) - Number(discountInput.value);
        // console.log(totalPrice);
        return totalPrice;
    }
}

// create product
function createProduct(){
    let newProduct = {
        title: titleInput.value,
        price: priceInput.value,
        tax: taxInput.value,
        ads: adsInput.value,
        discount: discountInput.value,
        total: getTotal(),
        count: countInput.value,
        category: categoryInput.value
    };
    if(titleInput.value !== '' && priceInput.value !== ''){
        // add products by its count
        if(newProduct.count > 1){
            for (let i = 0; i < newProduct.count; i++) {
                products.push(newProduct);
            }
        }
        else{
            products.push(newProduct);
        }
        console.log(products);
        setProductToLocalStorage();
        displayProducts(products);
        productsCount(products);
        clearInputs();
        modal.style.display = 'none';
    }
}

// display the product
function displayProducts(arr){
    let table = '';
    for (let i = 0; i < arr.length; i++) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${arr[i].title}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].tax}</td>
        <td>${arr[i].ads}</td>
        <td>${arr[i].discount}</td>
        <td>${arr[i].total}</td>
        <td>${arr[i].category}</td>
        <td><button class="update-btn" onclick="getProductData(${i});"><i class="fa-regular fa-pen-to-square"></i></button></td>
        <td><button class="delete-btn" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    
    if(arr.length > 0){
        deleteBtn[0].style.display = 'inline-block';
    }else{
        deleteBtn[0].style.display = 'none';        
    }
}


// save the product in local storage
function setProductToLocalStorage(){
    localStorage.setItem('products', JSON.stringify(products));
}

// clear the inputs
function clearInputs(){
    titleInput.value = '';
    priceInput.value = '';
    taxInput.value = '';
    adsInput.value = '';
    discountInput.value = '';
    countInput.value = '';
    categoryInput.value = '';
}

// delete the product from local storage
function deleteProduct(i){
    products.splice(i, 1);
    setProductToLocalStorage();
    displayProducts(products);
    productsCount(products);
}

// delete all products
function deleteAllProducts(){
    products = [];
    setProductToLocalStorage();
    // products.splice(0);
    // localStorage.clear();
    displayProducts(products);
    productsCount(products);
}

// display the number of the products
function productsCount(arr){
    span.innerHTML = arr.length;
    // console.log(products.length)
    const h1 = document.querySelector('h1').appendChild(span);
}

// update the product 
function getProductData(i){
    modal.style.display = 'flex';

    titleInput.value = products[i].title;
    priceInput.value = products[i].price;
    taxInput.value = products[i].tax;
    adsInput.value = products[i].ads;
    discountInput.value = products[i].discount;
    categoryInput.value = products[i].category;

    temp = i;

    countInput.parentElement.style.display = 'none';

    addBtn[1].style.display = 'none';
    updateBtn.style.display = 'inline-block';
}

function updateProduct(){
    products[temp].title = titleInput.value;
    products[temp].price = priceInput.value;
    products[temp].ads = adsInput.value;
    products[temp].tax = taxInput.value;
    products[temp].discount = discountInput.value;
    products[temp].total = getTotal();
    products[temp].count = countInput.value;

    setProductToLocalStorage();
    clearInputs();
    displayProducts(products);
    modal.style.display = 'none';
}

// searching
function search(term){
    if(searchInput.value === ''){
        displayProducts(products);
        productsCount(products);
    }
    else{
        let filteredProducts = [];
        for (let i = 0; i < products.length; i++) {
            if(products[i].title.toLowerCase().includes(term.toLowerCase()) || products[i].category.toLowerCase().includes(term.toLowerCase())){
                filteredProducts.push(products[i]);
            }
        }
        displayProducts(filteredProducts);
        productsCount(filteredProducts);
    }
}

// valid input
function validateInput(input, name){
    if(input.value === ''){
        input.style.setProperty('outline', '1px solid red');
        let span = document.createElement('span')
        span.style.fontSize = '10px';
        span.style.color ='red';
        span.appendChild(document.createTextNode(`${name} must be entered frist`));
        input.parentNode.appendChild(span);
    }
}

//! events
// show model
addBtn[0].onclick = () =>{
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
}

// hide modal
closeBtn.onclick = () => {
    modal.style.display = 'none';
}
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
        console.log(e.key)
        modal.style.display = 'none';
    }
})

// handel title input when no data entered
titleInput.onkeydown = () => {
    titleInput.style.setProperty('outline', 'none');
    titleInput.parentNode.removeChild(document.querySelector('#title + span'));
}

// handel price input when no data entered
priceInput.onkeydown = () => {
    priceInput.style.setProperty('outline', 'none');
    priceInput.parentNode.removeChild(document.querySelector('#price + span'));
}



// add product event
addBtn[1].onclick = () => {
    // validate inputs
    validateInput(titleInput, 'name');
    validateInput(priceInput, 'price');
    createProduct();
}

// delete product event
deleteBtn[0].onclick = () => {
    deleteAllProducts();
}

// update product event
updateBtn.onclick = () => {
    updateProduct();
    const tr = document.querySelectorAll('tr');
    console.log(temp)
    // +1 because table head is considered as tr also
    tr[temp + 1].style.color = 'cadetblue';
}

// search event
searchInput.onkeyup = (e) => {
    search(e.key);
}