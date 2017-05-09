 const express = require('express'),
     app = express(),
     port = 80;

 app.use(express.static('public'));
 app.use('/node_modules', express.static('node_modules'));

 app.listen(port, () => console.log(`Server running at http://localhost:${port}...`));