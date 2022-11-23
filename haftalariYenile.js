const https = require('https')
const url = "https://atolye.cyclic.app/api/haftaBilgisi";

var Tarihler2021 = require('./yeniTarihlerYerel');

var fs = require('fs');

https.get(url, res => {
  res.setEncoding("utf8");
  let veri = "";
  res.on("data", data => {
    veri += data;
  });
  res.on("end", () => {
    console.log(Tarihler2021.length)
    veri = JSON.parse(veri);
    veri.splice(veri.indexOf(`20.02.2022`),1);
    console.log(veri.length)
    Tarihler2021=veri.concat(Tarihler2021);
    Tarihler2021=[...new Set(Tarihler2021)];
    console.log(Tarihler2021.length)

    var file = fs.createWriteStream('yeniTarihler.js');
    var sep="";
    file.on('error', function(err) { /* error handling */ });
    file.write(`Tarihler2021=[` + '\n');
    Tarihler2021.forEach(function(v) { file.write(sep+`"${v}"`);
                        if (!sep){sep = ",\n"} });
    file.write(`];` + '\n');
    file.end();
  });
});