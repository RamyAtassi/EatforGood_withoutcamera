const initialState = {};
export default function(allDataFromDB = initialState, action) {

  var allDataFromDBCopy =  {...allDataFromDB};

  if(action.type == 'handleData') {
    allDataFromDBCopy = action.allDataFromDB;
    //console.log("Data reçue de la bdd -->", allDataFromDBCopy, "<-- fin de réception de bdd dans reducer");
    return allDataFromDBCopy;
  }
  
  else {
    return allDataFromDB;
  }
}
