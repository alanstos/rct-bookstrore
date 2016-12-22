import React , {Component} from 'react';
import FormularioAutor from './FormularioAutor';
import TabelaAutores from './TabelaAutores';
import $ from 'jquery';

class AutorBox extends Component {

	constructor(){
    	super();
    	this.state = {lista : []};
    	this.atualizaListagem = this.atualizaListagem.bind(this);
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

	        }.bind(this)
	    });
	  }  

	  atualizaListagem(novaLista){
	  	console.log(' box atualizando listagem....');
	  	this.setState({lista: novaLista});
	  }

	render() {

		return (

			<div>
           		<FormularioAutor callbackAtualizaListagem={this.atualizaListagem} />

           		<TabelaAutores lista={this.state.lista} />
           	</div>
		);

	}

}

export default AutorBox;