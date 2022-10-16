const Elcore = require('./SupportLibrary');

const InitialScreen = require('./../editor/InitialScreen');
const UserInterfaces = require('./../editor/UserInterfaces');
const GameLevels = require('./../editor/GameLevels');
const ScriptsInterface = require('./../editor/ScriptsInterface');
const ImagesInterface = require('./../editor/ImagesInterface');
const VideosInterface = require('./../editor/VideosInterface');
const ObjectEditor = require('./../editor/ObjectEditor');

class Editor extends Elcore.Component {
	constructor(props){
		super(props);

		this.css('position' , 'absolute')
			.css('top' , '0px')
			.css('left' , '0px')
			.css('width' , '100vw')
			.css('paddingTop', '50px')
			.css('overflow' , 'hidden')
			.css('height' , '100vh');

		this.initialScreen = new InitialScreen();
		this.initialScreen.parent = this;

		this.levels = new GameLevels();
		this.levels.parent = this;

		this.uis = new UserInterfaces();
		this.uis.parent = this;

		this.scripts = new ScriptsInterface();
		this.scripts.parent = this;

		this.images = new ImagesInterface();
		this.images.parent = this;

		this.videos = new VideosInterface();
		this.videos.parent = this;

		this.objectFactory = new ObjectEditor();
		this.objectFactory.parent = this;

		this.setState({
			screen: 'InitialScreen'
		});
	}
	render(){

		this.domElement.innerHTML = '';

		switch ( this.state.screen ) {

			case 'InitialScreen':
				this.initialScreen.setState({
					errorOccured: false
				});
				this.domElement.appendChild(this.initialScreen.render());
			break;
			case 'GameLevels':
				this.domElement.appendChild(this.levels.render());
			break;
			case 'UserInterfaces':
				this.domElement.appendChild(this.uis.render());
			break;
			case 'Scripts':
				this.domElement.appendChild(this.scripts.render());
			break;
			case 'Images':
				this.domElement.appendChild(this.images.render());
			break;
			case 'Videos':
				this.domElement.appendChild(this.videos.render());
			break;
			case 'ObjectFactory':
				this.domElement.appendChild(this.objectFactory.render());
			break;
			case 'ObjectEditor':
				let editor = this.state.EditorComponent;

				editor.parent = this;

				this.domElement.appendChild(editor.render());
			break;
			case 'Audio':
			default:
				this.initialScreen.setState({
					errorOccured: true , 
					errorMessage: "Unknown Interface: " + this.state.screen
				});
				this.domElement.appendChild(this.initialScreen.render());
			break;

		}
		return this.domElement;

	}
}

module.exports = Editor;