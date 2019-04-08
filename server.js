const express = require("express");
const graphqlHTTP = require("express-graphql");
const bodyParser = require("body-parser");
//const urlEncodedParser = bodyParser.urlencoded({extended: false});
const path = require("path");

const app = express();
app.use(express.static("public"));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use("/graphql", graphqlHTTP({

}));

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "./public/index.html"));
})
app.get("/usernotes", (request, response) => {
    
    console.log(`${request.query.user} < Got a get`);
    
    
    //response.sendFile(path.join(__dirname, "./public/notes.html"));
})

app.listen(2020, () => {
console.log(" 👂 listening @ port 2020")
});
