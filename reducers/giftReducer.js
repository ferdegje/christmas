const giftReducer = (state = [], action) => {
  switch(action.type) {
      case 'GIFT_LIST_SUCCESS':
        console.log("Received GIFT_LIST_SUCCESS");
        return state;
      case 'GIFT_URLDETAILS_SUCCESS':
        console.log("REDUCER GIFT");
        var state;
        if (action.data) {
          state = {
            description: action.data.description,
            title: action.data.title,
            url: action.data.url,
          };
        }
        console.log(state);
        return state
      default:
        console.log(action);
        return state;
    }
}
export default giftReducer;
