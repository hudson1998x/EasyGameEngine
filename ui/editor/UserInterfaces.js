const CategorizedFileInterface = require('./CategorizedFileInterface');
const UIEditor = require('./UIEditor');
const fs = require('fs');
const Layout = require('./../../engine/ui/Layout');

class UserInterfaces extends CategorizedFileInterface {
	autoloadDefaults(){
		this.fileDir = 'source/ui';
		this.fileType = ['ui'];
		this.onFileOpenAction = this.fileOpen;
		this.onFileSaveAction = this.saveFile;

		this.editor = new UIEditor({});
	}
	getFileLabel(){
		return 'User Interface';
	}
	getDefaultFileTemplate(){
		return '<?xml version="1.0" encoding="utf-8"?>\n' + 
		'\t<layout>\n\n\t</layout>\n';
	}
	getFileOpenAction(file){
		if ( file.indexOf('.ui') > -1 ) {
			this.editor.props.currentFile = file;

			fs.readFile(file , (err , file) => {
				if ( err ) {
					alert("Couldn't open file: " + err);
					return;
				}
				let object = this.createObjectHierarchy(file);

				this.getRootComponent()
				.setState({
					screen: 'ObjectEditor' , 
					EditorComponent: this.editor
				});
				this.editor.setState({
					object: object
				});
			});
		} else {
			alert("Cannot open file " + file + " in " + this.getFileLabel() + " editor");
		}
	}
	createObjectHierarchy(str){
		let layout = new Layout();
		layout.parse(str);
		return layout;
	}
}
module.exports = UserInterfaces;