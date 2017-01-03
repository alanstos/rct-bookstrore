import React , {Component} from 'react';

class ComboBox extends Component {

	render(){

		return (
				<div className="pure-control-group">
          			<label htmlFor={this.props.idCombo}>{this.props.label}</label>				
					<select id={this.props.idCombo} name={this.props.label} onChange={this.props.onChange} value={this.props.value}>
						<option value="" >Selecione</option>
	                  {
	                    this.props.autores.map(function(autor){
	                      return(
						  	<option key={autor.id} value={autor.id}>{autor.nome}</option>
	                        )
	                      })
	                  }
					</select>
                </div>			
			);
	}
}

export default ComboBox;