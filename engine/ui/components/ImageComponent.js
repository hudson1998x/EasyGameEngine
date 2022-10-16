const Abstract = require('./Abstract');

class ImageComponent extends Abstract {

	constructor(props = {}){
		super(props);
		console.log(this);
	}
	defaultNodeName(){
		return 'img';
	}
	render(){
		super.render();

		this.domElement.src = this.props.src;

		return this.domElement;
	}
}

module.exports = ImageComponent;