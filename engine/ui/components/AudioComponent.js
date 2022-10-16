const Abstract = require('./Abstract');

class AudioComponent extends Abstract {

	constructor(props = {}){
		super(props);
	}
	defaultNodeName(){
		return 'audio';
	}
	render(){
		super.render();

		this.domElement.innerHTML = `<source src="${this.props.src}/>`;

		return this.domElement;
	}
}

module.exports = AudioComponent;