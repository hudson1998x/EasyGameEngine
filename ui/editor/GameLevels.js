const CategorizedFileInterface = require('./CategorizedFileInterface');

class GameLevels extends CategorizedFileInterface {
	autoloadDefaults(){
		this.fileDir = 'source/levels';
		this.fileType = ['scene'];
		this.onFileOpenAction = this.fileOpen;
		this.onFileSaveAction = this.saveFile;
	}
}
module.exports = GameLevels;