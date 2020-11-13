const beneficiaryReducer = (state = [], action) => {
  switch(action.type) {
      case 'ADD_BENEFICIARY':
        return state.concat([action.data]);
      case 'EDIT_BENEFICIARY':
        return state.map((item)=>item.id === action.id ? {...item,editing:!item.editing}:item)
      case 'DELETE_BENEFICIARY':
        return state.filter((item)=>item.id !== action.id);
      case 'UPDATE_BENEFICIARY':
        return state.map((item)=>item.id === action.id ? {...item,nickname:action.data.nickname,editing:!item.editing}:item)
      default:
        return state;
    }
}
export default beneficiaryReducer;
