const CommentReducer = (state = [], action) => {
  switch(action.type) {
      case 'COMMENT_ADD_REQUESTED':
        return {...state, updateOrCreate: "attempt"}
      case 'COMMENT_ADD_SUCCESS':
        // console.log(">>COMMENT_ADD_SUCCESS.action", JSON.stringify(action, null, 2))
        var list = state.list;
        list.push(action.data);
        return {...state, list, updateOrCreate: "success" };
      case 'COMMENT_UPDATE_SUCCESS':
        return {...state, updateOrCreate: "success"}
      case 'COMMENT_UPDATE_REQUESTED':
        return {...state, updateOrCreate: "attempt"}
      case 'COMMENT_LIST_SUCCESS':
        // console.log("Received COMMENT_LIST_SUCCESS");
        // console.log(">>COMMENT_LIST_SUCCESS.action", JSON.stringify(action, null, 2))
        return {...state, list: action.data};
      case 'COMMENT_DELETE_SUCCESS':
        console.log(">>COMMENT_DELETE_SUCCESS.action", JSON.stringify(action, null, 2))
        if (state.list) {
          state.list = state.list.filter(item => item.id != action.id);
        }
        return {...state};
      case 'COMMENT_DETAIL_SUCCESS':
        return {...state, detail: action.data};
      default:
        return state;
    }
}
export default CommentReducer;
