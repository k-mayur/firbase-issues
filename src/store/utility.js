export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues,
    loading: false
  };
};
