const CategorizedFileInterface = require('./CategorizedFileInterface');

class ObjectEditor extends CategorizedFileInterface {
	autoloadDefaults(){
		this.fileDir = 'source/objectFactory';
		this.fileType = ['obj3d'];
		this.onFileOpenAction = this.fileOpen;
		this.onFileSaveAction = this.saveFile;
	}
}
module.exports = ObjectEditor;