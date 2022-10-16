

class Layout {

	parse(fileContent){

		let parser = new DOMParser();

		let doc = parser.parseFromString(fileContent , 'text/xml');
		// console.log(doc.children[0]);

		this.buildTree(doc.children[0].children , this);

	}
	buildTree(componentList , parent){

		for(let a = 0;a < componentList.length;a++){
			let child = componentList[a];
			let compName = child.tagName;

			let props = {

			};
			if ( child.attributes ) {
				for(let i = 0;i < child.attributes.length;i++){
					props[child.attributes[i]] = child.getAttribute(child.attributes[i]);
				}	
			}

			try{
				let inst = new compName(props);
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