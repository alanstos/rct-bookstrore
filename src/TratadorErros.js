import PubSub from 'pubsub-js';

class TratadorErros {

	publicaErros(erros){
		console.log('bateu no tratar erros ... ');

		for (var i =0 ; i < erros.length ; i++){
			console.log(erros[i]);
			var erro = erros[i];
			PubSub.publish('validacao-input-autores',erro);
		}
	}

	publicaErrosLivros(erros){
		console.log('bateu no tratar erros livros ... ');

		for (var i =0 ; i < erros.length ; i++){
			console.log(erros[i]);
			var erro = erros[i];
			PubSub.publish('validacao-input-livros',erro);
		}
	}	

}

export default TratadorErros;