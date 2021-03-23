// modified from Elastic Beanstalk sample Node.js app
// https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/samples/nodejs.zip

const port = Number(process.env.PORT) || 3000,
  http = require('http'),
  fs = require('fs');
  html = fs.readFileSync('index.html', 'utf8');

// test that round-tofixed module exists and is accessible
const roundToFixed = require('round-tofixed');

const server = http.createServer(function (req,
                                         res) {
  if (req.method === 'GET') {
    res.writeHead(200);
    // show if `roundToFixed` was loaded
    const rtfLoaded = (typeof roundToFixed !== 'undefined')
      ? "<code>roundToFixed</code> was loaded, happy music!"
      : "<code>roundToFixed</code> was NOT loaded, wah-wah trombones";
    const htmlMod = html.replace('{{roundToFixed}}', rtfLoaded);
    res.write(htmlMod);
    res.end();
  } else {
    res.writeHead(400);
    res.end();
  }
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');
