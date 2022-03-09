//selectors
const container = document.querySelector(".container");
const searchForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const searchResultSection = document.querySelector(".serach-result");
let searchInputValue;

//form submit

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchInputValue = searchInput.value;
  console.log(searchInputValue);
  searchForm.reset();
});
