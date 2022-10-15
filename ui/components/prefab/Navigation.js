const ELCore = require('./../SupportLibrary');

class Navigation extends ELCore.Component {

	constructor(props){
		super(props);

		this.domElement.innerHTML = `
			<nav class="topbar-nav">
				<li onclick="changeEditorContent('InitialScreen')">Dashboard</li>
				<li onclick="changeEditorContent('GameSettings')">Game Settings</li>
				<li onclick="changeEditorContent('UserInterfaces')">User Interfaces</li>
				<li onclick="changeEditorContent('GameLevels')">Levels</li>
				<li onclick="changeEditorContent('ObjectFactory')">Object Factory</li>
				<li onclick="changeEditorContent('Scripts')">Scripts</li>
				<li onclick="changeEditorContent('Images')">Images</li>
				<li onclick="changeEditorContent('Videos')">Videos</li>
			</nav>
		`;

		window.changeEditorContent = (content) => {
			this.getRootComponent().setState({
				screen: content
			});
		}
	}
	render(){
		return this.domElement;
	}

}
module.exports = Navigation;