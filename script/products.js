// alert('ok')
// git 
// echo "# shopping-e-commerce-website-sample" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Mainul-J/shopping-e-commerce-website-sample.git
// git push -u origin main

// category btns load by dynamically 
const loadCategoryBtns =async()=>{
try {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const data =await res.json();
    // console.log(data);
    displayCatBtns(data);
} catch (error) {
    return '7 lin of code'
};
};
// loadProductsByCategory 
const loadCategoryByCategory = async(category) =>{
// console.log(category);
const url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`

try {
    const res =await fetch(url);
    const data = await res.json();
    displayProducts(data);
} catch (error) {
    
}


}
// loadAllProducts by default 
const loadAllProducts = async() =>{
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        displayProducts(data);
    } catch (error) {
        console.log('30 line of code ');
    }
}

// loadAllProducts()


// display categories btn  dynamically 
const displayCatBtns = (categories) =>{
    const categoryContainer = document .getElementById('category-btn');
    categoryContainer.innerHTML ='';
    const allBtn = document.createElement('button')
    allBtn.textContent = 'All';
    allBtn.className = 'btn active';
    categoryContainer.append(allBtn)
    allBtn.addEventListener('click',()=>{
        removeActive();
        allBtn.classList.add('active');
        loadAllProducts();
    })
    console.log(categoryContainer);
    for (const category of categories) {
        console.log(category);
    const btn = document.createElement('button');
    btn.textContent = category;
    btn.className = 'btn';
    btn.addEventListener('click',()=>{
        removeActive();
        btn.classList.add('active');
        loadCategoryByCategory(category)
    });
    categoryContainer.append(btn);
    };
};


// display all products in ui
const displayProducts = (products) =>{
    const productsDiv = document.getElementById('section-cards');
    console.log(productsDiv);
    productsDiv.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 shadow-sm p-4 bg-gray-400">
  <figure class="bg- rounded p-1">
    <img
      src="${product.image}"
      alt="Shoes"
      class="rounded-xl p-10 w-[300px] h-[400px] border-white border-b border-t" />
  </figure>
  <div class="items-center border-white">
    <div class="flex  pt-1 justify-between ">
        <h2 class="bg-blue-300 text-white px-2 rotunded font-semibold">${product.category}</h2>
        <h2 class="bg-blue-300 px-2 text-white rounded font-medium"><i class="fa-regular fa-star p-1 text-orange-300"></i>${product.rating?.rate} <span>(${product.rating?.count})</span></h2>

    </div>
    <div class="grid gap-2 pt-2">
        <h2 class="font-semibold text-white">${product.title.slice(0,30)}</h2>
        <h2 class="font-semibold text-white">$${product.price}</h2>
    </div>
    <div  class="flex justify-between pt-1">
        <button onclick="loadDetails(${product.id})" class="btn bg-blue-400 text-white">
        <i class="fa-solid fa-eye"></i> Details
    </button>

        <button onclick="loadCart(${product.id})" class="btn bg-blue-400 text-white"><i class="fa-solid fa-cart-shopping"></i>Add</button>
    </div>
    </div>
    </div>
`;


    // <p>${el.description.slice(0, 100)}</p>
    productsDiv.appendChild(div)
    });

}
loadAllProducts()
loadCategoryBtns()