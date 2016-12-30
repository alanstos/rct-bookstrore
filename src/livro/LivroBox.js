import React, {Component} from 'react';
import TabelaLivros from './TabelaLivros';
import FormularioLivro from './FormularioLivro';
import $ from 'jquery';
import PubSub from 'pubsub-js';

class LivroBox extends Component {
    
	constructor(){
		super();
		//this.state = {lista : [ {id:'1',titulo:'Livro 123',preco : '20,40', autor:'Obama'} ]};
		this.state = {lista : [  ]};
	}

	componentDidMount(){
	    $.ajax({
	        url : 'http://localhost:8000/api/livros',
	        method : 'get',
	        type: 'GET',
	        dataType: 'jsonp',
	        success : function(result){
	          console.log('sucesso');
	          this.setState({lista: result});

	        }.bind(this),
	        error :function(result){

	          console.log('ocorreu um erro ao realizar o ajax');
	          console.log(result);

	        }
	    });

	    //config 
		PubSub.subscribe('atualiza-lista-livro', function(topico,novaLista){
			console.log('pub sub ouvintes livros ...');
			console.log('topico= ' + topico);
			this.setState({lista: novaLista});
		}.bind(this));	    
	}
	
	render(){
		return (
			<div>
		        <div className="header">
		            <h2>Cadastro de livro</h2>
		        </div>
				<div>
	           		<FormularioLivro />

	           		<TabelaLivros lista={this.state.lista} />
	           	</div>
           	</div>
		);
	}
}

export default LivroBox;