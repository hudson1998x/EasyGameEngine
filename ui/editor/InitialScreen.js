const ELCore = require('./../components/SupportLibrary');
const Topbar = require('./../components/prefab/Topbar');

class InitialScreen extends ELCore.Component {

	constructor(props){
		super(props);

		this.addChildComponent(new Topbar());
	}
	render() {
		let dom = super.render();

		if ( this.state.errorOccured ) {
			let err = document.createElement("p");
			err.className = 'notice error';
			err.textContent = this.state.errorMessage;

			dom.appendChild(err);
		}
		return dom;
	}

}
module.exports = InitialScreen;
