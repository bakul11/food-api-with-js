document.getElementById('searchBtn').addEventListener('click', function () {
    const searchInput = document.getElementById('searchInput').value;
    //if Search Input Empty
    if (searchInput == '') {
        const errorSearch = document.getElementById('errorSearch');
        errorSearch.innerText = 'Please type foods name and try aggain';
    }
    else {
        //load Data form The MealDB
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
            .then(res => res.json())
            .then(data => handleLoadProduct(data.meals))

        //Clear Input value
        document.getElementById('searchInput').value = '';
        //clear Error Message
        document.getElementById('errorSearch').innerText = '';
    }
})




/*
===================================
    Handle Product Load Function
===================================
*/
const handleLoadProduct = (allProduct) => {
    const showProductUi = document.getElementById('showProduct');
    //Clear new added product
    showProductUi.innerHTML = '';
    allProduct.map(product => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card">
            <img src="${product.strMealThumb}" class="card-img-top" alt="..." style="height:200px">
            <div class="card-body">
                <a href="#" class="card-title fw-bold fs-5" onclick="handleProductClick(${product.idMeal})">${product.strMeal}</a>
                <p class="card-text text-secondary">${product.strInstructions.slice(0, 150)}</p>
                <a href="${product.strYoutube}" class="btn btn-primary mt-2 text-capitalize">watch product</a>
            </div>
        </div>
        `
        showProductUi.appendChild(div);
    })
}

/*
===================================
    Handle Product Click Function
===================================
*/

const handleProductClick = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            const productInfo = data.meals[0];
            const showDetails = document.getElementById('showDetails');
            showDetails.innerHTML = `
             <h3 class="fw-bold text-center text-decoration-underline mb-4">Product Details</h3>
            <div class="card">
                <img src="${productInfo.strMealThumb}" class="card-img-top" alt="..." style="height:500px">
                <div class="card-body">
                    <a href="#" class="card-title fw-bold fs-5">${productInfo.strMeal}</a>
                    <p class="card-text text-secondary">${productInfo.strInstructions}</p>
                    <p class="card-text text-secondary"><span class="text-primary fw-bold">Product Code : </span>${productInfo.idMeal}</p>
                    <p class="card-text text-secondary"><span class="text-primary fw-bold">Making By : </span>${productInfo.strArea}</p>
                    <a href="${productInfo.strYoutube}" class="btn btn-success mt-2 text-capitalize">watch product</a>
                </div>
            </div>
            `
        })
}