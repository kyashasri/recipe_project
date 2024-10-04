const searchbox=document.querySelector(".searchbox");
const searchbtn=document.querySelector(".searchbtn");
const recipeContainer=document.querySelector(".recipe-container.rcont");
const recipeDetailscont=document.querySelector(".recipe-details-cont");
const recipeClosebtn=document.querySelector(".recipe-closebtn");
const recipeDetails=document.querySelector(".recipe-details");

recipeClosebtn.classList.add("btn-style");



//closing the recipebox
recipeClosebtn.addEventListener("click",()=>{
    recipeDetails.style.display="none";
})





//fetching recipes in api and displaying img,name..

const fetchRecipes= async (query)  => {
    recipeContainer.innerHTML="";
    recipeContainer.classList.remove("rcont");

    recipeContainer.innerHTML="<h2 style='color:white; font-size:30px'<b>Fetching Recipes..</b></h2>";
    try{
        const response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data= await response.json();
        console.log(data);

        recipeContainer.innerHTML= "";
        data.meals.forEach( meal => {
            const recipediv =document.createElement('div');
            recipediv.classList.add('recipe');
            recipediv.innerHTML=`
            <img src="${meal.strMealThumb}">
            <h3> ${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p> Belongs to <span>${meal.strCategory}</span> Category</p>
            `
            const button = document.createElement('button');
            button.textContent="View Recipe";
            recipediv.appendChild(button);

            //adding event listener
            button.addEventListener('click',()=>{
                openRecipePopUp(meal);
            })
            recipeContainer.appendChild(recipediv);
        });
    }
    catch(error){
        recipeContainer.innerHTML=`<h2 style="color:white; font-size:30px;">Error in Fetching Recipes...</h2>`;
    }
}

//Fuction to fetch ingredients
const fetchIngredients=(meal)=>{
    let ingredientsList="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient)
        {
            const measure=meal[`strMeasure${i}`];
            ingredientsList +=`<li>${measure} ${ingredient}</li>`;
        }
       
        else
            break;   
    }

    return ingredientsList;
        
}


//funtion to print ingredients and so on
const openRecipePopUp=(meal)=>{
    console.log(meal);
    recipeDetailscont.innerHTML=`
    <h2 class="heading">${meal.strMeal}</h2>
    
    <div class="ingreList">
    <h3 >Ingrediants:</h3>
    <ul>${fetchIngredients(meal)}</ul>
    </div>

    <div class="instruct">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
    document.getElemnet
    recipeDetailscont.parentElement.style.display="block";
}


//adding on click event to search the preferred item
searchbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const searchvalue=searchbox.value.trim();
    if(!searchvalue)
        {
            recipeContainer.innerHTML=`<h2>Type a meal in the search box.</h2>`
            return;
        }
    
    fetchRecipes(searchvalue);
})