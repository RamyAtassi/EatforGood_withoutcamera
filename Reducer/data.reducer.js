const initialState = {};
export default function(data = initialState, action) {
  var dataCopy = { ...data };

  if (action.type == 'search') {
    dataCopy.Food = action.Food;
    dataCopy.Local = action.Local;
    dataCopy.France = action.France;
    dataCopy.Europe = action.Europe;
    dataCopy.Monde = action.Monde;
    dataCopy.Quantity = action.Quantity;
    console.log('Choix effectués: --->', dataCopy, '<---');

    return dataCopy;
  } else if (action.type == 'takePicture') {
    dataCopy.dataFromCamera = action.dataFromCamera;
    //console.log("Dans le reducer, data retournée par Amazon: --->", dataCopy.dataFromCamera, "<---")
    return dataCopy;
  } else if (action.type == 'foodConfirmation') {
    dataCopy.chosenFood = action.food;
    //console.log("Aliment Choisi: -->", dataCopy.chosenFood, "<---");
    return dataCopy;
  } else if (action.type == 'choiceScreen') {
    dataCopy.Local = action.Local;
    dataCopy.France = action.France;
    dataCopy.Europe = action.Europe;
    dataCopy.Monde = action.Monde;
    dataCopy.Quantity = action.Quantity;
    console.log('Choix effectués: --->', dataCopy, '<---');
    return dataCopy;
  } else if (action.type == 'origin') {
    dataCopy.dataFood = action.origin;
    //console.log("Reducer - Provenance choisie: --->", dataCopy.dataFood, "<---")
    return dataCopy;
  } else {
    return data;
  }
}
