const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, "../../")));
//app.use('/node_modules', express.static('node_modules'));
app.listen(1234, () => console.log(
    'Express server running at http://127.0.0.1:1234'));