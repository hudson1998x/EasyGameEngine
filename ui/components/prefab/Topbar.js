const ELCore = require('./../SupportLibrary');
const Navigation = require('./Navigation');

class Topbar extends ELCore.Component {

	constructor(props){
		super(props);

		this.css('position' , 'absolute')
			.css('top' , '0px')
			.css('left' , '0px')
			.css('right' , '0px')
			.css('height' , '50px')
			.css('background' , '#222222');

		this.addChildComponent(new Navigation());
	}

}
module.exports = Topbar;