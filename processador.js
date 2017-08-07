var connection = require('./db')()();

function searchRate(prefix, callback){
    connection.query('select custo_conexao, segundos_incluidos, custo_minuto, incremento_inicial, increment, prefixo from clientes, tarifas, areas, prefixos where clientes.id = tarifas.fk_id_cliente and areas.id = tarifas.fk_id_area and areas.id = prefixos.fk_id_area and clientes.id = 1 and prefixos.prefixo = ?', [prefix], function(error, result){
        if(error) console.log(`Erro: ${error}`);
        if(result.length == 0){
            searchRate(prefix.slice(0, prefix.length-1))
        }else{
            connection.end();
            return callback(null, result[0]);
        }
    });
};

module.exports = searchRate;
