import React, {Component} from 'react';
import InputCustomizado from '../componentes/InputCustomizado';
import ButtonController from '../componentes/ButtonController';
import ComboBox from '../componentes/ComboBox';
import TratadorErros from '../TratadorErros';
import PubSub from 'pubsub-js';
import $ from 'jquery';

class FormularioLivro extends Component {

	constructor(){
		super();
		this.state = {titulo:'',preco:'',autor:''};
		this.setTitulo = this.setTitulo.bind(this);
		this.setPreco = this.setPreco.bind(this);
		this.setAutor = this.setAutor.bind(this);
		this.enviaForm = this.enviaForm.bind(this);
		this.limpar = this.limpar.bind(this);
	}

	setTitulo(event){
		this.setState({titulo : event.target.value});
	}

	setPreco(event){
		this.setState({preco : event.target.value});	
	}	

	setAutor(event){
		console.log(event.target.value);
		this.setState({autor : event.target.value});
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
	      	  autorId: this.state.autor,
	      	  autor: this.state.autor}),
	        success: function(resposta){
	          console.log('enviado com sucesso');

	          PubSub.publish('atualiza-lista-livro',resposta);
	          
	          this.setState({titulo:'',preco:'',autor:''});

	        }.bind(this),
	        error: function(resposta){
	            console.log("erro");
	            console.log(resposta.status);
	            console.log(resposta);

	            if (resposta.status === 400){

	            	new TratadorErros().publicaErrosLivros(resposta.responseJSON);
	            	
	            }
	        },
			beforeSend: function(){
	      		PubSub.publish("limpa-erros",{});

	    	}       

	    });			

	}

	limpar(event){	

		this.setState({titulo:'',preco:'',autor:''});

	}

	render(){
		return (
          <form className="pure-form pure-form-aligned" method="POST" onSubmit={this.enviaForm}>
              <fieldset>

                  <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} 
                  placeholder="Titulo" label="Titulo" />

                  <InputCustomizado id="preco" type="text" name="preco" value={this.state.preco} onChange={this.setPreco} 
                  placeholder="Digite o preço do livro" label="Preço" />

                  <ComboBox id="autoresid" label="Autor" name="autor" value={this.state.autor} autores={this.props.autores} onChange={this.setAutor} />

                  <ButtonController type="submit" label="Gravar livro" />                                         

                  <ButtonController type="button" label="Limpar" onClick={this.limpar} /> 

              </fieldset>
           </form>
		);
	}
}

export default FormularioLivro;