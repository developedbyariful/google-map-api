const express = require('express');
const app = express();


// Templating engine
app.set('view engine', 'ejs');
// Middleware
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {title: `Google Map Api`, lat: `23.8103`, lon: `90.4125`});
})




const PORT = 3000;
app.listen(PORT, () => `Listening on port: ${PORT}`)