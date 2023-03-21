var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');
const axios = require('axios');

const CLIENT_ID = "089df41ea8578a846772";
const CLIENT_SECRET = "9e966b68d41f23c6d7fd292e5a42d8bb65b63ffe";

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function(req, res){
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;
    try{
        const resp = await axios({
            method: 'post',
            url: `https://github.com/login/oauth/access_token${params}`,
            headers: {
                 accept: 'application/json'
            }
        })
        console.log("resp",resp.data);
        res.send(resp.data);
    } catch(error){
        console.log("Error::",error);
    }
});

app.listen(4000, function(){
    console.log("Server running on port 4000")
});