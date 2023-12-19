const express = require('express');
const session = require('express-session');
const registerRoutes = require('./routes/register');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(session({
    secret: 'CSCI130_',
    resave: false,
    saveUninitializeD: true
}));

app.use('/register', registerRoutes);

app.listen(port, () => {
    console.log('Server running on port ${port}');
});
