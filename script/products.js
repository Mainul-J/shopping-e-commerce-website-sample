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
    console.log(categoryContainer);
    for (const category of categories) {
        console.log(category);




    }
}

loadCategoryBtns()