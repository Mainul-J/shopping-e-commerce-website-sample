// alert('working..');
const removeActive = () => {
    const activeBtns = document.querySelectorAll('.active');
    activeBtns.forEach(active => {
    active.classList.remove('active')
    });
}


const navBtnActive = () =>{
    const btns = document.querySelectorAll('li a')
    btns.forEach(btn => {
        
        btn.addEventListener('click',(e)=>{
            e.preventDefault();
            removeActive()
            console.log(e.target.innerText);
            btn.classList.add('active');
            if (e.target.innerText.toUpperCase() === 'products'.toUpperCase() ) {
                window.location.href='products.html'
            } else {
                window.location.href='home.html'
            }
        })
    });
    
}
navBtnActive()


let cartItem = JSON.parse(localStorage.getItem('cart')) || [];

// remove item from cart 
const removeItem = (id) => {
    cartItem = cartItem.filter(item => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(cartItem));

    document.getElementById('cart-count').innerText = cartItem.length;
 
    displayItemInDrawer(cartItem);
    updateTotal();
}
const updateTotal = () => {

    const total = cartItem.reduce((sum,item)=> sum + item.price ,0);

    document.getElementById("total-price").innerText = total.toFixed(2);

}



// const cartItem = [];
const openDrawer =()=>{
    const drawer = document.getElementById('my-drawer-5');
    drawer.checked = !drawer.checked;
}

// shopping cart 

const shoppingCart =document.getElementById('shopping-cart');
shoppingCart.addEventListener('click',()=>{
    let cartCount = document.getElementById('cart-count').innerText;
    console.log(cartCount);
            // const count = cartCount.innerText;
            cartCount = Number(cartItem.length)
            console.log(cartCount);
        if (parseInt(cartCount) > 0) {
        console.log(typeof parseInt(cartCount));
        openDrawer();
    }

});

const loadCart = async(id) =>{
try {
        const url = `https://fakestoreapi.com/products/${id}`;
        const res = await fetch(url);
        const data = await res.json() ;
        cartItem.push(data)
        // console.log(cartItem);
        localStorage.setItem('cart',JSON.stringify(cartItem));
        document.getElementById('cart-count').innerText = cartItem.length;
        displayItemInDrawer(cartItem)
        updateTotal();
    } catch (error) {
        return `error`;
    }
}


// load trending item by using api
const loadTrend = async() =>{
    try {
        const res =await fetch('https://fakestoreapi.com/products');
        const data =await res.json();
        displayTrend(data);
    } catch (error) {
        return `loadTrend error`
    }
};

// add cart on click and load data
const loadDetails =async (id)=>{
    try {
        const url = `https://fakestoreapi.com/products/${id}`;
        const res = await fetch(url);
        const data = await res.json() ;
        // console.log(data);
        displayModal(data);

    } catch (error) {
        return `error`;
    }
};

const displayModal = (details) =>{
    console.log(details);
    const modal = document.getElementById('my_modal_2');
    modal.showModal();
    const container = document.getElementById('modal-box');
    console.log(container);
    container.innerHTML = `
<div class=" image-full rounded w-full shadow-sm">
  <figure class="">
    <img
      src=${details.image} class=""/>
  </figure>
  <div class="card-body mt-40">
  <h2 class="card-title"><i class="fa-solid fa-star"></i>${details.rating.rate} </h2>
    <h2 class="card-title">${details.title}</h2>
    <p>${details.description}</p>
    <div class="card-actions justify-between">
    <h2 class="card-title">$${details.price}</h2>
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    `
};

// display cart item in drawer 
const displayItemInDrawer = (items) =>{
    console.log(items);
    const container = document.getElementById('cart-container');
    container.innerHTML ='';
    const div = document.createElement('div')
    div.innerHTML = `<li class="font-bold text-center text-xl">Selected Products</li>`;
    container.append(div);
    items.forEach(item => {
        console.log(item);
    
    
    const li = document.createElement('li');
    li.innerHTML =`
    <div class="flex gap-3 bg-sky-300">
  <img src="${item.image}" alt="" class="h-10 w-10">
  <h3 class="">${item.title.slice(0,20)+'...'}</h3>
  <h2 class="">$${item.price}</h2>
    <button onclick="removeItem(${item.id})" 
    class="bg-red-500 text-white px-2 rounded">
    X
    </button>
</div>
    `;
    container.append(li);
    });

        const div2 = document.createElement('div');
    div2.innerHTML =`
    Total: $<span id="total-price">0</span>
    `
    container.append(div2);
}

// display trending section dynamically by using api 
const displayTrend = (arrays) => {
    const trendContainer = document.getElementById('trend');
    // Collect hightest 3 rating products
    //products in an array 
    const products = [...arrays].sort((a,b)=>b.rating.rate - a.rating.rate) ;
    console.log(products.slice(0,3));
    products.slice(0,3).forEach(product=>{
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="card bg-base-100 shadow-sm p-4 bg-gray-400">
  <figure class="bg- rounded p-1">
    <img
      src="${product.image}"
      alt="Shoes"
      class="rounded-xl p-10 w-[300px] h-[400px] border-white border-b border-t" />
  </figure>
  <div class="items-center border-white">
    <div class="flex  pt-1 justify-between ">
        <h2 class="bg-blue-300 text-white px-2 rounded font-semibold">${product.category}</h2>
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
        trendContainer.append(card)
    });

};


displayItemInDrawer(cartItem);
document.getElementById('cart-count').innerText = cartItem.length;
updateTotal();

loadTrend()

