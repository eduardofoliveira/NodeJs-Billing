function processarRegistro(tempo){
    return new Promise(function(resolve, reject){
        resolve((Math.random() * tempo).toFixed(0));
    });
};

processarRegistro(200).then(result => {
    console.log(result);
});

// console.log('Antes das Promises');
//
// Promise.all([
//     processarRegistro(100),
//     processarRegistro(100),
//     processarRegistro(100),
//     processarRegistro(100),
//     processarRegistro(100),
//     processarRegistro(100),
//     processarRegistro(100),
//     processarRegistro(100),
//     processarRegistro(100),
//     processarRegistro(100)
// ]).then(result => {
//     result.forEach(function(valor){
//         console.log(valor);
//     });
// });
//
// console.log('Depois das Promises');
