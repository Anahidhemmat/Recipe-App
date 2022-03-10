//selectors

const searchBtn = document.querySelector("#search-btn");
const mealList = document.querySelector("#meal");
const mealDetailContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
// const searchInput = document.querySelector(".search-control");

//event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetailContent.parentElement.classList.remove("showRecipe");
});

// function getMealList() {
//   const searchValue = searchInput.value;
//   fetch(`www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     });
// }

//get meals
function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add("notFound");
      }

      mealList.innerHTML = html;
    });
}

// get meals recipe

function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  let html = `
  <h2 class = "recipe-title">${meal.strMeal}</h2>
          <p class = "recipe-category">${meal.strCategory}</p>
          <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
          </div>
          <div class = "recipe-meal-img">
            <img src =${meal.strMealThumb} alt = "">
          </div>
          <div class = "recipe-link">
            <a href = "#" target = "_blank">${meal.strYoutube}</a>
          </div> 
  `;
  mealDetailContent.innerHTML = html;
  mealDetailContent.parentElement.classList.add("showRecipe");
}
