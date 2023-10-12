import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the current module's directory path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

const sendResponse = (resData) => {
  resData.res.setHeader('Content-Type', resData.headerValue);
  resData.res.statusCode = resData.status;
  if (resData.message) {
    resData.res.write(resData.message);
  }
  if (resData.redirect) {
    resData.res.statusCode = 302; // Redirect status code
    resData.res.setHeader('Location', resData.redirect); // Redirect URL
  }
  resData.res.end();
};

const requestHandler = (req, res) => {
  const { url, method } = req;
  if (url === '/') {
    sendResponse({
      res: res,
      headerContent:'Content-Type',
      headerValue: 'text/html',
      status: 200,
      message: `
        <html>
          <head>
            <title>Welcome to Our Website</title>
          </head>
          <body>
            <header>
              <h6>Exploring Ideas, Sharing Knowledge, Building Connections</h6>
              <form action="/message" method="post">
                <input type="text" name="username" placeholder="Username">
                <input type="password" name="password" placeholder="Password">
                <button type="submit">Submit</button>
              </form>
            </header>
          </body>
        </html>
      `,
    });
  } else if (url === '/message' && method === 'POST') {
    const body = [];

    // Add an event listener for incoming data
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    // Add an event listener for request end
    req.on('end', () => {
      const data = Buffer.concat(body).toString();
      const message = data.split('=')[1];

      if (!message) {
        // Handle the case where the message is empty
        sendResponse({
          res: res,
          headerContent:'Content-Type',
          headerValue: 'text/plain',
          status: 400,
          message: 'Write your message',
        });
      } else {
        // Write the message to a file
        fs.writeFile(path.join(PATH, 'message.txt'), message, (err) => {
          if (err) {
            console.error(err);
            sendResponse({
              res: res,
              headerContent:'Content-Type',
              headerValue: 'text/plain',
              status: 500,
              message: 'Internal Server Error',
            });
          } else {
            // Redirect to the homepage after a successful POST
            sendResponse({
              res: res,
              redirect: '/',
            });
          }
        });
      }
    });
  } else {
    // Handle unknown routes with a 404 status
    sendResponse({
      res: res,
      headerContent:'Content-Type',
      headerValue: 'text/plain',
      status: 404,
      message: 'Not Found',
    });
  }
};

export default requestHandler;









