const fs = require('fs');
const csv = require('fast-csv');
const util = require('util');

const stream = fs.createReadStream("Termination Rate SaidaAmericaNet 2.csv");
const lista = []

lista.push(['Code',
'Destination',
'Connect Cost',
'Included Seconds',
'Per Minute Cost',
'Initial Increment',
'Increment',
'Precedence',
'Strip',
'Prepend'])

csv
    .fromStream(stream, { delimiter: ',', headers: true })
    .on("data", function (data) {

        if(data.Code.indexOf('5511') == 0){
            data.Strip = 5511
        }else{
            data.Strip = '55'
            data.Prepend = '085'
        }

        lista.push([
            data.Code,
            data.Destination,
            data['Connect Cost'],
            data['Included Seconds'],
            data['Per Minute Cost'],
            data['Initial Increment'],
            data.Increment,
            data.Priority,
            data.Strip,
            data.Prepend
        ])

    })
    .on("end", function () {
        
        var file = fs.createWriteStream('Termination Rate SaidaAmericaNet 4.csv');
		file.on('error', function(err) { });
		lista.forEach(function(v) {
			file.write(v.join(',') + '\r\n');
		});
		file.end();

    });