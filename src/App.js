import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/pure-min.css';
import './css/side-menu.css';

class App extends Component {

  
  constructor(){
    super();

    this.state = {lista : [{nome:'joao barbosa', email:'joao.barbosa@caelum.com.br',senha:'123456'}]};
  }


  componentWillMount(){
    console.log('componentWillMount');
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
            <h1>Page Title</h1>
            <h2>A subtitle for your page goes here</h2>
        </div>

        <div className="content">


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
