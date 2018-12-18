const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const PORT = 3001
// const pgp= require('pg-promise')()
const bcrypt = require('bcrypt');
var cors = require('cors')
const pgp= require('pg-promise')()
const connectionString= {
    "host": "localhost",
    "port": 5432,
    "database": "comprof",
    "user": "postgres"
  };

const db = pgp(connectionString)
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
//--------------------------------
// function authenticate(req,res,next) {
//
//   // authorization should be lower case
//   let authorizationHeader = req.headers["authorization"]
//
//
//   if(!authorizationHeader) {
//     res.status(400).json({error: 'Authorization failed!'})
//     return
//   }
//
//   // Bearer token
//   const token = authorizationHeader.split(' ')[1] // token
//
//   jwt.verify(token,'somesecretkey',function(error,decoded){
//
//     if(decoded){
//       userId = decoded.id
//
//       db.one('SELECT id,email,password FROM users WHERE id = $1',[userId]).then((response)=>{
//         next()
//       }).catch((error)=>{
//         res.status(400).json({error: 'User does not exist!'})
//       })
//
//
//
//     }
//
//   })
//
// }
//------------------------------

app.post('/api/getUsername',function(req,res){
  let token = req.body.token
  console.log(token)
  jwt.verify(token,'somesecretkey',function(error,decoded){

    if(decoded){
      userId = decoded.id

      db.one('SELECT username,usertype FROM userAuth WHERE userid = $1',[userId]).then((response)=>{
          res.json(response)
      }).catch((error)=>{
        res.status(400).json({error: 'User does not exist!'})
      })



    }

  })
})
app.post('/api/searchcount',function(req,res){
  let count = req.body.count
  let userid = req.body.userid
  db.none('update userauth set searchcount = $1 where userid=$2',[1,userid]).then((response)=>{
    res.json({success:true})
  }).catch((error)=>{
    console.log(error)
  })
})
app.post('/api/getsearchcount',function(req,res){
   let userid = req.body.userid
   db.one('select searchcount from userauth where userid=$1',[userid]).then((user)=>{
     res.json(user)
   })
})
app.post('/api/register',function(req,res){
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  let membership = req.body.membership
  let userType = req.body.userType
  let searchcount = 0
  db.one('SELECT userid,username,email,password,membership,usertype,searchcount FROM userAuth WHERE email = $1',[email]).then((user)=>{
console.log(user)
res.json('This email is already taken. Please try with different credential!')

}).catch((error)=>{
console.log(error)
if(error.code == 42703 || error.received == 0){
  bcrypt.hash(password, 10, function(err, hash) {

        if(hash) {
            db.none('INSERT INTO userAuth (username,email,password,membership,usertype,searchcount) VALUES ($1,$2,$3,$4,$5,$6)',[username,email,hash,membership,userType,searchcount]).then(()=>{
              res.json({success: true})
            })

        }

    })
  }
})


})
app.post('/api/login',function(req,res){
  let email = req.body.email
let password = req.body.password
console.log(email)
console.log(password)
db.one('SELECT userid,email,password,username,membership,usertype,searchcount FROM userAuth WHERE email = $1',[email]).then((response)=>{
     console.log('User is found')
     console.log(response)
    // check for the password
    bcrypt.compare(password,response.password,function(error,result){
      if(result) {
        // password match

        // create a token
        const token = jwt.sign({ id : response.userid },"somesecretkey")

        // send back the token to the user
        res.json({token: token, user: response})

      } else {
        // password dont match
        res.json('The password you entered is incorrect!')
      }
    })

}).catch((error)=>{
console.log(error)
console.log(error.received)
if(error.received == 0){
   res.json('The email you entered is invalid!')
  }

})

})
