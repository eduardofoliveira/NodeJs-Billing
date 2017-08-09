var connection = require('./db')()();
var calculo = require('./calculo-custo');

function searchRate(prefix, callback){
    connection.query('select custo_conexao, segundos_incluidos, custo_minuto, incremento_inicial, increment, prefixo from clientes, tarifas, areas, prefixos where clientes.id = tarifas.fk_id_cliente and areas.id = tarifas.fk_id_area and areas.id = prefixos.fk_id_area and clientes.id = 1 and prefixos.prefixo = ?', [prefix], function(error, result){
        if(error) console.log(`Erro: ${error}`);
        if(result.length == 0){
            if(prefix.length == 0){
                return callback("Prefixo não encontrado", null);
            }
            searchRate(prefix.slice(0, prefix.length-1), callback);
        }else{
            return callback(null, result[0]);
        }
    });
};

function processCallList(lista, callback){
    var cont = 0;

    for(var i = 0; i < lista.length; i++){
        processCalls(lista[i], function(error, data){
            cont++;
            if(cont == (lista.length)){
                connection.end();
                callback(null, lista);
            }
        });
    }
}

function processCalls(registro, callback){
    searchRate(registro[0], function(error, result){
        if(error){
            registro[2] = error;
            callback(error, null);
            return;
        }else{
            calculo(result.segundos_incluidos, result.custo_conexao, result.incremento_inicial, result.increment,
                result.custo_minuto, registro[1], function(custo){
                    registro[2] = custo.toFixed(2);
                    callback(null, [registro[0], registro[1], custo.toFixed(2)]);
            });
        }
    });
};

function processCall(registro, callback){
    searchRate(registro[0], function(error, result){
        if(error){
            connection.end();
            callback(error, null);
            return;
        }else{
            calculo(result.segundos_incluidos, result.custo_conexao, result.incremento_inicial, result.increment,
                result.custo_minuto, registro[1], function(custo){
                    registro[2] = custo.toFixed(2);
                    connection.end();
                    callback(null, [registro[0], registro[1], custo.toFixed(2)]);
            });
        }
    });
};

module.exports.searchRate = searchRate;
module.exports.processCall = processCall;
module.exports.processCallList = processCallList;
