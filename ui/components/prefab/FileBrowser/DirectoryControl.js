const ELCore = require('./../../SupportLibrary');
const fs = require('fs');

class DirectoryControl extends ELCore.Component {

	constructor(props){
		super(props);

		this.mkdirButton = document.createElement("button");
		this.mkdirButton.textContent = '+ Directory';
		this.mkdirButton.onclick = () => {
			this.mkdir();
		};

		this.newFileBtn = document.createElement("button");
		this.newFileBtn.textContent = ' + Create ' + this.props.label;
		this.newFileBtn.onclick = () => {
			this.parent.requestFileCreate();
		}

	}
	mkdir(){
		prompt("Enter Directory Name").then((dirname) => {
			if ( dirname === '' ) {
				return;
			}
			if ( fs.existsSync(this.props.directory + '/' + dirname) ) {
				return;
			}
			try {
				fs.mkdirSync(this.props.directory + '/' + dirname);
				this.parent.render();
			} catch ( e ) {
				console.error(e);
			}
		})
		.catch((err) => {

		});
	}
	render() {

		this.domElement.innerHTML = '';
		this.domElement.appendChild(this.mkdirButton);
		this.domElement.appendChild(this.newFileBtn);
		this.newFileBtn.textContent =  ' + Create ' + this.props.label;
		return this.domElement;
	}

}

module.exports = DirectoryControl;