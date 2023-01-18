const http = require('http');
const DEFAULT_USER = { username: 'SamuelLAs', password: '123' };

const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page');
    return response.end();
  },

  '/login:post': async (request, response) => {
    for await (const data of request) {
      const user = JSON.parse(data);
      if (
        user.password !== DEFAULT_USER.password ||
        user.username !== DEFAULT_USER.username
      ) {
        response.writeHead(401)
        response.write('Login failed')
        return response.end()
      }

      response.write('Login has succeeded');
      return response.end();
    }
  },

  default: (request, response) => {
    response.write('Hello world');
    return response.end();
  }
};

const app = http.createServer(async (request, response) => {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLocaleLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });
  chosen(request, response);
});

app.listen(3000, () => console.log('server is listening'));

module.exports = app;