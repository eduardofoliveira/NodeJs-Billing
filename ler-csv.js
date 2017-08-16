var fs = require('fs');
var csv = require('fast-csv');

var stream = fs.createReadStream("RotasBilling.csv");
var lista = [];

lista.push(['Code', 'Destination', 'Connect Cost', 'Included Seconds', 'Per Minute Cost', 'Initial Increment', 'Increment']);

csv
 .fromStream(stream, {delimiter :';'})
 .on("data", function(data){

        if(data[0].indexOf('55') == 0){
            if(data[2] == 'Demais Cidades do Brasil - Fixo'){
                lista.push([data[0], data[2], 0, 4, 0.10, 30, 6]);
            }
            if(data[2] == 'Principais Cidades do Interior do Estado de SP - Fixo'){
                lista.push([data[0], data[2], 0, 4, 0.10, 30, 6]);
            }
            if(data[2] == 'Demais Capitais Estaduais - Fixo'){
                lista.push([data[0], data[2], 0, 4, 0.10, 30, 6]);
            }
            if(data[2] == 'Cidades Importantes do Brasil - Fixo'){
                lista.push([data[0], data[2], 0, 4, 0.10, 30, 6]);
            }
            if(data[2] == 'Área Metropolitana da Grande São Paulo - Fixo'){
                lista.push([data[0], data[2], 0, 4, 0.06, 30, 6]);
            }
            if(data[2] == 'Rio de Janeiro, Belo Horizonte, Curitiba e Brasília - Fixo'){
                lista.push([data[0], data[2], 0, 4, 0.06, 30, 6]);
            }
            if(data[2] == 'Gratuíto Nacional'){
                lista.push([data[0], data[2], 0, 4, 0.00, 30, 6]);
            }
            if(data[2] == 'Principais Destinos do Brasil - Móvel'){
                lista.push([data[0], data[2], 0, 4, 0.49, 30, 6]);
            }
            if(data[2] == 'Demais Destinos do Brasil - Móvel'){
                lista.push([data[0], data[2], 0, 4, 0.49, 30, 6]);
            }
        }

 })
 .on("end", function(){

    var file = fs.createWriteStream('Plano_Basix_Nacional.csv');
	file.on('error', function(err) { /* error handling */ });
	lista.forEach(function(v) {
		file.write(v.join(',') + '\r\n');
	});
	file.end();

 });

 function titleCase(str) {
   return str.toLowerCase().split(' ').map(function(word) {
     return (word.charAt(0).toUpperCase() + word.slice(1));
   }).join(' ');
 }
