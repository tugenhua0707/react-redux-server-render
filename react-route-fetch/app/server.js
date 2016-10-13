
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import routes from './routes/rootRouter';
import AppContext from './components/appContext';

function renderFullPage(renderContent, propsArray) {
  const appProps = safeStringify(propsArray);
  return `
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>react server render</title>
        </head>
        <body>
          <div id="app">${renderContent}</div>
          <script>
             var APP_PROPS = ${appProps};
          </script>
          <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
        </body>
      </html>
  `;
}
// safeStringify 对象转换为标准的字符串
/*
 * 比如：[ { me: { name: 'kongzhi', date: '2016-10-13T03:43:27.008Z' } },
        { users: [ [Object], [Object], [Object] ] } ]
 * 会转化成如下：
 [
  {"me":{"name":"kongzhi","date":"2016-10-13T03:43:27.008Z"}},
  {"users":[
    {"id":1,"name":"kongzhi"},
    {"id":2,"name":"kongzhi2"},
    {"id":3,"name":"kongzhi3"}
    ]
  }
 ]
*/
function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

export default function render(req,res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if(error) {
      res.status(500).send(error.message)
    }else if(redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }else if(renderProps) {
      const componentsArray = renderProps.components.filter(component => component && component.loadProps);
      let propsArray = [];
      Promise.all(
        componentsArray.map((component, index) => {
          return new Promise((resolve, reject) => {
            component.loadProps((error, fetchResult) => {
              if(error) {
                reject(error);
              }else {
                propsArray[index] = fetchResult;
                resolve();
              }
            })
          })
        })
      ).then(() => {
        const propsAndComponents = { componentsArray, propsArray };

        const renderContent = renderToString(<AppContext { ...renderProps } { ...propsAndComponents }/>);
        const renderPage = renderFullPage(renderContent, propsArray);
        res.status(200).send(renderPage);
      }).catch(error => {
        res.status(500).send(error.message);
      })
    }else {
      res.status(404).send('Not found');
    }
  });
}