const beneficiaryReducer = (state = [], action) => {
  switch(action.type) {
      case 'USER_UPDATE_SUCCESS':
        console.log("Received USER_UPDATE_SUCCESS");
        return {displayAlert: true}
      default:
        console.log(action);
        return state;
    }
}
export default beneficiaryReducer;
