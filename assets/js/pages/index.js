import recipes from "../utils/recipes.js";
import {
  getFunctionalSearchRecipe,
  getNativeSearchRecipe,
} from "../utils/algorithm.js";

const selectedFilters = new Array();

/**
 * Get all the ingredients from all the recipes and return them as an array.
 * @returns An array of strings.
 */
const getIngredients = async () => {
  const ingredients = new Array();
  recipes.forEach((recipe) =>
    recipe.ingredients
      .filter((ingredient) => !ingredients.includes(ingredient.ingredient))
      .forEach((ingredient) => ingredients.push(ingredient.ingredient))
  );
  return ingredients;
};

/**
 * It returns an array of unique appliances.
 * @returns An array of strings.
 */
const getAppliances = async () => {
  const appliances = new Array();
  recipes.forEach((recipe) => {
    if (!appliances.includes(recipe.appliance)) {
      appliances.push(recipe.appliance);
    }
  });
  return appliances;
};

/**
 * Get all the ustensils used in all the recipes
 * @returns An array of ustensils.
 */
const getUstensils = async () => {
  const ustensils = new Array();
  recipes.forEach((recipe) =>
    recipe.ustensils
      .filter((ustensil) => !ustensils.includes(ustensil))
      .forEach((ustensil) => ustensils.push(ustensil))
  );
  return ustensils;
};

