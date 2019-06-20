export default (foodSaved = [], action) => {
  var foodSavedCopy = [...foodSaved];
  if (action.type == 'dataSavedFromInput') {
    foodSavedCopy = action.foodSaved;
    //console.log('Dans le reducer foodSaved -->', foodSavedCopy, '<--- fin du Reducer foodSaved');
    return foodSavedCopy;
  } else if (action.type == 'dataSavedFromCamera') {
    foodSavedCopy = action.foodSaved;
    //console.log('Dans le reducer foodSaved -->', foodSavedCopy, '<--- fin du Reducer foodSaved');
    return foodSavedCopy;
  } else {
    return foodSaved;
  }
};
