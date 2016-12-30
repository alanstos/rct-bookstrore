import React, {Component} from 'react';
import InputCustomizado from '../componentes/InputCustomizado';
import ButtonController from '../componentes/ButtonController';
import PubSub from 'pubsub-js';
import $ from 'jquery';

class FormularioLivro extends Component {

	constructor(){
		super();
		this.state = {titulo:'',preco:''};
		this.setTitulo = this.setTitulo.bind(this);
		this.setPreco = this.setPreco.bind(this);
		this.enviaForm = this.enviaForm.bind(this);
	}

	setTitulo(event){
		this.setState({titulo : event.target.value});
	}

	setPreco(event){
		this.setState({preco : event.target.value});	
	}	

	enviaForm(event){
		console.log('bateu no envia formulario'); 

		event.preventDefault();

		console.log(this.state.titulo);
		console.log(this.state.preco);

		var idLivro = new Date().getMilliseconds();

	   $.ajax({
	        url:'http://localhost:8000/api/livros/grava',
	        contentType: 'application/json', //enviados 
	        dataType:'json', //resposta
	        type:'POST',
	        data: JSON.stringify({
	          id : idLivro,
	          titulo:this.state.titulo,
	          preco:this.state.preco,
	      		autor: 'vazio'}),
	        success: function(resposta){
	          console.log('enviado com sucesso');

	          PubSub.publish('atualiza-lista-livro',resposta);
	          
	          this.setState({titulo:'',preco:''});

	        }.bind(this),
	        error: function(resposta){
	            console.log("erro");
	            console.log(resposta.status);
	            console.log(resposta);

	            if (resposta.status === 400){

	            	//new TratadorErros().publicaErros(resposta.responseJSON);
	            	
	            }
	        },
			    beforeSend: function(){
	      		//PubSub.publish("limpa-erros",{});

	    	  }       

	    });			

	}

	render(){
		return (
          <form className="pure-form pure-form-aligned" method="POST" onSubmit={this.enviaForm}>
              <fieldset>

                  <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} 
                  placeholder="Titulo" label="Titulo" />

                  <InputCustomizado id="preco" type="text" name="preco" value={this.state.preco} onChange={this.setPreco} 
                  placeholder="Digite o preço do livro" label="Preço" />



                  <ButtonController label="Gravar livro" />                                         
          
                  
              </fieldset>
           </form>
		);
	}
}

export default FormularioLivro;