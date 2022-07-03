const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./database/database');
const cors = require('cors');


// Templating engine
app.set('view engine', 'ejs');
// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// Home route
app.get('/', (req, res) => {
  res.render('index', {
    title: `Google Map Api`,
    lat: `23.8103`,
    lon: `90.4125`,
  });
});

// APIs
app.get('/api/map', async (req, res) => {
    const query =  `
                    SELECT * FROM locations
                    `;
    const [data] = await db.query(query);
    // console.log(data);
    res.status(200).json( data );
    // res.status(200).render('index', {data : data})
})


const PORT = 3000;
app.listen(PORT, () => `Listening on port: ${PORT}`);





