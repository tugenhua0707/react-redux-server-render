import { LOADED_USERS } from '../actions/index';

export default function user(state = {
  users: []
},action) {
  switch (action.type) {
    case LOADED_USERS:
      const { users } = action;
      return Object.assign({},state, {
        users
      });
    default:
      return state;
  }
}
