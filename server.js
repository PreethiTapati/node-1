import http from 'http';

import dotenv from 'dotenv';
import requestHandler from './routes.js';

dotenv.config();

const PORT = process.env.PORT || 3005;

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});