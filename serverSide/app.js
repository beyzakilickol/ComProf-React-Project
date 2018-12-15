const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const PORT = 3001
// const pgp= require('pg-promise')()
const bcrypt = require('bcrypt');
var cors = require('cors')
const jwt = require('jsonwebtoken')
app.use(cors())
// parse application/json
app.use(bodyParser.json())
const dotEnv = require('dotenv').config()
// const PORT = process.env.PORT || 3050;
// // connection string which is used to specify the location of the database
// const connectionString = process.env.DB_CONN
//   const config = {
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       port: process.env.DB_PORT,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       ssl: true
//   }
//   // creating a new database object which will allow us to interact with the database
//   const db = pgp(config)
//-----------------to enable CORS-------
app.use(function(req, res, next) {
  //
  // res.header("Access-Control-Allow-Headers: Authorization")
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Authorization,X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(PORT, function(){
  console.log('Server is running...')
})
