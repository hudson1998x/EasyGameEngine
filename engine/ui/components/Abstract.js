const AssetManager = require('./../../AssetManager');

class Abstract {
	constructor(props = {}){
		// console.log(props);
		this.props = props;
		
		this.props.scripts = (props.scripts + "") ? (props.scripts + "").split(",") : [];

		this.domElement = document.createElement(this.defaultNodeName());		
		this.parent = null;
		this.children = [];
		this.id = "";
		this.events = {
			keydown: [] , 
			keyup: [] , 
			hover: [] , 
			hoverleave: [] , 
			context: [] , 
			click: []
		};
		if ( !this.props.style ){
			this.props.style = '';
		}
		this.props.style += 'position:absolute;';

		if ( !this.props.scripts ) {
			this.props.scripts = [];
		}	 
		this.domElement.addEventListener('click' , (ev) => {
			this.events.click.forEach((call) => {
				call(ev);
			});
		});
		this.domElement.addEventListener('keydown' , (ev) => {
			this.events.keydown.forEach((call) => {
				call(ev);
			});
		});
		this.domElement.addEventListener('keyup' , (ev) => {
			this.events.keyup.forEach((call) => {
				call(ev);
			});
		});
		this.domElement.addEventListener('context' , (ev) => {
			this.events.context.forEach((call) => {
				call(ev);
			});
		});
		this.domElement.addEventListener('mouseenter' , (ev) => {
			this.events.hover.forEach((call) => {
				call(ev);
			});
		});
		this.domElement.addEventListener('mouseleave' , (ev) => {
			this.events.hoverleave.forEach((call) => {
				call(ev);
			});
		});
		this.initScripts();
	}
	initScripts(){
		this.props.scripts.forEach((script) => {
			if ( script === "undefined" ) {
				return;
			}
			AssetManager.loadAsset(script)
						.then((rawJs) => {
							let dec = eval(rawJs);

							let handle = eval(`new ${dec}(this)`);
							handle.onScriptLoaded(this);
						})
						.catch((err) => {
							console.error(err);
						});
		});
	}
	click(callable){
		this.events.click.push(callable);
	}
	keydown(callable){
		this.events.keydown.push(callable);
	}
	keyup(callable){
		this.events.keyup.push(callable);
	}
	hover(callable){
		this.events.hover.push(callable);
	}
	hoverleave(callable){
		this.events.hoverleave.push(callable);
	}
	context(callable){
		this.events.context.push(callable);
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
		this.domElement.id = this.id;
		if ( this.props.style ) {
			this.domElement.setAttribute("style" , this.props.style);
		}
		this.children.forEach((child) => {
			this.domElement.appendChild(child.render());
		})
		return this.domElement;
	}
}
module.exports = Abstract;