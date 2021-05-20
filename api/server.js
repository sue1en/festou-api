const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const db = require('../db/config')

mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

const app = express();
app.use(cors());
app.use(express.json());

app.use('/static', express.static(__dirname + '/..' + '/projeto-04/backend/arquivos'))

//'C:/projeto-04'

const router = require('./routes/router.js')
router(app);

const port = process.env.PORT ? Number(process.env.PORT) : 3333;

app.listen(port, () => {console.log(`Server Running on http://localhost:${port}`)});

module.exports = app;