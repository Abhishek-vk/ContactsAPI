var express = require("express");
var cors = require("cors");
var Controller = require("./dataControllers/DataControllers");

var app = express();
app.use(cors());
app.use(express.json());

const port = 8000;
const urlPath = "/api/v1/contacts";

app.get(urlPath, (req, res) => Controller.getContacts(req, res));
app.post(urlPath, (req, res) => Controller.addContact(req, res));

app.listen(port, () => {
    console.clear();
    console.log("Server started at port 8000");
});
