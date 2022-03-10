//selectors
const searchForm = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const searchResultContainer = document.querySelector(".results");
const notFoundText = document.querySelector(".not-found");
let item;

// get meals

const getMeal = () => {
  const searchValue = searchInput.value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        data.meals.forEach((meal) => {
          // item
          item = document.createElement("section");
          item.classList.add("item");
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

//event listeners
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getMeal();
  searchForm.reset();
});
// const getMeal = async () => {
//   const searchValue = searchInput.value;
//   const response = await fetch(
//     `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`
//   );
//   const data = response.json();
//   console.log(data);
// };

// fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=egg`)
//   .then((response) => response.json())
//   .then((data) => console.log(data));
