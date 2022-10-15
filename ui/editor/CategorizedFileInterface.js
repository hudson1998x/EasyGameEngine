const ELCore = require('./../components/SupportLibrary');
const Topbar = require('./../components/prefab/Topbar');
const FileBrowser = require('./../components/prefab/FileBrowser');

class CategorizedFileInterface extends ELCore.Component {

	constructor(props){
		super(props);

		this.addChildComponent(new Topbar());

		if ( typeof this.autoloadDefaults ) {
			this.autoloadDefaults();
		} else {

			this.fileDir = props.dir;
			this.fileType = props.fileType;
			this.onFileOpenAction = props.onFileOpen;
			this.onFileSaveAction = props.onFileSave;
			this.addChildComponent(new Topbar());

		}
		let openFile = (file) => {
			if ( file.isDirectory ) {
				this.fileBrowser.enterDirectory(file.name);
			} else {
				alert("Opening file: " + file.directory + '/' + file.name);
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

		// console.log("PassedToFileBrowser" , ref , this.onFileOpenAction);
		this.addChildComponent(this.fileBrowser);
	}

}
module.exports = CategorizedFileInterface;
