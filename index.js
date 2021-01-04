const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.render('dist/index.html');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('wordsearch: listening on port ' + port)
})