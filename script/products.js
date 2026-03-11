// alert('ok')
// git 
// echo "# shopping-e-commerce-website-sample" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Mainul-J/shopping-e-commerce-website-sample.git
// git push -u origin main


const loadCategoryBtns =async()=>{
try {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const data =await res.json();
    console.log(data);
    displayCatBtns(data)
} catch (error) {
    return '7 lin of code'
}
}


const displayCatBtns = (categories) =>{
    const categoryContainer = document .getElementById('category-btn');
    removeActive()
    const allBtn = document.createElement('button')
    allBtn.textContent = 'All'
    allBtn.className = 'btn active'
    categoryContainer.append(allBtn)
    console.log(categoryContainer);
    for (const category of categories) {
        console.log(category);
    const btn = document.createElement('button');
    btn.textContent = category;
    btn.className = 'btn';
    btn.addEventListener('click',()=>{
        removeActive()
        btn.classList.add('active')
    })
    categoryContainer.append(btn)
    }
}

loadCategoryBtns()