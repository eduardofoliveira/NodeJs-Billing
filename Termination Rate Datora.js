const fs = require('fs');
const csv = require('fast-csv');
const util = require('util');

const stream = fs.createReadStream("Origination Rates Voice.csv");
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

        if (data.Destination === 'Movel') {
            data['Per Minute Cost(BRL)'] = 0.185
        } else {
            data['Per Minute Cost(BRL)'] = 0.035
        }

        data['Connect Cost(BRL)'] = 0

        lista.push([
            data.Code,
            data.Destination,
            data['Connect Cost(BRL)'],
            4,
            data['Per Minute Cost(BRL)'],
            data['Initial Increment'],
            data.Increment,
            '',
            '',
            ''

        ])

    })
    .on("end", function () {
		/*var file = fs.createWriteStream('Termination Rate Datora.csv');
		file.on('error', function(err) { });
		lista.forEach(function(v) {
			file.write(v.join(',') + '\r\n');
		});
		file.end();*/
        console.log(`Registros: ${lista.length - 1}`)
    });