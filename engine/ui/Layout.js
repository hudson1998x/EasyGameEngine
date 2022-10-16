const ImageComponent = require('./components/ImageComponent');
const VideoComponent = require('./components/VideoComponent');
const AudioComponent = require('./components/AudioComponent');
const RectangleComponent = require('./components/RectangleComponent');
const ScriptableComponent = require('./components/ScriptableComponent');


class Layout {

	constructor(){
		this.children = [];
	}
	parse(fileContent){

		let parser = new DOMParser();

		let doc = parser.parseFromString(fileContent , 'text/xml');
		// console.log(doc.children[0]);

		this.buildTree(doc.children[0].children , this);
		this.id = 'UI.Root';
	}
	addChild(child){
		this.children.push(child);
	}
	render(){
		let d = document.createElement("div");

		this.children.forEach((child) => {
			d.appendChild(child.render());
		});

		return d;
	}
	buildTree(componentList , parent){

		for(let a = 0;a < componentList.length;a++){
			let child = componentList[a];
			let compName = child.tagName;

			let props = {

			};
			if ( child.attributes ) {
				for(let i = 0;i < child.attributes.length;i++){
					props[child.attributes[i].nodeName] = child.attributes[i].nodeValue;
				}	
			}

			try{
				let inst = eval(`new ${compName}(${JSON.stringify(props)})`);
				inst.setId(child.getAttribute("id"));
				parent.addChild(inst);

				if ( child.children.length > 0 ) {
					this.buildTree(
						child.children , 
						inst
					);
				}
			}catch(e){
				console.log("Error on component: " + compName , e);
				console.warn(child);
			}
		}

	}

}
module.exports = Layout;