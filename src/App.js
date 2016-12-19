import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';

class App extends Component {

  
  constructor(){
    super();
    console.log('constructor app - inicio');
    this.state = {lista : [],nome :'', email : '', senha: ''};
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
    console.log('constructor app - fim');
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

  enviaForm(event){

    event.preventDefault();

    console.log('enviando form.....');

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

          this.setState({lista:resposta});

        }.bind(this),
        error: function(resposta){
            console.log("erro");
            console.log(resposta);
        }

    });
  }

  setNome(event){
    this.setState({nome : event.target.value});
  }

  setEmail(event){
    this.setState({email : event.target.value});
  }

  setSenha(event){
    this.setState({senha : event.target.value});
  }


  render() {

    console.log('render');

    return (

<div id="layout">
    
    <a href="#menu" id="menuLink" className="menu-link">
        <span></span>
    </a>

    <div id="menu">
        <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
            </ul>
        </div>
    </div>



    <div id="main">
        <div className="header">
            <h1>Cadastro de autores</h1>
        </div>

        <div className="content">

          <form className="pure-form pure-form-aligned" method="POST" onSubmit={this.enviaForm}>
                  <fieldset>
                      <div className="pure-control-group">
                          <label htmlFor="name">Nome</label>
                          <input id="name" type="text" placeholder="Nome" value={this.state.nome} onChange={this.setNome} />
                      </div>

                      <div className="pure-control-group">
                          <label htmlFor="email">Email Address</label>
                          <input id="email" type="email" placeholder="Email Address" value={this.state.email} onChange={this.setEmail} />
                      </div>

                      <div className="pure-control-group">
                          <label htmlFor="password">Password</label>
                          <input id="password" type="password" placeholder="Password"  value={this.state.senha} onChange={this.setSenha} />
                      </div>                      
              

              
                      <div className="pure-controls">

                          <button type="submit" className="pure-button pure-button-primary" 
                          >Submit</button>
                      </div>
                  </fieldset>
              </form>

           <div>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>email</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    this.state.lista.map(function(autor){
                      return(
                        <tr key={autor.id}>
                          <td>{autor.nome}</td>
                          <td>{autor.email}</td>
                        </tr>
                        )
                      })
                  }
                </tbody>
               
              </table>
          </div>

        </div>
    </div>
</div>
    );
  }
}

export default App;
