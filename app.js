const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const googleMapRoute = require('./routes/googlemap.route')

// Templeting engine
app.set('view engine', 'ejs');
// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(googleMapRoute)







const PORT = process.env.PORT || 3000;
app.listen(PORT, () => `Listening on port: ${PORT}`);





