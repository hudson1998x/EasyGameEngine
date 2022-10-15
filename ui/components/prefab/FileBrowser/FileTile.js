const ELCore = require('./../../SupportLibrary');

class FileTile extends ELCore.Component {

	constructor(props , file) {
		super(props);
		this.domElement.setAttribute("component" , "file");
		this.props.openFile = props.fileOpen;
		this.file = file;
		// console.log(this);
	}
	getDefaultTagName(){
		return 'li';
	}
	getFileIcon(){
		if ( this.file.isDirectory ) {
			return 'media/directory.png';
		}
		return 'media/unknown.ico';
	}
	render(){
		this.domElement.innerHTML = `
			<img src="${this.getFileIcon()}"/>
			<span>${this.file.name}</span>
		`;
		this.domElement.onclick = () => {
			if ( this.props.click ) {
				this.props.click(this.file);
			}
		}
		this.domElement.ondblclick = () => {
			console.log(this.props);
			this.props.openFile(this.file);
		}
		return this.domElement;
	}
}

module.exports = FileTile;