const ELCore = require('./../components/SupportLibrary');
const Topbar = require('./../components/prefab/Topbar');
const FileBrowser = require('./../components/prefab/FileBrowser');
const fs = require('fs');

class CategorizedFileInterface extends ELCore.Component {

	constructor(props){
		super(props);

		this.addChildComponent(new Topbar());

		try{
			this.autoloadDefaults();
		}catch(e){
			console.log('No Autoload: ' , this.autoloadDefaults);
			this.fileDir = props.dir;
			this.fileType = props.fileType;
			this.onFileOpenAction = props.onFileOpen;
			this.onFileSaveAction = props.onFileSave;
			this.addChildComponent(new Topbar());

		}
		const self = this;
		let openFile = (file) => {
			if ( file.isDirectory ) {
				this.fileBrowser.enterDirectory(file.name);
			} else {
				this.getFileOpenAction(file.directory + '/' + file.name);
			}
		}
		let ref = {
			css: {
				position: "absolute" , 
				top: "95px" , 
				left: "45px" , 
				width: "567px" , 
				height: "756px" , 
				background: "#222"
			} , 
			fileTypes: this.fileType , 
			rootDir: this.fileDir , 
			fileOpen: openFile
		};
		this.fileBrowser = new FileBrowser(ref);
		this.fileBrowser.setFileLabel(this.getFileLabel());

		// console.log("PassedToFileBrowser" , ref , this.onFileOpenAction);
		this.addChildComponent(this.fileBrowser);

		this.fileBrowser.setFileLabel(this.getFileLabel());


	}
	getFileOpenAction(file){
		alert('Cannot open: ' + file);
	}
	createNewFilePrompt(){
		return new Promise((resolve , reject) => {
			prompt("Enter new Filename")
			  .then((filename) => {
			  	console.log('Creating file: ' + this.fileBrowser.props.currentDir + '/' + filename );
			  		try{
			  			fs.writeFileSync(this.fileBrowser.props.currentDir + '/' + filename , this.getDefaultFileTemplate());
			  		}catch(e){
			  			console.error(e);
			  			reject(e);
			  		}
			  		this.fileBrowser.render();
			  		resolve();
			  })
			  .catch(() => {
					reject();
			  })
		});
	}
	getDefaultFileTemplate(){
		return '{}';
	}
	getFileLabel(){
		return 'Unknown';
	}
}
module.exports = CategorizedFileInterface;
