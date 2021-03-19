const express = require('express')
const app = express();
const cors = require('cors')

const FBAuth = require('./util/fbAuth');
const port =  parseInt(process.env.PORT, 10) || 4000;


const {signup, login, getAuthenticatedUser} = require('./handlers/users');
const {getAllTests} = require('./handlers/test')
//middlwares 
app.use(express.json());
  app.use(cors())
  
//test routes
app.get('/test', getAllTests);
app.get('/user', FBAuth, getAuthenticatedUser);

//users routes
app.post('/signup',signup);
app.post('/login',login);



// app.set('port', port);

// gameServer.listen(port);

app.listen(port, () => 
console.log(`Server listening http://localhost:${port}`) );
