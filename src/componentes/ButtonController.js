import React, {Component} from 'react';

class ButtonController extends Component {

	render() {

		return (

          <div className="pure-controls">

              <button type={this.props.type} className="pure-button pure-button-primary" onClick={this.props.onClick} >{this.props.label}</button>
          </div>		

		);

	}
	
}

export default ButtonController;