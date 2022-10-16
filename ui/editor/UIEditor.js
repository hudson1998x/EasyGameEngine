const ELCore = require('./../components/SupportLibrary');
const Hierarchy = require('./../components/object/Hierarchy');
const AddComponentList = require('./../components/object/AddComponentList');
const fs = require('fs');
class UIEditor extends ELCore.Component {

	constructor(props = {}){
		super(props);

		this.hierarchy = new Hierarchy({});
		this.hierarchy.parent = this;

		this.domElement.className = 'ui-editor';

		this.componentStore = new AddComponentList({});
		this.componentStore.parent = this;

		
	}
	render(){
		this.hierarchy.changeObject(this.state.object);
		this.domElement.innerHTML = `
			<div class="topbar-nav">

			</div>
			<div class="rightbar">
				<div class="hierarchy">

				</div>
				<div class="tab-control">

				</div>
				<div class="tab-items">

				</div>
			</div>
			<div class="content">

			</div>
		`;
		if ( this.state.object ) {
			this.domElement.querySelector('.content').appendChild(
				this.state.object.render()
			);
		}
		this.addTabComponent(this.componentStore);
		const saveBtn = document.createElement('button');

		saveBtn.onclick = () => {
			// alert('Saving: ' + this.props.currentFile);
			this.save();
		}
		saveBtn.textContent = 'Save';

		const backToEditor = document.createElement('button');
		backToEditor.onclick = () => {
			this.getRootComponent().setState({
				screen: 'UserInterfaces'
			});
		};
		backToEditor.innerHTML = '&larr; Back';
		this.domElement.querySelector('.topbar-nav').appendChild(backToEditor);
		this.domElement.querySelector('.topbar-nav').appendChild(saveBtn);
		this.domElement.querySelector('.hierarchy').appendChild(this.hierarchy.render());
		// this.addTabComponent(this.hierarchy);

		return this.domElement;
	}
	save(){

		let xml = '<?xml version="1.0" encoding="utf-8"?>';
		xml += '\n  <layout>\n';
		xml += this.getXml(this.state.object.children , 2);

		xml += '\n  </layout>';
		let path = this.props.currentFile;

		fs.writeFile(path , xml , (err) => {
			if ( err ) {
				alert(err);
				return;
			} else {
				alert("File saved");
			}
		});

	}
	getXml(layerCollection , tabIndent = 0){
		let xml = '';

		layerCollection.forEach((component) => {

			for(let i = 0;i < tabIndent;i++){
				xml += '  ';
			}

			xml += '<' + component.constructor.name + ' ';
			xml += 'id="' + component.id + '" ';
			for( let prop in component.props ) {
				if ( prop === 'id' ) {
					continue;
				}
				xml += prop + '="' + component.props[prop] + '" ';
			}

			if ( component.children && component.children.length > 0 ) {
				xml += ">\n";
				xml += this.getXml(component.children , tabIndent + 1);
				for(let i = 0;i < tabIndent;i++){
					xml += '  ';
				}
				xml += '</' + component.constructor.name + '>';
			} else {
				xml += '/>\n';
			}
		});

		return xml;
	}
	addTabComponent(component) {

		this.domElement.querySelector('.tab-items').appendChild(component.render());
		let btn = document.createElement("button");
		btn.innerHTML = `<img src="${component.getIcon()}"/>`;
		btn.onclick = () => {

			this.domElement.querySelectorAll('.tab-items > .active').forEach(i => i.className = '');

			this.setState({
				active: component
			});
			component.domElement.className = 'active';
		}
		component.btn = btn;
		this.domElement.querySelector(".tab-control").appendChild(btn);

		let activeComponent = this.state.active;

		if ( !activeComponent ) {
			this.domElement.querySelector('.rightbar button').click();
		}
		this.state.active.btn.className = 'active';
	}
}
module.exports = UIEditor;