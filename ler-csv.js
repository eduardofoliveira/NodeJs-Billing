var fs = require('fs');
var csv = require('fast-csv');
//var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "54.233.223.179",
//   user: "root",
//   password: "190790edu",
//   database: "astpp"
// });

var stream = fs.createReadStream("Plano_Basix.csv");
var lista = [];
var lista2 = [];
var contador = 0;

lista.push(['Code', 'Destination', 'Connect Cost', 'Included Seconds', 'Per Minute Cost', 'Initial Increment', 'Increment', 'Priority', 'Strip', 'Prepend']);
lista2.push(['Code', 'Destination', 'Connect Cost', 'Included Seconds', 'Per Minute Cost', 'Initial Increment', 'Increment', 'Priority', 'Strip', 'Prepend']);

csv
 .fromStream(stream, {delimiter :','})
 .on("data", function(data){

    //  if(data[0] == '55114666'){
    //      console.log('Antes');
    //      console.log([data[0], data[1], data[2], data[3], data[4], data[5], data[6], '', '', '777837']);
    //  }

     if(data[0].length >= 5 && data[0].length <= 8){
         if(data[4] === '0.04'){
             data[4] = '0.02133';
         }
         if(data[4] === '0.16' && data[4] === '0.19' && data[4] === '0.28' && data[4] === '0.33'){
             data[4] = '0.04933';
         }
         if(data[4] === '0.69'){
             data[4] = '0.18500';
         }

        //  if(data[0] == '55114666'){
        //      console.log('Depois');
        //      console.log([data[0], data[1], data[2], data[3], data[4], data[5], data[6], '', '', '777837']);
        //  }

         if(contador < 25000){
             lista.push([data[0], data[1], data[2], data[3], data[4], data[5], data[6], '', '', '777837']);
         }else{
             lista2.push([data[0], data[1], data[2], data[3], data[4], data[5], data[6], '', '', '777837']);
         }
         contador += 1;
     }

        // if(data[0].indexOf('55') == 0){
        //     if(data[2] == 'Demais Cidades do Brasil - Fixo'){
        //         //lista.push([data[0], data[1], 6]); --foi
        //     }
        //     if(data[2] == 'Principais Cidades do Interior do Estado de SP - Fixo'){
        //         //lista.push([data[0], data[1], 5]); --foi
        //     }
        //     if(data[2] == 'Demais Capitais Estaduais - Fixo'){
        //         //lista.push([data[0], data[1], 4]); --foi
        //     }
        //     if(data[2] == 'Cidades Importantes do Brasil - Fixo'){
        //         //lista.push([data[0], data[1], 3]); --foi
        //     }
        //     if(data[2] == 'Área Metropolitana da Grande São Paulo - Fixo'){
        //         //lista.push([data[0], data[1], 1]); --foi
        //     }
        //     if(data[2] == 'Rio de Janeiro, Belo Horizonte, Curitiba e Brasília - Fixo'){
        //         //lista.push([data[0], data[1], 2]); --foi
        //     }
        //     if(data[2] == 'Gratuíto Nacional'){
        //         //lista.push([data[0], data[1], 9]); --foi
        //     }
        //     if(data[2] == 'Principais Destinos do Brasil - Móvel'){
        //         //lista.push([data[0], data[1], 7]); --foi
        //     }
        //     if(data[2] == 'Demais Destinos do Brasil - Móvel'){
        //         //lista.push([data[0], data[1], 8]); --foi
        //     }
        // }

 })
 .on("end", function(){

    //lista.push(['^553735416.*',
    //'Demais Cidades do Brasil - Fixo',
    //0,
    //4,
    //0.1,
    //30,
    //6,
    //3,
    //new Date()]);



    console.log(lista.length);
    console.log(lista2.length);

    // con.query("INSERT INTO routes (pattern, comment, connectcost, includedseconds, cost,  init_inc, inc, pricelist_id, creation_date) VALUES ?", [lista], function(err, result){
    //  	if(err) console.log(err);
    //  	console.log(`Registros inseridos: ${result.affectedRows}`);
    //  });
    //
 // 	con.end();

    //console.log(lista);

    var file = fs.createWriteStream('Termination Rate SaidaTransit 1.csv');
	file.on('error', function(err) { /* error handling */ });
	lista.forEach(function(v) {
		file.write(v.join(',') + '\r\n');
	});
	file.end();

    var file = fs.createWriteStream('Termination Rate SaidaTransit 2.csv');
	file.on('error', function(err) { /* error handling */ });
	lista2.forEach(function(v) {
		file.write(v.join(',') + '\r\n');
	});
	file.end();

 });

 function titleCase(str) {
   return str.toLowerCase().split(' ').map(function(word) {
     return (word.charAt(0).toUpperCase() + word.slice(1));
   }).join(' ');
 }
