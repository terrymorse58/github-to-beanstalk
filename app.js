// modified from Elastic Beanstalk sample Node.js app
// https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/samples/nodejs.zip

const port = Number(process.env.PORT) || 80,
  http = require('http'),
  url = require('url'),
  fs = require('fs'),
  os = require('os');

// test that round-tofixed module exists and is accessible
const roundToFixed = require('round-tofixed');

const server = http.createServer(function (req,
                                           res) {

  console.log('req.url:', req.url);
  console.log('hostname:', os.hostname());
  console.log('req.headers.host:', req.headers.host);

  if (req.method !== 'GET') {
    res.writeHead(400);
    res.end();
    return;
  }

  const path = url.parse(req.url).pathname;
  console.log(`path: "${path}"`);

  switch (path) {

    case '/':
    case '/index.html':
      const html = fs.readFileSync('index.html', 'utf8');
      res.writeHead(200);
      // show if `roundToFixed` was loaded
      const rtfLoaded = (typeof roundToFixed !== 'undefined')
        ? '<code>roundToFixed</code> was loaded, happy music!'
        : '<code>roundToFixed</code> was NOT loaded, wah-wah trombones';
      const htmlMod = html.replace('{{roundToFixed}}', rtfLoaded);
      res.write(htmlMod);
      res.end();
      return;

    case '/images/306-200x200.jpg':
    case '/images/531-200x200.jpg':
    case '/images/784-200x200.jpg':
      const relPath = 'placeholder-image.png';
      res.writeHead(200);
      const image = fs.readFileSync(relPath);
      res.write(image);
      res.end();
      return;
  }

  res.writeHead(200);
  res.write('do not understand: ' + path);
  res.end();

});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');
