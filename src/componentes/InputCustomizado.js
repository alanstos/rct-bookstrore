import React, {Component} from 'react';
import PubSub from 'pubsub-js';

class InputCustomizado extends Component {

    
	constructor(){
		super();
		this.state = {msgCampo : ''};
	}

	componentDidMount(){

		PubSub.subscribe("validacao-input-autores",function(topico,erro){

			if(erro.param === this.props.name){
				this.setState({ msgCampo : erro.msg }); 
			}

		}.bind(this));


		PubSub.subscribe("validacao-input-livros",function(topico,erro){

			console.log('entrou no did mount do InputCustomizado');

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
          <input id={this.props.id} name={this.props.name} type={this.props.type} placeholder={this.props.placeholder} value={this.props.value} onChange={this.props.onChange} />
          <span className="erro">{this.state.msgCampo}</span>
      </div>	

      );	

	}
	
}

export default InputCustomizado;