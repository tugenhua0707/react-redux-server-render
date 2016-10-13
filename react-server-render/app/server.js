import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app';

function renderFullPage(renderContent) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>React server render</title>
      </head>
      <body>
        <div id="app">${renderContent}</div>
        <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
      </body>
    </html>
  `;
}

export default function render(req,res) {
  const renderContent = renderToString(<App />);
  const renderPage = renderFullPage(renderContent);
  res.status(200).send(renderPage);
}