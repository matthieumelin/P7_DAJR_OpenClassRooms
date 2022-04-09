/**
 * It takes in an array of recipes and a value, and returns an array of recipes that match the value.
 * 
 * The function is a bit long, but it's not too complicated.
 * 
 * It uses the Array.prototype.filter() method to filter the recipes array.
 * 
 * The filter method takes in a callback function that returns a boolean.
 * 
 * If the callback function returns true, the element is added to the new array.
 * 
 * If the callback function returns false, the element is not added to the new array.
 * 
 * The callback function checks if the recipe name, description, or any of the ingredients match the
 * value.
 * 
 * If any of those match, the recipe is added to the new array.
 * 
 * If none of those match, the recipe is not added to the new array.
 * 
 * The function returns the new array.
 * @param recipes - an array of objects
 * @param value - the value of the search input
 * @returns An array of recipes that match the search criteria.
 */
export const getFunctionalSearchRecipe = async (recipes, value) => {
  const searchedRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(value.toLowerCase()) ||
      recipe.description.toLowerCase().includes(value.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(value.toLowerCase())
      )
  );
  return searchedRecipes;
};

/**
 * It takes an array of recipes and a search value, and returns an array of recipes that match the
 * search value.
 * @param recipes - Array of objects
 * @param value - the search value
 * @returns An array of recipes that match the search criteria.
 */
export const getNativeSearchRecipe = async (recipes, value) => {
  const searchedRecipes = new Array();
  for (const recipe of recipes) {
    if (
      recipe.name.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
      recipe.description.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
      recipe.ingredients.indexOf(value.charAt(0).toUpperCase() + value.slice(1).trim()) >= 0
    ) {
      searchedRecipes.push(recipe);
    }
  }
  return searchedRecipes;
};
