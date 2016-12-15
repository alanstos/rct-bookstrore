import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';

class App extends Component {

  
  constructor(){
    super();
    this.state = {lista : []};
  }


  componentWillMount(){
    console.log('componentWillMount');
    $.ajax({
        url : 'http://localhost:3001/api/autores',
        method : 'get',
        dataType: 'jsonp',


        success : function(result){
          console.log('sucesso');
          this.setState({lista: result}).bind(this);

        }.bind(this),
        error : function (result){
          console.log('deu errroooo');
          console.log(result);
        }.bind(this)
    });




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

          <form className="pure-form pure-form-aligned">
                  <fieldset>
                      <div className="pure-control-group">
                          <label htmlFor="name">Nome</label>
                          <input id="name" type="text" placeholder="Nome"/>
                      </div>

                      <div className="pure-control-group">
                          <label htmlFor="email">Email Address</label>
                          <input id="email" type="email" placeholder="Email Address"/>
                      </div>

                      <div className="pure-control-group">
                          <label htmlFor="password">Password</label>
                          <input id="password" type="password" placeholder="Password"/>
                      </div>                      
              

              
                      <div className="pure-controls">

                          <button type="submit" className="pure-button pure-button-primary">Submit</button>
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
                        <tr>
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
