 const express = require('express'),
     app = express(),
     port = process.env.PORT || 1234;

 app.use(express.static('public'));
 app.use('/node_modules', express.static('node_modules'));

 app.get('/', (req, res) => res.render('index'));

 app.listen(port, () => console.log(`Server running at http://localhost:${port}...`));