var processador = require('./processador');

var lista = [
    ['5511984158516',60],
    ['5511984158516',60],
    ['5511968087930',90],
    ['5511948969981',60],
    ['5511948969981',30],
    ['5511984158516',60],
    ['554134581044',60],
    ['551332351821',60],
    ['551935410100',420],
    ['554830353909',90],
    ['551932564000',150],
    ['551721388844',120],
    ['554130403556',90],
    ['551721388844',60],
    ['551938073043',210],
    ['551332351821',150]
];

processador.processCallList(lista, function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log('Registros processados: ');
        for(var i = 0; i < lista.length; i++){
            console.log(lista[i]);
        }
    }
});

//var registro = ['551135880866', 30];

//processador.processCall(registro, function(error, data){
//    if(error){
//        console.log(error);
//    }else{
//        console.log('Registro processado:\n' + data);
//    }
//});
