
import React from 'react';
import Route from 'react-router';

import App from '../components/app';
import Items from '../components/items';
import Users from '../components/users';

if(typeof require.ensure !== 'function') {
  require.ensure = (d,c) => c(require);
}
const itemsRouter = require('./itemsRouter');
const usersRouter = require('./usersRouter');

export default {
  path:  '/',
  component: App,
  getChildRoutes(location,cb) {
    require.ensure([], (require) => {
       cb(null, [itemsRouter, usersRouter])
    })
  },
  indexRoute: {
    //component: Index
  }
}