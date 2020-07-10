const express = require('express'); 
let app = express();
//Define main router in routes/index.js.Folders in express look for index folder
const apiRouter = require('./routes');
const path = require('path');


// app.get('/', (req, res) => {
//     res.send('Hello Sydni')
// })

//Used to process json
app.use(express.json());
//renders client folder to user side
app.use('/', express.static(path.join(__dirname, '../client')))
app.use('/api', apiRouter )

app.listen(3000)