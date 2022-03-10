fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=egg`)
  .then((response) => response.json())
  .then((data) => console.log(data));
