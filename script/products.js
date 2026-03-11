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
    products.forEach(el => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-red-100 w-96 h-[500px]  shadow-sm">
  <figure class="p-10">
    <img
      src=${el.image}
      alt="Shoes" class="h-[350px] object-contain w-full p-10" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${el.title.slice(0,40)}</h2>
    <p class="text-xl font-medium">$${el.price}</p>
    <div class="card-actions justify-between">
      <button onclick="loadDetails(${el.id})" class="btn btn-primary">Details</button>
      <button onclick="loadAdd(${el.id})" class="btn btn-primary">Add</button>
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