
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app';
import item from './item';
import user from './user';

//react-router-redux  https://github.com/reactjs/react-router-redux 
// 作用：APP 只有一个 state 而路由自然也是 state 的一部分， 使用这个类库可以同步 
// react-router 中的 router 信息到 redux 的 state 中统一管理。

const rootReducer = combineReducers({
  app,
  item,
  user,
  routing: routerReducer
});

export default rootReducer;