var fs = require('fs');
var csv = require('fast-csv');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "duduhouse.dyndns.info",
  user: "billing",
  password: "190790edu",
  database: "billing"
});

var stream = fs.createReadStream("RotasBilling.csv");
var lista = [];

//lista.push(['Code', 'Destination', 'Connect Cost', 'Included Seconds', 'Per Minute Cost', 'Initial Increment', 'Increment']);

csv
 .fromStream(stream, {delimiter :';'})
 .on("data", function(data){

        if(data[0].indexOf('55') == 0){
            if(data[2] == 'Demais Cidades do Brasil - Fixo'){
                //lista.push([data[0], data[1], 6]); --foi
            }
            if(data[2] == 'Principais Cidades do Interior do Estado de SP - Fixo'){
                //lista.push([data[0], data[1], 5]); --foi
            }
            if(data[2] == 'Demais Capitais Estaduais - Fixo'){
                //lista.push([data[0], data[1], 4]); --foi
            }
            if(data[2] == 'Cidades Importantes do Brasil - Fixo'){
                //lista.push([data[0], data[1], 3]); --foi
            }
            if(data[2] == 'Área Metropolitana da Grande São Paulo - Fixo'){
                //lista.push([data[0], data[1], 1]); --foi
            }
            if(data[2] == 'Rio de Janeiro, Belo Horizonte, Curitiba e Brasília - Fixo'){
                //lista.push([data[0], data[1], 2]); --foi
            }
            if(data[2] == 'Gratuíto Nacional'){
                //lista.push([data[0], data[1], 9]); --foi
            }
            if(data[2] == 'Principais Destinos do Brasil - Móvel'){
                //lista.push([data[0], data[1], 7]); --foi
            }
            if(data[2] == 'Demais Destinos do Brasil - Móvel'){
                //lista.push([data[0], data[1], 8]); --foi
            }
        }

 })
 .on("end", function(){

    //con.query("INSERT INTO prefixos (prefixo, localidade, fk_id_area) VALUES ?", [lista], function(err, result){
 	//	if(err) console.log(err);
 	//	console.log(`Registros inseridos: ${result.affectedRows}`);
 	//});
 	//con.end();

    console.log(lista);

    //var file = fs.createWriteStream('Plano_Basix_Nacional.csv');
	//file.on('error', function(err) { /* error handling */ });
	//lista.forEach(function(v) {
	//	file.write(v.join(',') + '\r\n');
	//});
	//file.end();

 });

 function titleCase(str) {
   return str.toLowerCase().split(' ').map(function(word) {
     return (word.charAt(0).toUpperCase() + word.slice(1));
   }).join(' ');
 }
