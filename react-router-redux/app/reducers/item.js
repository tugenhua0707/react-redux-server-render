import { LOADED_ITEMS } from '../actions/index';

export default function items(state = {
  items: []
},action) {
  switch(action.type) {
    case LOADED_ITEMS:
      const { items } = action;
      return Object.assign({}, state, {
        items
      });
    default:
      return state;
  }
}