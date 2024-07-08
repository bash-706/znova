const categoryToOption = (category) => ({
  value: category?._id,
  label: category?.name,
});

const categoriesToOptions = (categories) => {
  const options = [{ value: 'all', label: 'All' }];
  const categoryOptions = categories
    ?.filter((category) => category.slug !== 'general')
    ?.map((category) => ({
      value: category?.slug,
      label: category?.name,
    }));

  return options.concat(categoryOptions);
};

const fieldsToOption = (tags) => {
  return tags?.map((tag) => ({ value: tag, label: tag }));
};

const filterCategories = (inputValues, categoriesData) => {
  const filteredOptions = categoriesData
    ?.map((data) => categoryToOption(data))
    ?.filter((category) => {
      return category?.label
        ?.toLowerCase()
        .includes(inputValues?.toLowerCase());
    });
  return filteredOptions;
};

function convertTagsArray(tagsArray) {
  return tagsArray.map((tag) => tag.value);
}

export {
  filterCategories,
  categoryToOption,
  fieldsToOption,
  convertTagsArray,
  categoriesToOptions,
};
