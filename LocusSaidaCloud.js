const fs = require('fs');
const csv = require('fast-csv');

const stream = fs.createReadStream("Origination Rates Voice.csv");
const originationRates = []

originationRates.push(['Code',
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
            data.Destination = 'Brasil Movel'
        }
        if (data.Destination === 'LDN') {
            data['Per Minute Cost(BRL)'] = 0.035
            data.Destination = 'Longa Distancia Nacional - Fixo'
        }
        if (data.Destination === 'Local') {
            data['Per Minute Cost(BRL)'] = 0.035
            data.Destination = 'Area Metropolitana da Grande Sao Paulo - Fixo'
        }

        data['Connect Cost(BRL)'] = 0
        data.Code = '10' + data.Code

        originationRates.push([
            data.Code,
            data.Destination,
            data['Connect Cost(BRL)'],
            4,
            data['Per Minute Cost(BRL)'],
            data['Initial Increment'],
            data.Increment,
            '0',
            '10',
            ''
        ])

    })
    .on("end", function () {
		var file = fs.createWriteStream('Termination Rate Locus Datora.csv');
		file.on('error', function(err) { });
		originationRates.forEach(function(v) {
			file.write(v.join(',') + '\r\n');
		});
		file.end();
    });