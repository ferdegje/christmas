const giftReducer = (state = [], action) => {
  switch(action.type) {
      case 'GIFT_ADD_SUCCESS':
        console.log(">>GIFT_ADD_SUCCESS.action", JSON.stringify(action, null, 2))
        var list = state.list;
        list.unshift(action.data);
        return {...state, list, updateOrCreate: "success" };
      case 'GIFT_UPDATE_SUCCESS':
        console.log(">>>GIFT_UPDATE_SUCCESS.action", action);
        console.log(">>>GIFT_UPDATE_SUCCESS.state", state);
        state.detail = action.data.item;
        state.detail.user = action.data.user;
        state.detail.target_beneficiary = action.data.target_beneficiary;
        return {...state, updateOrCreate: "success"}
      case 'GIFT_UPDATE_REQUESTED':
        return {...state, updateOrCreate: "attempt"}
      case 'GIFT_LIST_SUCCESS':
        console.log("Received GIFT_LIST_SUCCESS");
        console.log(">>GIFT_LIST_SUCCESS.action", JSON.stringify(action, null, 2))
        return {...state, list: action.data};
      case 'GIFT_DETAIL_SUCCESS':
        return {...state, detail: action.data};
      case 'GIFT_URLDETAILS_SUCCESS':
        var url = {
          description: action.data.description,
          title: action.data.title,
          url: action.data.url,
        };
        return {...state, url};
      default:
        console.log(action);
        return state;
    }
}
export default giftReducer;
