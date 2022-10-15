const ELCore = require('./../../SupportLibrary');

class DirectoryView extends ELCore.Component {

	constructor(props) {
		super(props);
	}
	render(){
		this.domElement.innerHTML = '';
		// console.log(this);

		let paths = [];
		let raw = this.props.directory.split("/");
		raw.forEach((item) => {
			if ( item == ".." ) {
				paths.splice(paths.length - 1 , 1);
			} else {
				if ( item == "" ) {
					return;
				}
				paths.push(item);
			}
		});
		// console.log("Paths: " , paths);
		let offset = 0;
		let maxShown = 6;

		offset = paths.length - maxShown;
		paths.forEach((path , index) => {
			if ( index < offset ) {
				return;
			}
			let d = document.createElement("div");
			d.className = 'path-item';
			d.setAttribute("directory" , this.getPath(paths , (offset > 0 ? offset - index : index)));
			d.innerHTML = `<span>${path}</span>`;
			d.setAttribute("style" , "left:" + ((this.domElement.getBoundingClientRect().width / 6) * (offset > 0 ? offset - index : index)) + "px;z-index:" + (1000 - index));
			d.onclick = () => {
				this.props.onDirectoryClick(d.getAttribute("directory"));
			}
			this.domElement.appendChild(d);
		});
		return this.domElement;
	}
	getPath(arr , end){
		let out = "";

		arr.some((item , idx) => {
			if ( idx > end ) {
				return true;
			}
			out += (idx > 0 ? "/" : "") + item;
		});
		return out;
	}
}

module.exports = DirectoryView;