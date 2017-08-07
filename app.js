var processador = require('./processador');
var calculo = require('./calculo-custo');

processador('5511', function(error, result){
    console.log("Custo de conexão: " + result.custo_conexao);
    console.log("Segundos incluidos: " + result.segundos_incluidos);
    console.log("Custo por minuto: " + result.custo_minuto);
    console.log("Incremento Inicial: " + result.incremento_inicial);
    console.log("Incremento: " + result.increment);
    console.log("Prefixo: " + result.prefixo);

    calculo(result.segundos_incluidos, result.custo_conexao, result.incremento_inicial, result.increment,
        result.custo_minuto, 31, function(custo){
            console.log("Duração da chamada: " + 31);
            console.log("Custo da chamada: " + custo);
        });
});
