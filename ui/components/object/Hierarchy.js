const ELCore = require('./../SupportLibrary');

class Hierarchy extends ELCore.Component {

	constructor(props){
		super(props);
	}
	getIcon(){
		return 'media/hierarchy.png';
	}
	changeObject(obj){
		this.setState({
			object: obj
		});
	}
	render(){
		return super.render();
	}
}
module.exports = Hierarchy;