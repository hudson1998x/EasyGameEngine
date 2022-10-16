const Abstract = require('./Abstract');

class RGBBorder extends Abstract {

	constructor(props = {}){
		super(props);

		if ( !this.props.borderSize ) {
			this.props.borderSize = "5px";
		}
		if ( !this.props.innerBg ) {
			this.props.innerBg = "#111";
		}
	}
	render(){
		super.render();
		this.domElement.innerHTML = `
			<div style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;overflow:hidden;">
				<div class="rotation" style="position:absolute;top:-100px;left:-100px;right:-100px;bottom:-100px;background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);">
					
				</div>
				<div class="inner" style="position:absolute;top:${this.props.borderSize};left:${this.props.borderSize};right:${this.props.borderSize};bottom:${this.props.borderSize};background:${this.props.innerBg}">

				</div>
				<style>
					.rotation{
						animation: rotate 10s forwards infinite;
					}
					@keyframes rotate{
						0% {
							transform:rotate(0deg);
						}
						100%{
							transform:rotate(360deg);
						}
					}
				</style>
			</div>
		`;
		if ( this.children && this.children[0] ) {
			this.domElement.querySelector(".inner").appendChild(this.children[0].render());
		}
		this.domElement.style.overflow = 'hidden !important';
		// this.props.css += 'overflow: hidden !important';

		return this.domElement;
	}
}

module.exports = RGBBorder;