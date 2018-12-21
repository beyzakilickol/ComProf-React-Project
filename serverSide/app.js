const express = require('express')

const SERVER_CONFIGS = require('./constants/server');

const configureServer = require('./server');
const configureRoutes = require('./routes');

const app = express();

configureServer(app);
configureRoutes(app);

var bodyParser = require('body-parser')
const PORT = 3001

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
app.post('/api/addprofile',function(req,res){

  let userid = req.body.userid
  let fullname = req.body.fullname
  let zipcode = req.body.zipcode
  let image = req.body.image
  let expertise = req.body.expertise
  let subcategory = req.body.subcategory
  let experience = req.body.experience
  let achievement = req.body.achievement
  db.one('select * from profile where userid=$1',[userid]).then((profile)=>{
    db.none('update profile set fullname=$1,zipcode=$2,image=$3,expertise=$4,subcategory=$5,experience=$6,achievement=$7 where userid=$8',[fullname,zipcode,image,expertise,subcategory,experience,achievement,userid]).then(()=>{
      res.json({success:true})
    })
  }).catch((error)=>{
    if(error.code == 42703 || error.received == 0){
      db.none('insert into profile (fullname,zipcode,image,expertise,subcategory,experience,achievement,userid) values ($1,$2,$3,$4,$5,$6,$7,$8)',[fullname,zipcode,image,expertise,subcategory,experience,achievement,userid]).then(()=>{
        res.json({success:true})
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
app.post('/api/getprofile',function(req,res){
  let userid = req.body.userid
  db.one(`select fullname,subcategory,expertise,rating,encode(image,'base64') as image ,zipcode,experience,achievement from profile where userid =${userid}`).then((userprofile)=>{
    console.log('profile is found')

    console.log(userprofile)

    res.json(userprofile)
  })
})
app.post('/api/expertise',function(req,res){
  let expertise = req.body.expertise
  let subcategory = req.body.subcategory
  let zipcode = req.body.zipcode
  console.log(expertise)
  console.log(subcategory)
  console.log(zipcode)
  db.any('SELECT u.userid,u.username,u.password,u.usertype,p.profileid,p.fullname,p.image,p.experience,p.achievement,p.expertise,p.zipcode,p.subcategory,p.rating from userauth u LEFT JOIN profile p on u.userid = p.userid where u.usertype = $1 and p.zipcode = $2 and p.expertise = $3 and p.subcategory = $4',['proffessional',zipcode,expertise,subcategory]).then((profiles)=>{
    console.log(profiles)
     res.json(profiles)
  })

})
app.post('/api/getAllProfile',function(req,res){
  let zipcode= req.body.zipcode
  db.any('SELECT u.userid,u.username,u.password,u.usertype,p.profileid,p.fullname,p.image,p.experience,p.achievement,p.expertise,p.zipcode,p.subcategory,p.rating from userauth u LEFT JOIN profile p on u.userid = p.userid where u.usertype = $1 and p.zipcode = $2',['proffessional',zipcode]).then((profiles)=>{

    res.json(profiles)
  })
})
app.post('/api/getFullProfile',function(req,res){
  let userid = req.body.userid
  db.one('select userid,fullname,subcategory,expertise,rating,image,zipcode,experience,achievement from profile where userid =$1',[userid]).then((user)=>{
    res.json(user)
  })
})
app.post('/api/submitRating',function(req,res){
  let userid = req.body.userid
  let rating = req.body.rating
   console.log(rating)
  db.one('select rating from profile where userid=$1',[userid]).then((response)=>{
    console.log(parseFloat(response.rating))
    if(response.rating){
    let sum = parseFloat(response.rating) + parseFloat(rating)
    console.log(sum)
    let finalRating = sum/2
    console.log(finalRating)
    db.none('update profile set rating = $1 where userid=$2',[finalRating,userid]).then(()=>{
      res.json({success:true})
    })} else {
      let sum = 0 + parseFloat(rating)
      console.log(sum)
      let finalRating = sum
      console.log(finalRating)
      db.none('update profile set rating = $1 where userid=$2',[finalRating,userid]).then(()=>{
        res.json({success:true})
      })
    }
  })

})
app.post('/api/sendmessage',function(req,res){
  let contactuserid = req.body.contactuserid
  console.log(contactuserid)
  let messagebody = req.body.messagebody
  let messagetitle = req.body.messagetitle
  let senderusername = req.body.senderusername
  let senderid = req.body.senderid
  console.log(senderusername)
  console.log(messagebody)
  console.log(messagetitle)
  console.log(contactuserid)
  db.none('insert into receivedmessages (messagetitle,messagebody,userid,sender,senderid) values ($1,$2,$3,$4,$5)',[messagetitle,messagebody,contactuserid,senderusername,senderid]).then(()=>{
    res.json({success:true})
  })
})
app.post('/api/getAllMessages',function(req,res){
  let userid = req.body.userid
  db.any('select * from receivedmessages where userid = $1',[userid]).then((response)=>{
    res.json(response)
  })
})
app.post('/api/sendMembership',function(req,res){
  let userid = req.body.userid
  let membership = req.body.membership
  console.log(userid)
  console.log(membership)
})
