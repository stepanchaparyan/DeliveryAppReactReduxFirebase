const initState = {}

const shopReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_SHOP_SUCCESS':
      console.log('add_shop success');
      return state;
    case 'ADD_SHOP_ERROR':
      console.log('add_shop error');
      return state;
    default:
      return state;
  }
};

export default shopReducer;