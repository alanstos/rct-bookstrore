import React , {Component} from 'react';
import PubSub from 'pubsub-js';

class ComboBox extends Component {


	constructor(){
		super();
		this.state = {msgCampo : ''};
	}

	componentDidMount(){

		PubSub.subscribe("validacao-input-livros",function(topico,erro){

			console.log('entrou no did mount do ComboBox');

			if(erro.param === this.props.name){
				this.setState({ msgCampo : erro.msg }); 
			}

		}.bind(this));

		PubSub.subscribe("limpa-erros",function(topico){                        
			this.setState({msgCampo:''});                        
		}.bind(this)); 				

	}	

	render(){

		return (
				<div className="pure-control-group">
          			<label htmlFor={this.props.id}>{this.props.label}</label>				
					<select id={this.props.id} name={this.props.label} onChange={this.props.onChange} value={this.props.value}>
						<option value="" >Selecione</option>
	                  {
	                    this.props.autores.map(function(autor){
	                      return(
						  	<option key={autor.id} value={autor.id}>{autor.nome}</option>
	                        )
	                      })
	                  }
					</select>
					<span>{this.state.msgCampo}</span>
                </div>			
			);
	}
}

export default ComboBox;