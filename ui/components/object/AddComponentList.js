const ELCore = require('./../SupportLibrary');
const fs = require('fs');

const ImageComponent = require('./../../../engine/ui/components/ImageComponent');
const VideoComponent = require('./../../../engine/ui/components/VideoComponent');
const AudioComponent = require('./../../../engine/ui/components/AudioComponent');
const RectangleComponent = require('./../../../engine/ui/components/RectangleComponent');
const ScriptableComponent = require('./../../../engine/ui/components/ScriptableComponent');


class AddComponentList extends ELCore.Component {

	constructor(props = {}){
		super(props);

		this.domElement.setAttribute('component' , 'component-store');
	}
	render(){
		super.render();

		this.domElement.innerHTML = `<label style="color:#fff;font-family:sans-serif;text-indent:15px;line-height:40px;display:block;border-bottom:1px solid #000;font-size:12px;">Components</label>`;


		this.getComponentList()
			.forEach((component) => {
				let li = document.createElement("li");
				li.textContent = component.name;
				li.comp = component;

				li.onclick = () => {
					let comp = eval(`new ${component.name}({ style: "" })`);
					if ( this.parent.state.activeObject ) {
						this.parent.state.activeObject.addChild(comp);
					} else {
						this.parent.state.object.addChild(comp);
					}
					this.parent.setState({
						activeObject: comp
					});
				}

				this.domElement.appendChild(li);
			});

		return this.domElement;
	}
	getIcon(){
		return 'media/component.png';
	}
	getComponentList(dir = 'engine/ui/components'){
		let out = [];

		fs.readdirSync(dir).forEach((entry) => {

			if ( entry === 'Abstract.js' ) {
				return;
			}

			if ( fs.lstatSync(dir + '/' + entry).isDirectory() ) {
				this.getComponentList(dir + '/' + entry)
					.forEach((item) => {
						out.push(item);
					});
				return;
			}
			out.push({
				'req': './../../../engine/ui/components/' + dir + '/' + entry.split('.js').join('') , 
				'name': entry.split('.js').join('')
			});

		});

		return out;
	}

}
module.exports = AddComponentList;