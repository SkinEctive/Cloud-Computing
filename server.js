const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', require('./routes/routes'))

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})