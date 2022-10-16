
class Component {
	constructor(props = {}) {
		this.state = {};
		this.props = props;;
		this.domElement = document.createElement(this.getDefaultTagName());
		this.children = [];
		this.parent = null;
	}
	css(key , value){
		if ( typeof value === 'undefined') {
			return this.domElement.style[key];
		} else {
			this.domElement.style[key] = value;
			return this;
		}
	}
	attr(key , value){
		if ( typeof value === 'undefined') {
			return this.domElement.getAttribute(key);
		} else {
			this.domElement.setAttribute(key , value);
			return this;
		}
	}
	setState(props , ignoreUpdate = false) {
		for(let prop in props){
			this.state[prop] = props[prop];
		}
		if ( !ignoreUpdate ) {
			this.render();
		}
	}
	setProps(props , ignoreUpdate = false){
		for(let prop in props){
			this.props[prop] = props[prop];
		}
		if ( !ignoreUpdate ) {
			this.render();
		}
	}
	forceUpdate(){

		let parent = this.parent;
		while((parent = parent.parent) !== null) {
			//do nothing.
		}
		parent.render();
	}
	getRootComponent(){
		let parent = this;
		let outparent = null;
		while((parent = parent.parent) != null) {
			//do nothing.
			outparent = parent;
		}
		// console.log('Parent: ' , outparent);
		return outparent;
	}
	getDefaultTagName(){
		return 'div';
	}
	addChildComponent(component){
		component.parent = this;
		this.children.push(component);
		return this;
	}
	render(){
		this.domElement.innerHTML = ``;

		this.children.forEach((component) => {
			this.domElement.appendChild(component.render());
		});

		return this.domElement;
	}
}


module.exports = {
	Component
}