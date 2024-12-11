import nodeFetch from 'node-fetch';
import fs from 'fs/promises';
import url from 'url';
import http from 'http';
import quertString from 'querystring';

async function main() {
  const res = await nodeFetch('https://dummyjson.com/users');
  const data = await res.json();
  await fs.writeFile('users.json', JSON.stringify(data));
}
main();

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url);
  const queryParams = quertString.parse(parsedUrl.query);

  if (parsedUrl.pathname === '/users') {
    const users = await fs.readFile('users.json', 'utf-8');

    res.setHeader('Content-type', 'application/json');
    res.write(JSON.parse(users));
    res.end();
  }
  res.end('hello world');
});

server.listen(3006, () => {
  console.log('server running on http://localhost:3006');
});
