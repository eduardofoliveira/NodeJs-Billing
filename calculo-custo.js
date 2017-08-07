var connectionTime = 5;
var initialIncrement = 30;
var increment = 6;

var valor = 0.69;

var duracao = 90;
var duracaoCobranca = 0;

for(var i = 0; i <= duracao; i++){
	if(i <= initialIncrement){
		duracaoCobranca = initialIncrement;
	}
	if(i > duracaoCobranca){
		duracaoCobranca = duracaoCobranca + increment;
	}
}

if(!(duracao <= connectionTime)){
	console.log('Tem Custo');

	if(duracao <= initialIncrement){
		var custo = (initialIncrement/60)*valor;
	}else{
		var custo = (duracaoCobranca/60)*valor;
	}
}else{
	console.log('Sem Custo');
	var custo = 0.00;
}

console.log(`Custo da chamada: ${custo.toFixed(2)}`);
