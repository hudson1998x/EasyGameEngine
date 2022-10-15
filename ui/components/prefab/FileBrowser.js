const ELCore = require('./../SupportLibrary');
const GridAdapter = require('./../grid/GridAdapter');
const fs = require('fs');
const FileTile = require('./FileBrowser/FileTile');
const DirectoryView = require('./FileBrowser/DirectoryView');

class FileBrowser extends ELCore.Component {

	constructor(props = {}) {
		super(props);

		if ( props.css ) {
			for(let key in props.css) {
				this.css(key , props.css[key]);
			}
		}
		this.props.currentDir = props.rootDir;
		this.props.openFile = props.fileOpen;
		this.reload();
		this.fileGrid = new GridAdapter({
			list: [] , 
			component: FileTile ,
			fileOpen: props.fileOpen
		});
		this.directory = new DirectoryView({
			directory: props.rootDir , 
			onDirectoryClick: (dir) => {
				this.props.currentDir = dir;
				this.directory.props.directory = dir;
				this.directory.render();
				this.reload();
			}
		});
		// console.log("Props" , props);
		// console.log("File Grid" , this.fileGrid);
	}
	reload() {
		fs.readdir(this.props.currentDir , (err , files) => {
			if ( err ) {
				this.domElement.querySelector('.files').innerHTML = `<p class="notice error">${err}</p>`;
				return;
			}
			let list = [];
			list.push({
				name: "../" , 
				isDirectory: true , 
				directory: "../"
			});
			files.forEach((entry) => {
				list.push({
					name: entry , 
					isDirectory: fs.lstatSync(this.props.currentDir + '/' + entry).isDirectory() , 
					directory: this.props.currentDir
				});
			});
			
			this.fileGrid.list = list;
			this.fileGrid.render();

			this.directory.render();
		});
	}
	enterDirectory(dirName){
		this.props.currentDir += '/' + dirName;
		this.directory.props.directory = this.props.currentDir;
		// console.log(this.directory);
		this.reload();
	}
	render() {
		this.domElement.innerHTML = `
			<div class="control-bar">

			</div>
			<div class="files">

			</div>
			<div class="directory-view">

			</div>
		`;
		this.reload();
		this.domElement.querySelector('.files').appendChild(this.fileGrid.render());
		this.domElement.querySelector('.directory-view').appendChild(this.directory.render());
		return this.domElement;
	}
}

module.exports = FileBrowser;