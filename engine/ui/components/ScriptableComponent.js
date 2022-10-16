const Abstract = require('./Abstract');
const AssetManager = require('./../../AssetManager');

class ScriptableComponent extends Abstract {

	constructor(props = {}){
		super(props);

		AssetManager.loadAsset(this.props.src)
					.then((js) => {
						let dec = eval(js);

						this.handle = new dec();
					})
					.catch((err) => {

					});
		this.secondInterval = setInterval(() => {
			try{
				if ( this.handle ) {
					this.handle.second();
				}
			}catch(e){
				clearInterval(this.secondInterval);
			}
		} , 1000);
		this.halfSecondInterval = setInterval(() => {
			try{
				if ( this.handle ) {
					this.handle.halfSecond();
				}
			}catch(e){
				clearInterval(this.secondInterval);
			}
		} , 500);

	}
	defaultNodeName(){
		return 'div';
	}
	render(){
		return super.render();
	}
}

module.exports = ScriptableComponent;