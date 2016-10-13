import React from 'react';
import { match, Router, useRouterHistory } from 'react-router';
import { render } from 'react-dom';
import { createHistory } from 'history';
import routes from './router/rootRouter';

const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;
const history = useRouterHistory(createHistory)();

match({ routes, location }, () => {
  render(
    <Router routes = {routes} history={ history } />,
    document.getElementById('app')
  )
});