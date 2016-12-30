import React , {Component} from 'react';
import FormularioAutor from './FormularioAutor';
import TabelaAutores from './TabelaAutores';
import $ from 'jquery';
import PubSub from 'pubsub-js';

class AutorBox extends Component {

	constructor(){
    	super();
    	this.state = {lista : []};
    }

	componentDidMount(){
	    console.log('componentDidMount');
	    $.ajax({
	        url : 'http://localhost:8000/api/autores',
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

		PubSub.subscribe('atualiza-lista-autores', function(topico,novaLista){
			console.log('pub sub ouvintes ...');
			this.setState({lista: novaLista});
		}.bind(this));

	  }  

	render() {

		return (
			<div>
		        <div className="header">
		            <h2>Cadastro de Autor</h2>
		        </div>
				<div>
	           		<FormularioAutor  />

	           		<TabelaAutores lista={this.state.lista} />
	           	</div>
           	</div>
		);

	}

}

export default AutorBox;