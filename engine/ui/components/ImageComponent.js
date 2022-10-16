const Abstract = require('./Abstract');
const AssetManager = require('./../../AssetManager');

class ImageComponent extends Abstract {

	constructor(props = {}){
		super(props);
		if ( !this.props.src ) {
			this.props.src = "";
		}
	}
	defaultNodeName(){
		return 'img';
	}
	render(){
		super.render();

		this.domElement.src = AssetManager.getPathWherever(this.props.src);

		return this.domElement;
	}
}

module.exports = ImageComponent;