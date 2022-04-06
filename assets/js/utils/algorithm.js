/**
 * It creates a list of items
 */
export const functionalSearchRecipe = async (items, value, list) => {
  const index = items.findIndex((element) => {
    if (element.includes(value)) {
      return true;
    }
  });
  if (index !== -1) {
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
 * It searches for a value in an array and returns the index of the value. If the value is not found,
 * it returns -1.
 */
export const nativeSearchRecipe = async (items, value, list) => {
  let index = -1;
  for (let i = 0; i < items.length; i++) {
    if (items[i] === value) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (items.indexOf(value.charAt(0).toUpperCase() + value.slice(1).trim()) >= 0) {
        const element = document.createElement("li");
        element.classList.add("filters_categories_item_list_item");
        element.textContent = item;
        list.appendChild(element);
      }
    }
  }
};
