const fs = require('fs');
const csv = require('fast-csv');
const util = require('util');

const stream = fs.createReadStream("Plano_Basix.csv");
const lista = []

lista.push(['Code',
'Destination',
'Connect Cost',
'Included Seconds',
'Per Minute Cost',
'Initial Increment',
'Increment'])

csv
 .fromStream(stream, {delimiter :',', headers: true})
 .on("data", function(data){

    if(data.Code.length <= 8 || data.Destination === 'Gratuito Nacional'){
        let tem = false
        lista.map(item => {
            if(item.Code === data.Code){
                tem = true
            }
        })
        if(tem){

        }else{
            //lista.push([data])

            lista.push([
                data.Code,
                data.Destination,
                data['Connect Cost'],
                4,
                data['Per Minute Cost'],
                data['Initial Increment'],
                data.Increment
            ])
        }
    }
    
 })
 .on("end", function(){

    let arquivo1 = [];
    let arquivo2 = [];

    for(var i = 0; i < lista.length; i++){
        if(arquivo1.length <= 25000){
            arquivo1.push(lista[i])
        }else{
            arquivo2.push(lista[i])
        }
    }

    var file = fs.createWriteStream('Origination Rate Datora 1.csv');
	file.on('error', function(err) { });
	arquivo1.forEach(function(v) {
		file.write(v.join(',') + '\r\n');
    });
    file.end();

    var file = fs.createWriteStream('Origination Rate Datora 2.csv');
	file.on('error', function(err) { });
	arquivo2.forEach(function(v) {
		file.write(v.join(',') + '\r\n');
    });
    file.end();

    console.log(`Registros: ${lista.length - 1}`)
 });