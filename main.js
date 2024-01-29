const http = require('http');

const URL = require('url');
const UserAc = require('./adduser');
const allUsers = require('./datasource.json')
const server = http.createServer(function (req, res) {

    const data = [
        { username: 'naomi', age: 10 },
        { username: 'sefa', age: 14 },
        { username: 'eric', age: 11 }
    ]

    if (req.url == '/') {
        res.writeHead(200, { 'Content_Type': 'text/html' });
        res.write("welcome");
        res.end();
    } else if (req.url == '/users') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, { 'Content_Type': 'application/json' });
        res.write(JSON.stringify(data));
        res.end();
    }
    else if (req.url == '/addUser?username=ben&age=15') {
        const newUrl = URL.parse(req.url, true)
        const params = newUrl.query
        let u_name = params.username;
        let u_age = params.age;
        UserAc(u_name, u_age);
        res.end("record added");
    }
    else if (req.url.startsWith('/addNewUser')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, { 'Content_Type': 'application/json' });
        const newUrl = URL.parse(req.url, true)
        const params = newUrl.query
        let u_name = params.username;
        let u_age = params.age;
        UserAc(u_name, u_age);
        res.end("record added Succesfully");
    }
    else if (req.url.startsWith('/getUsers')){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, { 'Content_Type': 'application/json' });
        res.write(JSON.stringify(allUsers));
        res.end("All users");        
    }else if (req.url == '/contact') {
        res.writeHead(200, { 'Content_Type': 'text/html' });
        res.write("contact page");
        res.end();
    } else {
        res.writeHead(404, { 'Content_Type': 'text/html' });

        res.end();
    }
})

server.listen(5000, function () {
    console.log("Server running");
})
