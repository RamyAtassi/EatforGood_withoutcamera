export default function(userSaved = {}, action) {

  var userSavedCopy =  {...userSaved}
  if(action.type == 'facebook') {
    userSavedCopy.name = action.name;
    userSavedCopy.image = action.image;
    userSavedCopy.email = action.email;
    return userSavedCopy;
  }
  
  else if(action.type = 'disconnect') {
    return userSaved = {};
  }
}
