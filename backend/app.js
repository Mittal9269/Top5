require("dotenv").config();
const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const mongoose = require('mongoose');
const path = require('path');
const FileType = require('file-type');
const cors = require('cors');
const app = express();
//import Routes
const userAuth = require("./routes/user.js");
const Commenttrouter = require('./routes/comment.js');
const ReplyRouter = require('./routes/reply.js')

//Datebase connection
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true , useUnifiedTopology: true,useCreateIndex: true , useFindAndModify: false}).then(() =>{
    console.log(`connection successful`)
}).catch((err) => console.log(err));

//MiddleWare
app.use(cors({origin:"http://localhost:3000" ,credentials : true}));
// app.use(cors({origin:"https://books.google.com/books/content" ,credentials : true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//EndPoints
app.use("/api",userAuth);
app.use("/comment" ,Commenttrouter);
app.use("/reply" , ReplyRouter)
// app.use("/categery" ,CategaryRouter);
app.use('/images', express.static(__dirname + '/images/'));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });
  
//   app.get('/jokes/random/:id', (req, res) => {
//     //   console.log(req.params.id + "at position 3")
//     request(
//       { url: "https://books.google.com/books/content?id=" + req.params.id + "&printsec=frontcover&img=1&zoom=0&source=gbs_api" },
//       (error, response, body) => {
//         if (error || response.statusCode !== 200) {
//           return res.status(500).json({ type: 'error', message: err.message });
//         }
//         // (async () => {
//         //     console.log(await FileType(body));
//         //     //=> {ext: 'png', mime: 'image/png'}
//         // })();
//         console.log(body);
//         // console.log(body.split('.').pop())
//         // body.blob()
//         // .then(image =>{
//         //     console.log(image)
//         // }).catch(err =>{
//         //     console.log(image)
//         // })
//         res.json(body);
//       }
//     )
//   });

app.listen(process.env.PORT || 8000, ()=>{
    console.log(`The application started successfully on port 8000`);
});