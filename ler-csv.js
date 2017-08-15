var fs = require('fs');
var csv = require('fast-csv');

var stream = fs.createReadStream("RotasBilling.csv");
var registros = [];
var descricao = [];

csv
 .fromStream(stream, {delimiter :';'})
 .on("data", function(data){
 		//registros.push([data[0], titleCase(data[1]), data[2], data[3]]);
        if(data[0].indexOf('551199968') == 0){
            console.log([data[0], titleCase(data[1]), data[2], data[3]]);
        }

        if(descricao.indexOf(data[2]) > -1){

        }else{
            if(data[0].indexOf('55') == 0){
                descricao.push(data[2]);
            }
        }
 })
 .on("end", function(){
     descricao.forEach(function(item){
         console.log(item);
     });
 });

//function titleCase(str) {
//     return str.toLowerCase().split(' ').map(function(word) {
//         return word.replace(word[0], word[0].toUpperCase());
//     }).join(' ');
// }

 function titleCase(str) {
   return str.toLowerCase().split(' ').map(function(word) {
     return (word.charAt(0).toUpperCase() + word.slice(1));
   }).join(' ');
 }
