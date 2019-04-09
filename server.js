const express = require("express");
const graphql = require("graphql");
const graphqlHTTP = require("express-graphql");
const bodyParser = require("body-parser");
//const urlEncodedParser = bodyParser.urlencoded({extended: false});
const path = require("path");
const schema = require("./schema/schema");

const app = express();
app.use(express.static("public"));


//https://www.facebook.com/ProgrammersCreateLife/photos/basw.AbpEEfgkMmf02Qyk-nVpHIFditE0YVl6nnRz7W124wDwGDWuIZuyHfn3F_-bwfLxfcGpmdDDlPpJ8bzfZSR7154DFJ_Bn1iRKOegoRFQZDTn6S211n5Uh_7e_8AVKPN7Yc511_VM_js99e3vuAluK6SwQW6MMXL_zz5uqOiRyTh8HOql7npTlz7cmfyJc3qgDd8.2088123737903160.498327137309289.771203349732462.253553345094093.10206127101079054.985151625011324.1552191721707632.1527331094166068.516739705422192/2088123737903160

app.use(function(req, res, next) {
	
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/usernotes", (request, response) => {
  console.log(`${request.query.user} < Got a get`);

  //response.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(2020, () => {
  console.log(" 👂 listening @ port 2020");
});
