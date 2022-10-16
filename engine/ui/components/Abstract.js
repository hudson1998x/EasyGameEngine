class Abstract {
	constructor(props = {}){
		this.props = props;
		this.domElement = document.createElement(this.defaultNodeName());		
		this.parent = null;
		this.children = [];
		this.id = "";
	}
	setId(id){
		this.id = id;
		return this;
	}
	getId(){
		return this.id;
	}
	getParent(){
		return this.parent;
	}
	getComponentById(id){
		let out = false;

		this.children.some((child) => {
			if ( child.getId() == id ) {
				out = child;
				return true;
			}
			let c = child.getComponentById(id);

			if ( c ) {
				out = c;
				return true;
			}
		});

		return out;
	}
	addChild(child){
		child.parent = this;
		this.children.push(child);
		return this;
	}
	defaultNodeName(){
		return 'div';
	}
	render(){
		return this.domElement;
	}
}
module.exports = Abstract;