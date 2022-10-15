const CategorizedFileInterface = require('./CategorizedFileInterface');

class ScriptsInterface extends CategorizedFileInterface {
	autoloadDefaults(){
		this.fileDir = 'source/scripts';
		this.fileType = ['js' , 'ts' , 'jsx' , 'tsx'];
		this.onFileOpenAction = this.fileOpen;
		this.onFileSaveAction = this.saveFile;
	}
}
module.exports = ScriptsInterface;