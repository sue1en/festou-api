const express = require('express');
const cors = require('cors');
const router = require('./routes/router.js')

const app = express();
app.use(cors());
app.use(express.json());

router(app);

const PORT = process.env.PORT || 3333;

app.listen(PORT,  () => {console.log(`Server Running on http://localhost:${PORT}`)});

module.exports = app;