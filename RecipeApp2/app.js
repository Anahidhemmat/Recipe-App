//selectors
const searchForm = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const searchResultContainer = document.querySelector(".results");
const notFoundText = document.querySelector(".not-found");
const mealRecipe = document.querySelector(".meal-details");
const recipeName = document.querySelector(".recipe-name");
const recipeCategory = document.querySelector(".category-name");
const recipeInstruction = document.querySelector(".recipe-ins");
const recipeImg = document.querySelector(".recipe-img");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
const youtubeLink = document.querySelector(".recipe-youtube");

//event listeners
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getMeal();
  searchForm.reset();
});
recipeCloseBtn.addEventListener("click", () => {
  mealRecipe.classList.remove("display");
});
// get meals
const getMeal = () => {
  const searchValue = searchInput.value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        data.meals.forEach((meal) => {
          // item
          const item = document.createElement("section");
          item.classList.add("item");
          item.setAttribute("data-id", meal.idMeal);
          // img
          const imgSection = document.createElement("section");
          imgSection.classList.add("meal-img");
          const foodImg = document.createElement("img");
          foodImg.src = meal.strMealThumb;
          imgSection.append(foodImg);

          //meal name and btn
          const aboutMealsection = document.createElement("section");
          aboutMealsection.classList.add("about-meal");
          const mealName = document.createElement("h2");
          mealName.classList.add("meal-name");
          mealName.innerText = meal.strMeal;
          const viewRecipeBtn = document.createElement("a");
          viewRecipeBtn.href = "#";
          viewRecipeBtn.classList.add("view-recipe-btn");
          viewRecipeBtn.innerText = "view recipe";
          viewRecipeBtn.addEventListener("click", (e) => {
            const mealId = e.target.parentElement.parentElement;
            console.log(mealId.dataset.id);
            fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId.dataset.id}`
            )
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                mealRecipe.classList.add("display");
                recipeName.innerText = data.meals[0].strMeal;
                recipeCategory.innerText = data.meals[0].strCategory;
                recipeInstruction.innerText = data.meals[0].strInstructions;
                recipeImg.src = data.meals[0].strMealThumb;
                youtubeLink.href = data.meals[0].strYoutube;
              });
          });
          //append
          aboutMealsection.append(mealName, viewRecipeBtn);
          item.append(imgSection, aboutMealsection);
          searchResultContainer.append(item);

          notFoundText.classList.remove("show");
        });
      } else {
        notFoundText.classList.add("show");
      }
    });
};
