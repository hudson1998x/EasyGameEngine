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
		return this.domElement;
	}

}

module.exports = DirectoryControl;