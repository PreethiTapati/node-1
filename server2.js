import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// get the current module's directory path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// write, read , append and delete this text to `message.txt`
const filePath = path.join(PATH, 'message.txt');
const messageToSave = `Hello there,\n welcome to Node.js `;


// write
fs.writeFile(filePath, messageToSave, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File written successfully.');
});


// read
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File contents:');
  console.log(data);
});


// append

fs.appendFile(filePath, '\n Hello world', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Content appended to the file.');
});



// unlink
fs.unlink(filePath, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File deleted successfully.');
});
