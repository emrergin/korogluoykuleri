const https = require('https')
const url = "https://kagitsizlar.vercel.app/api/oykulerKisa";

var fs = require('fs');


https.get(url, res => {
    let data = '';
    res.on('data', chunk => {
      data += chunk;
    });
    res.on('end', () => {    
        var stream = fs.createWriteStream("yeniOykuler.js");
        stream.once('open', function(fd) {
          stream.write(`YeniOykuler=`+data);        
        stream.end();
      });
    })
  }).on('error', err => {
    console.log(err.message);
  }).end()


