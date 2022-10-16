const Abstract = require('./Abstract');
const AssetManager = require('./../../AssetManager');

class TextComponent extends Abstract {

	constructor(props = {}){
		super(props);
		if(!this.props.text){
			this.props.text = "Unbound";
		} 
		if ( !this.props.color ) {
			this.props.color = '#000';
		}
		if ( !this.props.fontSize ) {
			this.props.fontSize = '11px';
		}
		if ( !this.props.fontFamily ) {
			this.props.fontFamily = 'system-ui';
		}
	}
	defaultNodeName(){
		return 'p';
	}
	render(){
		super.render();

		this.domElement.textContent = this.props.text;
		this.domElement.style.color = this.props.color;
		this.domElement.style.fontSize = this.props.fontSize;
		this.domElement.style.fontFamily = this.props.fontFamily;

		return this.domElement;
	}
}

module.exports = TextComponent;