const init = async () => {
  const input = document.getElementById("search_recipe");
  const section = document.querySelector(".recipes");
  if (input) {
    const searchRecipe = async (event) => {
      if (event.key === "Enter") {
        const value =
          event.target.value.charAt(0).toUpperCase() +
          event.target.value.slice(1).trim();
        if (section) {
          section.innerHTML = "";

          if (value && value.length >= 3) {
            const searchedRecipes = await getNativeSearchRecipe(recipes, value);
            if (searchedRecipes.length !== 0) {
              createRecipes(searchedRecipes);
            } else {
              const notFound = document.createElement("p");

              section.setAttribute("data-active", true);

              notFound.classList.add(`${section.className}_not_found`);
              notFound.textContent =
                "Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.";

              section.appendChild(notFound);
            }
          } else {
            createRecipes(recipes);
          }
        }
      }
    };
    input.addEventListener("keyup", searchRecipe);
  }
  const createRecipes = async (array) => {
    if (section) {
      section.setAttribute("data-active", false);

      array.forEach((recipe) => {
        if (recipe) {
          const ingredients = recipe.ingredients;

          const card = document.createElement("div");
          const cardImage = document.createElement("div");
          const cardBody = document.createElement("div");
          const cardBodyInline = document.createElement("div");
          const cardBodyInlineSecond = document.createElement("div");
          const cardBodyName = document.createElement("h4");
          const cardBodyTime = document.createElement("div");
          const cardBodyTimeIcon = document.createElement("img");
          const cardBodyTimeCount = document.createElement("h4");
          const cardBodyAbout = document.createElement("ul");
          const cardBodyAboutDescription = document.createElement("p");

          card.classList.add("recipes_card");
          cardImage.classList.add("recipes_card_image");
          cardBody.classList.add("recipes_card_body");
          cardBodyInline.classList.add("recipes_card_body_inline");
          cardBodyInlineSecond.classList.add("recipes_card_body_inline");
          cardBodyName.classList.add("recipes_card_body_name");
          cardBodyTime.classList.add("recipes_card_body_time");
          cardBodyTimeIcon.classList.add("recipes_card_body_time_icon");
          cardBodyTimeCount.classList.add("recipes_card_body_time_count");
          cardBodyAbout.classList.add(`recipes_card_body_about`);
          cardBodyAboutDescription.classList.add(
            `${cardBodyAbout.className}_description`
          );

          cardBodyName.textContent = recipe.name;
          cardBodyTimeCount.textContent = `${recipe.time} min`;
          cardBodyAboutDescription.textContent = recipe.description;

          cardBodyTimeIcon.setAttribute("src", "./assets/icons/clock.svg");
          cardBodyTimeIcon.setAttribute(
            "alt",
            `Temps de recette du ${recipe.name}`
          );

          cardBodyTime.appendChild(cardBodyTimeCount);
          cardBodyTime.appendChild(cardBodyTimeIcon);
          cardBodyTimeCount.before(cardBodyTimeIcon);
          cardBodyInline.appendChild(cardBodyTime);
          cardBodyInline.appendChild(cardBodyName);
          cardBodyName.after(cardBodyTime);
          cardBody.appendChild(cardBodyInline);

          if (ingredients) {
            ingredients.forEach((ingredient) => {
              const cardBodyAboutItem = document.createElement("li");

              cardBodyAboutItem.classList.add(
                `${cardBodyAbout.className}_item`
              );

              cardBodyAboutItem.innerHTML = `<strong>${
                ingredient.ingredient
              }</strong> ${
                ingredient.quantity ? `: ${ingredient.quantity}` : ""
              } ${ingredient.unit ? ingredient.unit : ""}`;

              cardBodyAbout.appendChild(cardBodyAboutItem);
            });
          }

          cardBodyInlineSecond.appendChild(cardBodyAbout);
          cardBodyInlineSecond.appendChild(cardBodyAboutDescription);
          cardBodyInlineSecond.after(cardBody);
          cardBody.appendChild(cardBodyInlineSecond);
          card.appendChild(cardBody);
          cardBody.before(cardImage);
          section.appendChild(card);
        }
      });
    }
  };
  const createCategories = async () => {
    /**
     * It creates a list of items
     */
    const searchRecipe = async (event) => {
      const input = event.target;
      const value =
        input.value.charAt(0).toUpperCase() + input.value.slice(1).trim();
      const lists = input.parentNode.childNodes[5];
      const list = lists.firstChild || document.createElement("ul");
      const items =
        input.id === "ingredients"
          ? await getIngredients()
          : input.id === "appliances"
          ? await getAppliances()
          : await getUstensils();

      /* Adding a class to the list of filters and adding the id of the input to the class. */
      if (!list.classList.contains(input.id)) {
        list.classList.add("filters_categories_item_list");
        list.classList.add(input.id);

        input.parentNode.setAttribute("data-active", true);
        input.placeholder = `Rechercher un ${
          input.id === "ingredients"
            ? "ingrédient"
            : input.id === "appliances"
            ? "appareil"
            : "ustensile"
        }`;
      }

      list.innerHTML = "";

      /* The above code is creating a list of items. */
      const index = items.findIndex((element) => {
        if (element.includes(value)) {
          return true;
        }
      });
      if (value && index !== -1) {
        items
          .filter((item) =>
            item.includes(value.charAt(0).toUpperCase() + value.slice(1).trim())
          )
          .forEach((item) => {
            const element = document.createElement("li");

            element.classList.add("filters_categories_item_list_item");
            element.textContent = item;
            list.appendChild(element);
          });
        /* Adding the list to the lists element. */
        lists.appendChild(list);

        /* Setting the display property of the lists element to "flex". */
        lists.style.display = "block";

        /* Setting the placeholder of the input element. */
        input.placeholder = `Rechercher un ${
          input.id === "ingredients"
            ? "ingrédient"
            : input.id === "appliances"
            ? "appareil"
            : "ustensile"
        }`;
      } else {
        /* It creates a list of items. */
        items.forEach((item) => {
          const element = document.createElement("li");
          element.classList.add("filters_categories_item_list_item");
          element.textContent = item;
          list.appendChild(element);
        });
      }
    };
    /**
     * It creates a list of items
     */
    const handleFilters = async (event) => {
      const input = event.target;
      const item = input.parentNode;
      const value = input.value;
      const lists = input.parentNode.childNodes[5];
      const dataActive = JSON.parse(item.attributes[1].value);
      const activeInputs = document.querySelectorAll(
        ".filters_categories_item_input"
      );

      activeInputs.forEach((activeInput) => {
        const parentInput = activeInput.parentNode;
        const dataActive = Boolean(parentInput.getAttribute("data-active"));

        if (dataActive) {
          const lists = activeInput.parentNode.childNodes[5];
          lists.style.display = "none";
          lists.innerHTML = "";
          activeInput.placeholder = `${
            activeInput.id === "ingredients"
              ? "Ingrédients"
              : activeInput.id === "appliances"
              ? "Appareils"
              : "Ustensiles"
          }`;
          parentInput.setAttribute("data-active", false);
        }
      });

      if (!dataActive) {
        /* Setting the attribute `data-active` to `true` for the input element. */
        item.setAttribute("data-active", true);

        /* It creates a list of items. */
        const items =
          input.id === "ingredients"
            ? await getIngredients()
            : input.id === "appliances"
            ? await getAppliances()
            : await getUstensils();
        const list = document.createElement("ul");

        list.classList.add("filters_categories_item_list");
        list.classList.add(input.id);

        if (!value) {
          /* It creates a list of items. */
          items
            .filter((item) => !selectedFilters.includes(item))
            .forEach((item) => {
              const element = document.createElement("li");
              element.classList.add("filters_categories_item_list_item");
              element.textContent = item;
              element.addEventListener("click", (event) => {
                const filter = event.target.textContent;

                if (!selectedFilters.includes(filter)) {
                  const filters = document.getElementById("filters_selecteds");
                  const span = document.createElement("span");
                  const deleteButton = document.createElement("img");

                  if (selectedFilters.length === 0) {
                    filters.style.display = "flex";
                  }

                  deleteButton.addEventListener("click", (event) => {
                    const filter = event.target.textContent;
                    const newFilters = selectedFilters.findIndex((item) => item.includes(filter));

                    selectedFilters.splice(newFilters, 1);

                    filters.removeChild(span);
                    list.appendChild(element);

                    if (selectedFilters.length === 0) {
                      filters.style.display = "none";
                    }
                  });

                  deleteButton.setAttribute("src", "../assets/icons/close.svg");

                  deleteButton.classList.add("filters_selecteds_filter_delete");
                  span.classList.add("filters_selecteds_filter");
                  span.classList.add(input.id);

                  span.textContent = filter;

                  span.appendChild(deleteButton);
                  filters.appendChild(span);

                  list.removeChild(element);

                  selectedFilters.push(filter);
                }
              });
              list.appendChild(element);
            });
        } else {
          const item = document.createElement("li");
          const index = items.findIndex(
            (item) => item === value.charAt(0).toUpperCase() + value.slice(1)
          );
          item.classList.add("filters_categories_item_list_item");
          item.textContent = items[index];
          list.appendChild(item);
        }

        /* Adding the list to the lists element. */
        lists.appendChild(list);

        /* Setting the display property of the lists element to "flex". */
        lists.style.display = "block";

        /* Setting the placeholder of the input element. */
        input.placeholder = `Rechercher un ${
          input.id === "ingredients"
            ? "ingrédient"
            : input.id === "appliances"
            ? "appareil"
            : "ustensile"
        }`;
      } else {
        item.setAttribute("data-active", false);

        lists.style.display = "none";
        lists.innerHTML = "";

        input.placeholder = `${
          input.id === "ingredients"
            ? "Ingrédients"
            : input.id === "appliances"
            ? "Appareils"
            : "Ustensiles"
        }`;
      }
    };

    const inputs = document.querySelectorAll(".filters_categories_item_input");
    inputs.forEach((input) => {
      input.addEventListener("keyup", searchRecipe);
      input.addEventListener("click", handleFilters);
    });
  };
  createCategories();
  createRecipes(recipes);
};

init();
