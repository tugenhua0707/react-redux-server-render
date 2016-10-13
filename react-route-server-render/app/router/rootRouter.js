import React from 'react';
import Route from 'react-router';

import App from '../components/app';
import Index from '../components/index';

if(typeof require.ensure !== 'function') {
  require.ensure = (d,c) => c(require);
}
export default {
  path:  '/',
  component: App,
  getChildRoutes(location,cb) {
    require.ensure([], (require) => {
       cb(null, [ require('./aboutRouter') ])
    })
  },
  indexRoute: {
    component: Index
  }
}