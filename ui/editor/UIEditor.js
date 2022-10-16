const ELCore = require('./../components/SupportLibrary');
const Hierarchy = require('./../components/object/Hierarchy');


class UIEditor extends ELCore.Component {

	constructor(props){
		super(props);

		this.hierarchy = new Hierarchy({});
		
	}
	render(){
		this.hierarchy.changeObject(this.state.object);
		this.domElement.innerHTML = `
			<div class="topbar">

			</div>
			<div class="rightbar">
				<div class="tab-control">

				</div>
				<div class="tab-items">

				</div>
			</div>
			<div class="content">

			</div>
		`;

		this.addTabComponent(this.hierarchy);

		let activeComponent = this.state.active;

		if ( !activeComponent ) {
			this.domElement.querySelector('.rightbar button').click();
		}

		this.state.active.btn.className = 'active';

		return this.domElement;
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
	}
}
module.exports = UIEditor;