import React, {Component} from 'react';
import InputCustomizado from '../componentes/InputCustomizado';
import ButtonController from '../componentes/ButtonController';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import TratadorErros from '../TratadorErros'

class FormularioAutor extends Component {

  
  	constructor(){
    	super();
	    console.log('constructor app - inicio');
	    this.state = {nome :'', email : '', senha: ''};
	    this.enviaForm = this.enviaForm.bind(this);
      //this.salvaAlteracao = this.salvaAlteracao.bind(this);
	    console.log('constructor app - fim');    	
    }	

  enviaForm(event){

    event.preventDefault();

    var idAutor = new Date().getMilliseconds();

    $.ajax({
        url:'http://localhost:8000/api/autores/grava',
        contentType: 'application/json', //enviados 
        dataType:'json', //resposta
        type:'POST',
        data: JSON.stringify({
          id : idAutor,
          nome:this.state.nome,
          email:this.state.email,
          senha:this.state.senha}),
        success: function(resposta){
          console.log('enviado com sucesso');

          //this.setState({lista:resposta});

          //this.props.callbackAtualizaListagem(resposta);
          PubSub.publish('atualiza-lista-autores',resposta);
          
          this.setState({nome:'',email:'',senha:''});

        }.bind(this),
        error: function(resposta){
            console.log("erro");
            console.log(resposta.status);
            console.log(resposta);

            if (resposta.status === 400){

            	new TratadorErros().publicaErros(resposta.responseJSON);
            	
            }
        },
		    beforeSend: function(){
      		PubSub.publish("limpa-erros",{});

    	  }       

    });
  }

  salvaAlteracao(nomeInput, event){
    var campo = {};
    campo[nomeInput] = event.target.value; //usando conchetes ou 
    this.setState(campo); // this.setState({[nomeInput]:event.target.value})
  } 

	render(){

		return (

          <form className="pure-form pure-form-aligned" method="POST" onSubmit={this.enviaForm}>
              <fieldset>

                  <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.salvaAlteracao.bind(this,'nome')} 
                  placeholder="Nome" label="Nome" />

                  <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.salvaAlteracao.bind(this,'email')} 
                  placeholder="Digite seu e-mail" label="E-mail" />

                  <InputCustomizado id="password" type="password" name="senha" value={this.state.senha} onChange={this.salvaAlteracao.bind(this,'senha')} 
                  placeholder="Sua senha" label="Senha" />   

                  <ButtonController label="Enviar" />                                         
          
                  
              </fieldset>
           </form>
			);
	}

}

export default FormularioAutor;