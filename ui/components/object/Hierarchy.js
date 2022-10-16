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

		super.render();

		if ( !this.state.object ) {
			this.domElement.innerHTML = `
				<p class="notice error">No Object Passed to Hierarchy</p>
			`;
		} else {

			this.domElement.innerHTML = '<div class="title">Outliner</div>';
			this.domElement.appendChild(this.createTree(this.state.object));

		}

		return this.domElement;
	}
	setActiveObject(obj){
		this.parent.setState({
			activeObject: obj
		});
	}
	createTree(obj){

		let li = document.createElement("li");
		li.onmouseover = (ev) => {
			li.className = 'hover';
			ev.stopImmediatePropagation();
			if ( li.object === this.parent.state.activeObject ) {
				li.className += ' active';
			}
		};
		li.onmouseleave = (ev) => {
			if ( li.object === this.parent.state.activeObject ) {
				li.className = 'active';
			}else{
				li.className = '';
			}
			ev.stopImmediatePropagation();	
		}
		
		let rename = document.createElement("button");
		rename.textContent = 'Rename';
		rename.onclick = (ev) => {
			if ( ev.target.tagName.toLowerCase() === 'button' ) {
				ev.stopImmediatePropagation();
				prompt("Enter Object ID")
					.then((id) => {
						li.object.setId(id);
						this.render();
					})
					.catch(() => {
						//empty leave alone.
					});
			}
			
		}

		let toggleVis = document.createElement("button");
		toggleVis.textContent = obj && obj.domElement && obj.domElement.hasAttribute("hide") ? "Show" : "Hide";

		toggleVis.onclick = (ev) => {
			if ( ev.target.tagName.toLowerCase() === 'button' ) {
				ev.stopImmediatePropagation();
				if ( toggleVis.textContent === 'Hide' ) {
					li.object.domElement.setAttribute("hide" , "");
					toggleVis.textContent = 'Show';
				} else {
					li.object.domElement.removeAttribute("hide");
					toggleVis.textContent = 'Hide';
				}
			}
		};
		li.object = obj;
		li.onclick = (ev) => {
			ev.stopImmediatePropagation();
			ev.stopPropagation();
			ev.preventDefault();
			this.setActiveObject(li.object);
		}
		if ( li.object === this.parent.state.activeObject ) {
			li.className = 'active';
		}
		let label = document.createElement("label");
		label.textContent = obj.constructor.name + ':' + obj.id;
		li.appendChild(label);
		label.appendChild(toggleVis);
		label.appendChild(rename);

		let childList = document.createElement("ul");
		// console.log('Has children: ' , obj.children);
		obj.children.forEach((child) => {
			childList.appendChild(
				this.createTree(child)
			);
		});

		li.appendChild(childList);

		return li;
	}
}
module.exports = Hierarchy;