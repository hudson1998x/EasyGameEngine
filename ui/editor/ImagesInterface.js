const CategorizedFileInterface = require('./CategorizedFileInterface');

class ImagesInterface extends CategorizedFileInterface {
	autoloadDefaults(){
		this.fileDir = 'source/images';
		this.fileType = ['png' , 'gif' , 'bmp' , 'webp' , 'jpg' , 'jpeg', 'ico'];
		this.onFileOpenAction = this.fileOpen;
		this.onFileSaveAction = this.saveFile;
	}
}
module.exports = ImagesInterface;