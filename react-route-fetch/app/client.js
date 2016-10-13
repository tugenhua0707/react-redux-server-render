

import React from 'react';
import { match, Router, useRouterHistory } from 'react-router';
import { render } from 'react-dom';
import { createHistory } from 'history';
import routes from './routes/rootRouter';
import AppContext from './components/appContext';

const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;
const history = useRouterHistory(createHistory)();

match({ routes, location }, () => {
  render(
    <Router routes = {routes} history={ history } render = {(props) => <AppContext {...props} />} />,
    document.getElementById('app')
  )
});