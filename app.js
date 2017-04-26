const express = require('express'),
    app = express(),
    port = 1234;

app.use(express.static('public'));
app.use('/libs', express.static('node_modules'));

app.listen(port, () => console.log(`Server running at http://localhost:${port}...`));