import React, {Component} from 'react';


class TabelaLivros extends Component {

	
	render(){

		return (
           <div className="classTabela">
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Titulo</th>
                    <th>Preco</th>
                    <th>Autor</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    this.props.lista.map(function(livro){
                      return(
                        <tr key={livro.id}>
                          <td>{livro.titulo}</td>
                          <td>{livro.preco}</td>
                          <td>{livro.autor}</td>
                        </tr>
                        )
                      })
                  }
                </tbody>

               
              </table>
              <div>
                  <h6>@bookstore - 2016</h6>
              </div>
          </div>
        
			);
	}

}

export default TabelaLivros;