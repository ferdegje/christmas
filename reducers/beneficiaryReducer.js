const beneficiaryReducer = (state = [], action) => {
  switch(action.type) {
      case 'BENEFICIARY_ADD_SUCCESS':
        console.log(action);
        return state.concat([action.data]);
      case 'EDIT_BENEFICIARY':
        return state.map((item)=>item.id === action.id ? {...item,editing:!item.editing}:item)
      case 'BENEFICIARY_LIST_SUCCESS':
        return action.data;
      case 'BENEFICIARY_DELETE_SUCCESS':
        return state.filter((item)=>item.id !== action.id);
      case 'BENEFICIARY_UPDATE_SUCCESS':
        console.log("state");
        console.log(state);
        console.log(action);
        return state.map((item)=>item.id === action.data.id ? {...item,nickname:action.data.nickname,editing:false}:item)
      default:
        return state;
    }
}
export default beneficiaryReducer;
