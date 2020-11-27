const donationReducer = (state = [], action) => {
  switch(action.type) {
      case 'DONATION_ADD_REQUESTED':
        return {...state, updateOrCreate: "attempt"}
      case 'DONATION_ADD_SUCCESS':
        var list = state.list;
        list.push(action.data);
        return {...state, list, updateOrCreate: "success" };
      case 'DONATION_UPDATE_SUCCESS':
        var item = action.data.item;
        item.user = action.data.user;
        item.gift = action.data.gift;
        state.list = state.list.map(k => k.id==item.id ? item : k)
        return {...state}
      case 'DONATION_UPDATE_REQUESTED':
        return {...state, updateOrCreate: "attempt"}
      case 'DONATION_LIST_SUCCESS':
        return {...state, list: action.data};
      case 'DONATION_DELETE_SUCCESS':
        console.log(">>DONATION_DELETE_SUCCESS.action", action)
        if (state.list) {
          state.list = state.list.filter(item => item.id != action.id);
        }
        return {...state};
      case 'DONATION_DETAIL_SUCCESS':
        return {...state, detail: action.data};
      default:
        return state;
    }
}
export default donationReducer;
