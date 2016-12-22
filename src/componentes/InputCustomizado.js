import React, {Component} from 'react';

class InputCustomizado extends Component {

	constructor(){
		super();
	}

	render(){

		return (

      <div className="pure-control-group">
          <label htmlFor={this.props.id}>{this.props.label}</label>
          <input id={this.props.id} type={this.props.type} placeholder={this.props.placeholder} value={this.props.nome} onChange={this.props.onChange} />
      </div>	

      );	

	}
	
}

export default InputCustomizado;