// Homepage
// About Page = '/About'
require("dotenv").config();
const { song1, song2, song3, printSongName } = require("./song-list");
const http = require("http");
const mysql = require("mysql2");
const fs = require('fs');
const path = require('path');
const marked = require('marked');

const {
  PORT,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_HOSTNAME,
  MYSQL_PORT,
  MYSQL_DB,
} = process.env;

const dbConnectionString = `mysql://${MYSQL_USERNAME}:${MYSQL_PASSWORD}@${MYSQL_HOSTNAME}:${MYSQL_PORT}/${MYSQL_DB}`;

function startApp() {
  const db = mysql.createConnection(dbConnectionString);

  const server = http.createServer((request, response) => {
    const { method, url } = request;

    console.log(`Start ${url}`);

    // Sync
    // const logContent = `${new Date()} :: ${method} ${url}\n`
    // fs.writeFileSync(path.resolve('files/logs', 'request.log'), logContent, { flag: 'a+' });

    

    let content = '';
    if (method === "GET" && url === "/") {
      // const results = await db.query("select * from songs");
      // const resultsString = results[0]
      //   .map((item) => `<p>${item.name}</p>`)
      //   .toString();
      // try {
      //   content = fs.readFileSync(path.resolve('files', 'home.md'), 'utf-8');
      //   content = marked.marked(content);
      // } catch (error) {
      //   console.log(error);
      // }

      // try{
      //   fs.statSync('logs');
      // } catch (error){
      //   console.log(error);
      //   fs.mkdirSync('files/image');
      // }

      response.setHeader("Content-Type", "text/html; charset=UTF-8");
      response.statusCode = 200;
      response.end(content);
      
    } else if (method === "GET" && url === "/about") {
      printSongName(song1);
      printSongName(song2);
      printSongName(song3);
      response.setHeader("Content-Type", "text/html; charset=UTF-8");
      response.statusCode = 200;
      response.end(
        `<h1>Aboutpage  หน้าอธิบาย</h1>\n<p>${song1}</p>\n<p>${song2}</p>\n<p>${song3}</p>`
      );
    }

    console.log(`End ${url}`);
  });

  server.listen(PORT, () => {
    console.log("Server is start the war. on PORT" + PORT);
  });
}

startApp();

// db.query("SELECT * FROM songs", (error, results) => {
//   if (!!error) {
//     console.log("Has error");
//   }
//   const resultsString = results
//     .map((item) => `<p>${item.name}</p>`)
//     .toString();
//   response.setHeader("Content-Type", "text/html; charset=UTF-8");
//   response.statusCode = 200;
//   response.end("<h1>Homepage หน้าแรก</h1>" + resultsString);
// });