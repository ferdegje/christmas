const giftReducer = (state = [], action) => {
  switch(action.type) {
      case 'GIFT_LIST_SUCCESS':
        console.log("Received GIFT_LIST_SUCCESS");
        return state;
      default:
        console.log(action);
        return state;
    }
}
export default giftReducer;
