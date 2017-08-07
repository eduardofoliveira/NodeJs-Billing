var connection = require('./db')()();

//console.log(connection = connection()());

function searchRate(prefix){
    connection.query('SELECT * FROM prefixos where prefixo = ?', [prefix], function(error, result){
        if(error) console.log(`Erro: ${error}`);
        if(result.length == 0){
            searchRate(prefix.slice(0, prefix.length-1))
        }else{
            console.log(prefix);
            console.log(result[0].id);
            connection.end();
        }
    });
};

searchRate('551135880866');
