const Abstract = require('./Abstract');

class VideoComponent extends Abstract {

	constructor(props = {}){
		super(props);
	}
	defaultNodeName(){
		return 'video';
	}
	render(){
		super.render();

		this.domElement.innerHTML = `<source src="${this.props.src}/>`;

		return this.domElement;
	}
}

module.exports = VideoComponent;