const CategorizedFileInterface = require('./CategorizedFileInterface');

class UserInterfaces extends CategorizedFileInterface {
	autoloadDefaults(){
		this.fileDir = 'source/ui';
		this.fileType = ['ui'];
		this.onFileOpenAction = this.fileOpen;
		this.onFileSaveAction = this.saveFile;
	}
}
module.exports = UserInterfaces;