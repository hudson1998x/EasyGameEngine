const CategorizedFileInterface = require('./CategorizedFileInterface');

class VideosInterface extends CategorizedFileInterface {
	
	autoloadDefaults(){
		this.fileDir = 'source/videos';
		this.fileType = ['mp4' , 'webm' , 'ogg'];
		this.onFileOpenAction = this.fileOpen;
		this.onFileSaveAction = this.saveFile;
	}
}
module.exports = VideosInterface;