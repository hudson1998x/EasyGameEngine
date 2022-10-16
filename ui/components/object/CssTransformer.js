const ELCore = require('./../SupportLibrary');

class CssTransformer extends ELCore.Component {

	getIcon(){
		return 'media/css.png';
	}

	render(){
		super.render();

		this.domElement.innerHTML = `<label style="color:#fff;font-family:sans-serif;text-indent:15px;line-height:40px;display:block;border-bottom:1px solid #000;font-size:12px;">CSS Properties</label>`;

		if ( !this.parent.state.activeObject ) {
			this.domElement.innerHTML += `<p class="notice error">No Active Object</p>`;
		} else {

			let list = document.createElement("div");

			list.className = 'prop-list';

			try{
				let css = getComputedStyle(this.parent.state.activeObject.domElement);

				for(let prop in css) {
					if ( isNaN(prop) ) {

						let d = document.createElement("div");

						d.innerHTML = `
							<label>${prop}</label>
							<input type="text" value="${css[prop]}"/>
						`

						d.querySelector('input').oninput = () => {
							let val = d.querySelector('input').value;
							this.parent.state.activeObject.domElement.style[prop] = value;

							this.parent.state.activeObject.props.style = this.parent.state.activeObject.domElement.getAttribute('style');

						}
						list.appendChild(d);

					}
				}
			}catch(f){
				
			}

			this.domElement.appendChild(list);

		}

		return this.domElement;
	}
}	

module.exports = CssTransformer;