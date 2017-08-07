function processar(connectionTime, connectionCost, initialIncrement, increment, valor, duracao, callback){

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

		if(duracao <= initialIncrement){
			var custo = (initialIncrement/60)*valor;
		}else{
			var custo = (duracaoCobranca/60)*valor;
		}
	}else{
		var custo = connectionCost;
	}

	return callback(custo);

};

module.exports = processar;
